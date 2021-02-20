#!/bin/sh

# Make the script to abort if any command fails
set -e

# Print the commands as it is executed. Useful for debugging
set -x

mkdir -p jest-stare

mkdir -p cypress-report/mochawesome-report

npm run test:run-ci

npm run build

npm run export

npm run start-server-and-test