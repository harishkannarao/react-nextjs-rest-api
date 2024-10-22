#!/bin/sh

# Make the script to abort if any command fails
set -e

# Print the commands as it is executed. Useful for debugging
set -x

aws --version

rm -rf prod_artifact

npm run build

npm run export

aws s3 sync prod_artifact/ s3://${BUCKET_NAME}/