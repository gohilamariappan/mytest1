import { Inject, Injectable, NotAcceptableException, forwardRef } from "@nestjs/common";
import axios from "axios";
import { SurveyScoreCredentailDto } from "./dto";
import { CredentialDIDService } from "src/credential-did/credential-did.service";

@Injectable()
export class SunbirdRcService {
  constructor(
    @Inject(forwardRef(()=>CredentialDIDService))
    private credentialDID: CredentialDIDService
  ){}
  // private credentialUrl = "http://localhost:3000";
  // private credSchemaUrl = "http://localhost:3333";
  // private identityUrl = "http://localhost:3332";
  private sunbirdRcUrl = "http://compass.samagra.io";

  async addNewCredSchema(schema: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.sunbirdRcUrl}/credential-schema`,
        {
          data: {
            ...schema
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }

  async fetchCredSchemaByIdAndVersion(schemaDid: string, version: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.sunbirdRcUrl}/credential-schema/${schemaDid}/${version}`
      );
      if(response.status != 200){
        throw new NotAcceptableException(`Authentication failed for the Schema with did #${schemaDid} and version #${version}`);
      }
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }

  async issueCredential(credentialData: SurveyScoreCredentailDto): Promise<any> {
    try {

      const dids = await this.credentialDID.findDIDs();
      const response = await axios.post(
        `${this.sunbirdRcUrl}/credentials/issue`,
        {
          data: {
            credential: {
              "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1",
              ],
              type: ["VerifiableCredential", "WPCASSurveyScoreCredential"],
              issuer: dids.authorDid,
              expirationDate: "2023-02-08T11:56:27.259Z",
              credentialSubject: {
                ...credentialData
              },
              options: {
                created: new Date(),
                credentialStatus: {
                  type: "RevocationList2020Status",
                },
              },
            },
            credentialSchemaId: dids.schemaDid,
            credentialSchemaVersion: dids.schemaVersion,
            tags: ["tag1", "tag2", "tag3"],
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error(`Failed to issue credentials for user with id #${credentialData.userId}`);
    }
  }

  async verifyCredentail(did: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.sunbirdRcUrl}/credentials/${did}/verify`
      );
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }

  async resolveDid(did: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.sunbirdRcUrl}/did/resolve/${did}`
      );
      if(response.status != 200){
        throw new NotAcceptableException(`Authentication failed for the did #${did}`);
      }
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }

  async renderCredential(credentialDID: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.sunbirdRcUrl}/credentials/render`,
        {
          data: {
            credentialId: credentialDID,
            template:
              '<html lang=\'en\'>   <head>     <meta charset=\'UTF-8\' />     <meta http-equiv=\'X-UA-Compatible\' content=\'IE=edge\' />     <meta name=\'viewport\' content=\'width=device-width, initial-scale=1.0\' />     <title>Certificate</title>   </head>   <body>   <div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878"> <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878"> <span style="font-size:50px; font-weight:bold">Certificate of Completion</span> <br><br> <span style="font-size:25px"><i>This is to certify that</i></span> <br><br> <span style="font-size:30px"><b>{{name}}</b></span><br/><br/> <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/> <span style="font-size:30px">{{programme}}</span> <br/><br/> <span style="font-size:20px">with score of <b>{{grade}}%</b></span> <br/><br/><br/><br/> <span style="font-size:25px"></span><br> <div> <img src={{qr}} > </div> </div>  </div>  </body>    </html>',
            output: "PDF",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }

  async getCredentailById(credentialDID: string): Promise<any> {
    try {
      const response = await axios.get(`${this.sunbirdRcUrl}/credentials/${credentialDID}`);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch data from the external API");
    }
  }
}
