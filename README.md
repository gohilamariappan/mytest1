#test#

# WPCAS Survey Service

 The WPCAS Survey Service is the backend component for the WPCAS Survey UI, providing a robust API for facilitating feedback among users. Users can seamlessly provide feedback to their peers through a user-friendly interface. The service connects to the WPCAS Survey UI repository for user interface pages and to fetch and submit data via APIs.

## Table of Contents

- [Frameworks and Dependencies](#frameworks-and-dependencies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Running the Server](#running-the-server)
  - [Database Related Tasks](#database-related-tasks)
  - [Development](#development)
  - [Deployment](#deployment)
- [API Endpoints](#api-endpoints)

## Frameworks and Dependencies

The WPCAS Survey Service is built using the following frameworks and dependencies:

- Nest.js Framework
- PostgreSQL Database
- Prisma ORM
- Other dependencies include @nestjs/common, @nestjs/config, @nestjs/swagger, @prisma/client, class-transformer, class-validator, and more.

## Getting Started

### Prerequisites

Before running the WPCAS Survey Service, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/COMPASS-DPG/wpcas-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd wpcas-service
   ```

3. Create an `.env` file based on the provided `env-example` file, and configure the environment variables accordingly.
4. Install Node.js dependencies using the following command:

   ```bash
   npm install
   ```


## Running the Server

### Database Related Tasks

For both development and deployment, perform the following database-related tasks:

1. Run Prisma migrations:

   ```bash
   npm run migrate:dev
   ```

These tasks ensure that the database schema is up-to-date with the latest changes and populated with initial data. Ensure to run these commands whenever there are changes to the database schema or to refresh the development database with seed data.

### Development

To start the development server, run the following command:

```bash
npm run start:dev
```
The service will be accessible at http://localhost:4010.

Additionally, you can explore the Swagger documentation by visiting http://localhost:4010/api/docs when the server is running in development mode.

### Deployment

Follow these steps to deploy the project:

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start:prod
   ```

## API Endpoints

The API endpoints provided by the WPCAS Survey Service can be found in the source code. Please refer to the source files under the `src` directory, specifically the `controllers` and `modules` directories, for detailed information on the available endpoints. Additionally, you can explore the Swagger documentation by visiting the `/api/docs` route when the server is running.


### Some major API Endpoints

1. **User Metadata**

   - `/api/user-metadata/sync-user-metadata`
     - Method: GET
     - Description: Used to sync user data from the user org service.

   - `/api/user-metadata`
     - Method: GET
     - Response:
       ```json
       {
         "message": "UserMetadata(s) fetched successfully",
         "data": [
           {
             "userId": "user uuid",
             "userName": "name",
             "dateOfJoining": "2023-12-13T07:36:21.026Z",
             "isAdmin": boolean,
             "designation": "CEO",
             "isNewEmployee": boolean,
             "surveysToBeFilled": 0,
             "surveysFilled": 0,
             "wpcasScore": null
           }
         ]
       }
       ```

   - `/api/user-metadata/{userId}`
     - Method: GET
     - Response:
       ```json
       {
         "message": "UserMetadata fetched successfully",
         "data": {
           "userId": "d35d1e80-d2df-4b6a-9a67-8ef5f2877a57",
           "userName": "Deepak Mishra",
           "dateOfJoining": "2023-12-13T07:36:21.026Z",
           "isAdmin": false,
           "designation": "QA Engineer",
           "isNewEmployee": false
         }
       }
       ```

2. **Admin Competency**

   - `/api/admin-competency/sync-competency-data`
     - Method: GET
     - Description: Used to sync competency data from frac.
     - Response:
       ```json
       {
         "message": "Successfully sync competency data",
         "data": [
           {
             "id": 0,
             "competencyId": 0,
             "name": "string",
             "description": "string",
             "competencyLevels": [
               {
                 "competencyLevelNumber": 0,
                 "competencyLevelName": "string"
               }
             ],
             "createdAt": "2023-12-13T08:25:46.426Z",
             "updatedAt": "2023-12-13T08:25:46.426Z"
           }
         ]
       }
       ```

   - `/api/admin-competency`
     - Method: GET
     - Response:
       ```json
       {
         "data": [
           {
             "id": 0,
             "competencyId": 0,
             "name": "string",
             "description": "string",
             "competencyLevels": [
               {
                 "competencyLevelNumber": 0,
                 "competencyLevelName": "string"
               }
             ]
           }
         ],
         "message": "string"
       }
       ```

   - `/api/admin-competency/names`
     - Method: GET
     - Response:
       ```json
       {
         "data": [
           {
             "competencyId": 1,
             "name": "Strategic Planning"
           }
         ],
         "message": "Successfully fetched all admin-competency"
       }
       ```

   - `/api/admin-competency/{competencyId}`
     - Method: GET
     - Response:
       ```json
       {
         "message": "string",
         "data": {
           "id": 0,
           "competencyId": 0,
           "name": "string",
           "description": "string",
           "competencyLevels": [
             {
               "competencyLevelNumber": 0,
               "competencyLevelName": "string"
             }
           ]
         }
       }
       ```

3. **Question Bank**

   - `/api/question-bank`
     - Method: POST
     - Request Body:
       ```json
       {
         "competencyId": 0,
         "question": "string",
         "competencyLevelNumber": 0
       }
       ```
     - Response:
       ```json
       {
         "message": "Question created successfully.",
         "data": {
           "id": 1,
           "createdAt": "2023-12-13T08:36:03.939Z",
           "updatedAt": "2023-12-13T08:36:03.939Z",
           "competencyId": 1,
           "competencyLevelNumber": 1,
           "question": "string"
         }
       }
       ```

   - `/api/question-bank/upload`
     - Method: POST
     - Description: Uploads questions in bulk from a PDF file.
     - Request Headers:
        - `Content-Type`: multipart/form-data
     - Request Body:
          - `file`: CSV file containing questions

     - Response Example:
        ```json
         {
           "message": "Questions uploaded successfully.",
           "data": [
             {
              "id": 1,
              "createdAt": "2023-12-13T08:36:03.939Z",
              "updatedAt": "2023-12-13T08:36:03.939Z",
              "competencyId": 1,
              "competencyLevelNumber": 1,
              "question": "string"
             },
          ]
       }
     ```

     - Note: This endpoint is used to upload questions in bulk from a CSV file. The CSV file should contain a structured format with questions, competency IDs, and competency level numbers.

   - `/api/question-bank`
     - Method: GET
     - Response:
       ```json
       {
         "message":"Successfully fetched all questions.",
         "data": [
           {
             "id": 1,
             "createdAt": "2023-12-13T08:36:03.939Z",
             "updatedAt": "2023-12-13T08:36:03.939Z",
             "competencyId": 1,
             "competencyLevelNumber": 1,
             "question": "string"
           }
         ]
       }
       ```

   - `/api/question-bank/update/{id}`
     - Method: PATCH
     - Request Body:
       ```json
       {
         "question": "string"
       }
       ```
     - Response:
       ```json
       {
         "message": "Successfully updated question for id #1",
         "data": {
           "id": 1,
           "createdAt": "2023-12-13T08:36:03.939Z",
           "updatedAt": "2023-12-13T11:17:05.895Z",
           "competencyId": 1,
           "competencyLevelNumber": 1,
           "question": "string"
         }
       }
       ```

       Sure, let's expand on the documentation for each of the remaining sections:

### 4. **Survey Configuration**

- **Create Survey Configuration:**
  - Endpoint: `/api/survey-config`
  - Method: POST
  - Description: Creates a survey configuration.
  - Request Parameters:
    - `onboardingTimeUnit`: Time unit for onboarding (e.g., MONTH).
    - `file`: PDF file for the survey configuration.
    - `surveyName`: Name of the survey.
    - `onboardingTime`: Onboarding time in units.
    - `startTime`: Start time for the survey in ISO 8601 format (e.g., 2023-12-13T11:33:35.910Z).
    - `endTime`: End time for the survey in ISO 8601 format (e.g., 2023-12-13T11:33:35.910Z).

  - Response Example:
    ```json
    {
      "message": "Survey configuration created successfully.",
      "data": {
        "id": 1,
        "onboardingTimeUnit": "MONTH",
        "surveyName": "test",
        "onboardingTime": 5,
        "startTime": "2023-12-13T11:33:35.910Z",
        "endTime": "2023-12-13T11:33:35.910Z"
      }
    }
    ```

### 5. **Survey Form**

- **Create Survey Form:**
  - Endpoint: `/api/survey-form`
  - Method: POST
  - Description: Creates a survey form.
  - Request Body:
    ```json
    {
      "userId": 1,
      "status": "CREATED",
      "questionsJson": [
        {
          "questionId": 1,
          "question": "Is this a dummy question?"
        }
      ],
      "surveyConfigId": 0
    }
    ```
  - Response Body:
    ```json
    {
      "data": {
        "id": 0,
        "userId": "string",
        "surveyConfigId": 0,
        "SurveyConfig": {
          "id": 0,
          "surveyName": "string",
          "onboardingTime": 0,
          "onboardingTimeUnit": {},
          "startTime": "2023-12-13T11:34:19.478Z",
          "endTime": "2023-12-13T11:34:19.478Z",
          "isActive": true
        },
        "status": {},
        "questionsJson": {},
        "overallScore": 0,
        "sunbirdCredentialIds": "string",
        "ResponseTracker": {
          "id": 0,
          "assesseeId": "string",
          "surveyFormId": 0,
          "assessorId": "string",
          "responseJson": [
            {
              "answer": "Yes || No || DoNotKnow",
              "questionId": 0
            }
          ],
          "status": {}
        }
      },
      "message": "string"
    }
    ```

- **Fetch Survey Form by ID:**
  - Endpoint: `/api/survey-form/{id}`
  - Method: GET
  - Response:
    ```json
    {
      "data": {
        "id": 0,
        "userId": "string",
        "surveyConfigId": 0,
        "SurveyConfig": {
          "id": 0,
          "surveyName": "string",
          "onboardingTime": 0,
          "onboardingTimeUnit": {},
          "startTime": "2023-12-13T11:36:05.479Z",
          "endTime": "2023-12-13T11:36:05.479Z",
          "isActive": true
        },
        "status": {},
        "questionsJson": {},
        "overallScore": 0,
        "sunbirdCredentialIds": "string",
        "ResponseTracker": {
          "id": 0,
          "assesseeId": "string",
          "surveyFormId": 0,
          "assessorId": "string",
          "responseJson": [
            {
              "answer": "Yes || No || DoNotKnow",
              "questionId": 0
            }
          ],
          "status": {}
        }
      },
      "message": "string"
    }
    ```

- **Fetch Latest Survey Form for a User:**
  - Endpoint: `/api/survey-form/latest-survey-form/{userId}`
  - Method: GET
  - Response:
    ```json
    {
      "data": {
        "id": 0,
        "userId": "string",
        "surveyConfigId": 0,
        "SurveyConfig": {
          "id": 0,
          "surveyName": "string",
          "onboardingTime": 0,
          "onboardingTimeUnit": {},
          "startTime": "2023-12-13T11:36:05.479Z",
          "endTime": "2023-12-13T11:36:05.479Z",
          "isActive": true
        },
        "status": {},
        "questionsJson": {},
        "overallScore": 0,
        "sunbirdCredentialIds": "string",
        "ResponseTracker": {
          "id": 0,
          "assesseeId": "string",
          "surveyFormId": 0,
          "assessorId": "string",
          "responseJson": [
            {
              "answer": "Yes || No || DoNotKnow",
              "questionId": 0
            }
          ],
          "status": {}
        }
      },
      "message": "string"
    }
    ```

### 6. **Survey**

- **Create Survey:**
  - Endpoint: `/api/survey/{configId}`
  - Method: POST
  - Description: Used to create survey forms for a given configuration.

### 7. **Response Tracker**

- **Fetch All Response Trackers:**
  - Endpoint: `/api/response-tracker`
  - Method: GET
  - Response:
    ```json
    {
      "data": [
        {
          "id": 0,
          "assesseeId": "string",
          "surveyFormId": 0,
          "assessorId": "string",
          "responseJson": [
            {
              "answer": "Yes || No || DoNotKnow",
              "questionId": 0
            }
          ],
          "status": {}
        }
      ],
      "message": "string",
      "statusCode": 0
    }
    ```

### 8. **Survey Score**

- **Get Overall Survey Score for a User:**
  - Endpoint: `/api/survey-score/all-survey-score/{userId}`
  - Method: GET
  - Response:
    ```json
    {
      "statusCode": 0,
      "message": "string",
      "data": [
        {
          "status": "CLOSED",
          "surveyFormId": 0,
          "userId": "string",
          "overallScore": 0,
          "sunbirdCredentialIds": "string",
          "SurveyScore": [
            {
              "id": 0,
              "surveyFormId": 0,
              "competencyId": 0,
              "competencyLevelNumber": 0,
              "score": 0
            }
          ],
          "createdAt": "2023-12-13T11:55:28.548Z",
          "updatedAt": "2023-12-13T11:55:28.548Z"
        }
      ]
    }
    ```

- **Get Survey Score by Survey Form ID:**
  - Endpoint: `/api/survey-score/survey-form/{surveyFormId}`
  - Method: GET
  - Response:
    ```json
    {
      "data": [
        {
          "id": 0,
          "surveyFormId": 0,
          "competencyId": 0,
          "competencyLevelNumber": 0,
          "score": 0
        }
      ],
      "message": "string",
      "statusCode": 0
    }
    ```


 
 These are the defined API endpoints along with their methods and expected responses for the WPCAS Survey Service. If you have any further questions or need additional information, feel free to ask!
