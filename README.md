# A purchasing application for a coffee shop

## Requirements and Installation

To run the application, Node is required to be installed. We recommend the latest version. Node can be installed from:

- https://nodejs.org/en/download

After Node is installed, from a terminal within this project run the command:

- `npm i`

## Running the application

In one terminal, run the application using the command:

- `npm run dev`

The url outputted within the terminal is where the application is running. For example: http://localhost:5173/

In another terminal, run the json server using the command:

- `npm run server`

The JSON Server is started on port 3030. An endpoint, for example, would be: http://localhost:3030/catalogue

## About the application

The application has been built in React working in Vite, with a JSON Server.

## How to Run the Tests

Both the frontend and api tests use Playwright with TypeScript. To run the tests, navigate into the `tests` folder and then select the appropriate commands.

To run the tests in headless mode:

- `npm run test`

To run the tests in UI mode:

- `npm run ui-mode`

To run the api tests:

- `npm run api-tests`

To run the frontend tests:

- `npm run frontend-tests`

These tests have been configured to only run with one worker, but the commands `npx playwright` can be used to overwrite this if required.
