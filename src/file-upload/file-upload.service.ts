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
    await this.questionBankService.bulkUploadQuestions(parsedData);
    // Clean up after the sucessful upload of csv data
    await this.deleteUploadedFile(filepath);
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
