# React NextJs Rest Api

This repository contains a simple front end java script application using React + NextJs connecting to a backend Http Rest Api.

## Tools Required
* NodeJs 12: `node --version`
* Npm 6: `npm --version`
* Npx 6: `npx --version`

## Commands

### Install node modules

    npm install

### Start application in development mode

    npm run dev

### Build application to generate production artifact and export as static website

    npm run build

### Start application using production artifact

    npm run start

or

    npm run build-serve

### Run Jest test (interactive mode)

    npm run test

### Run Jest test (non-interactive mode)

    npm run test:ci

### Run Cypress test (interactive mode)

    npm run cypress:open-functional

### Run Cypress test (non-interactive mode)

    npm run cypress:run-functional

### Run CI tests

    npm run test:ci && npm run start-server-and-test