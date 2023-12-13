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

   - **Sync User Metadata:**
     - Endpoint: `/api/user-metadata/sync-user-metadata`
     - Method: GET
     - Description: Used to sync user data from the user org service.

   - **Get User Metadata:**
     - Endpoint: `/api/user-metadata`
     - Method: GET
     - Description: Fetches user metadata.
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

   - **Get User Metadata by ID:**
     - Endpoint: `/api/user-metadata/{userId}`
     - Method: GET
     - Description: Fetches user data by ID.
     - Response:
       ```json
       {
         "message": "UserMetadata fetched successfully",
         "data": {
           "userId": "user uuid",
           "userName": "name",
           "dateOfJoining": "2023-12-13T07:36:21.026Z",
           "isAdmin": boolean,
           "designation": "CEO",
           "isNewEmployee": boolean
         }
       }
       ```

2. **Admin Competency**

   - **Sync Competency Data:**
     - Endpoint: `/api/admin-competency/sync-competency-data`
     - Method: GET
     - Description: Used to sync competency data from Frac.
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

   - **Get All Competencies:**
     - Endpoint: `/api/admin-competency`
     - Method: GET
     - Description: Fetches all competencies.
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

   - **Get All Competency Names:**
     - Endpoint: `/api/admin-competency/names`
     - Method: GET
     - Description: Fetches all competency names.
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

   - **Get Competency by ID:**
     - Endpoint: `/api/admin-competency/{competencyId}`
     - Method: GET
     - Description: Fetches competency data by competency ID.
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

   - **Create Question:**
     - Endpoint: `/api/question-bank`
     - Method: POST
     - Description: Creates a question.
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

   - **Upload Questions from CSV:**
     - Endpoint: `/api/question-bank/upload`
     - Method: POST
     - Description: Uploads questions in bulk from a CSV file.
     - Request Headers: `Content-Type: multipart/form-data`

These are the defined API endpoints along with their methods and expected responses for the WPCAS Survey Service. If you have any further questions or need additional information, feel free to ask!
