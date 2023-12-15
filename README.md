# WPCAS - Workplace Competency Assessment Score

## About

WPCAS is a vital component of COMPASS, a goal-oriented human resource management system (GO-HRM) designed to help organizations align their objectives with well-defined targets for teams and individuals. This system maps competencies required to achieve these targets and establishes a connection between capacity and performance management.

WPCAS specifically focuses on Workplace Competency Assessment Scores, offering a comprehensive 360-degree feedback survey for employees. This survey involves input from juniors, seniors, and colleagues, providing valuable insights into an employee's strengths and weaknesses based on workplace performance.

## Tech Stack

- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Framework:** NestJS
- **Node Version:** 18.16.1-alpine

## Setup

1. Install the necessary package dependencies:
    ```bash
    npm i
    ```

2. Set up PostgreSQL in your local environment.

3. Configure environment variables:
    - Create an environment variable file (e.g., `.env`) using the example file as a reference.

4. Generate Prisma migrations:
    ```bash
    npx prisma migrate dev
    ```
    - If seed data is required, populate it by running:
        ```bash
        npx prisma db seed
        ```
        or for a complete reset (including deleting all previous data):
        ```bash
        npx prisma migrate reset
        ```

5. Running a Local Development Server:
    ```bash
    npm run start:dev
    ```
    - Access the Swagger API documentation at `http://YOUR_APP_PORT/api/docs`

## License

This project is licensed under the [LICENSE NAME] - see the [LICENSE.md](LICENSE.md) file for details.