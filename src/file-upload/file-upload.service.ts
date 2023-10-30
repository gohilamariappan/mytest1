import { Injectable } from "@nestjs/common";
import { CreateFileUploadDto } from "./dto/create-file-upload.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from "fs";
import csvParser = require("csv-parser");
import { MockCompetencyService } from "src/mockModules/mock-competency/mock-competency.service";
import { QuestionBankService } from "src/question-bank/question-bank.service";
import path = require("path");

@Injectable()
export class FileUploadService {
  constructor(
    private prisma: PrismaService,
    private competencyService: MockCompetencyService,
    private questionBankService: QuestionBankService
  ) {}

  public async uploadCsvFile(filepath) {
    // Parsed the uploaded data
    const parsedData = await this.parseCSV(filepath);
    // Store the parsedData in the db
    await this.storeData(parsedData);
    // Clean up after the sucessful upload of csv data
    await this.deleteUploadedFile(filepath);
  }
  public async storeData(data: CreateFileUploadDto[]) {
    // Check if the competency Existed or not the given csv data if not then filter and throw error
    const allCompetencies = await this.competencyService.findAllCompetencies();

    // Extract an array of competency names from the fetched competencies
    const competencyNames = allCompetencies.map(
      (competency) => competency.name
    );

    // check for the data that is not in the competency model
    const dataNotInCompetencyModel = data.filter(
      (item) => !competencyNames.includes(item["competency"])
    );

    // If there is data not in the competency model, you can throw an error or handle it as needed.
    if (dataNotInCompetencyModel.length > 0) {
      throw new Error(
        `Some data is not in the competency model #${dataNotInCompetencyModel
          .map((item) => item.competency)
          .join(",")}`
      );
    }

    // Check for the non-numeric competencyLevelNumber which is not a number in the csv data
    const dataWithNonNumericCompetencyLevelNumber = data.filter((item) => {
      const competencyLevelNumber = Number(item.competencyLevelNumber);
      return (
        isNaN(competencyLevelNumber) ||
        competencyLevelNumber < 1 ||
        competencyLevelNumber > 7
      ); // Check if it's not a number and value should b/w 1 to 7
    });
    // Throw an error for the dataWithNonNumericCompetencyLevelNumber
    if (dataWithNonNumericCompetencyLevelNumber.length > 0) {
      throw new Error(
        `The following competency level numbers are not numeric : ${dataWithNonNumericCompetencyLevelNumber
          .map(
            (item) =>
              `Competency ${item?.competency} with competency value #${
                item?.competencyLevelNumber || "Empty"
              }.`
          )
          .join(",")}`
      );
    }

    // Filter for the empty question in the csv data
    const dataEmptyQuestion = data.filter((item) => !item.question);
    // Throw an error for the dataEmptyQuestion
    if (dataEmptyQuestion.length > 0) {
      throw new Error(
        `The following questions are empty: ${dataEmptyQuestion
          .map(
            (item) =>
              `Competency ${item?.competency} with competency value#${item?.competencyLevelNumber}.`
          )
          .join(",")}`
      );
    }

    const createManyDataPromises: Promise<void>[] = data.map(async (item) => {
      const getCompetency = await this.competencyService.findCompetencyByName(
        item.competency
      );
      if (getCompetency && getCompetency.id) {
        // Check if a question with the same competencyId exists in the database
        const existingQuestion = await this.prisma.questionBank.findFirst({
          where: {
            competencyId: getCompetency.id,
            competencyLevelNumber: Number(item["competencyLevelNumber"]),
          },
        });
        if (existingQuestion) {
          // If it exists, update the existing question
          await this.prisma.questionBank.update({
            where: {
              id: existingQuestion.id,
            },
            data: {
              question: item["question"],
              competencyLevelNumber: Number(item["competencyLevelNumber"]),
            },
          });
        } else {
          // If it doesn't exist, create a new entry
          await this.questionBankService.createQuestionByCompentencyId({
            question: item["question"],
            competencyId: getCompetency.id,
            competencyLevelNumber: Number(item["competencyLevelNumber"]),
          });
        }
      } else {
        throw new Error("Competency Id not found");
      }
    });
    try {
      await Promise.all(createManyDataPromises);
    } catch (error) {
      console.error("Error storing data in the database:", error);
      throw new Error("Failed to store data in the database");
    }
  }

  public async parseCSV(filePath: string): Promise<any[]> {
    const results: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          results.push(row);
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  public async deleteUploadedFile(filePath: string): Promise<void> {
    try {
      fs.unlinkSync(filePath)
    } catch (error) {
      throw new Error("Error unlinking the file.",);
    }
  }
}
