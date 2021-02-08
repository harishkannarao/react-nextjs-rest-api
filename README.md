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

    npm run build && npm run export

### Start application using production artifact

    npm run build && npm run start

or

    npm run build && npm run export && npm run serve

### Run Jest test (interactive mode)

    npm run test

### Run Jest test (non-interactive mode)

    npm run test:run-ci

### Run Cypress test (interactive mode)

    npm run cypress

### Run Cypress test (non-interactive mode)

    npm run cypress:run-ci

### Run CI tests

    npm run test:run-ci && npm run build && npm run export && npm run start-server-and-test