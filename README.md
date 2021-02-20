# Serverless Twitter

## Prerequisites

- [Serverless Framework](http://serverless.com/)
- [NodeJS 10+](https://nodejs.org/)
- [AWS CLI](https://aws.amazon.com/cli/)

## Credentials Setup for AWS and Serverless

After installing prerequisites, run the following command to configure serverless and AWS.

`sls config credentials -p aws -k [YOUR_AWS_KEY] -s [YOUR_AWS_SECRET]`

To add a user with programmatic access on AWS, follow the [guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console).

## Backend

The architecture for this project took the serverless approach. We use AWS Lambda functions to compute and DynamoDB for the persistent data layer.

### Deploy the backend

```sh
cd backend
sls deploy -v
```

### Terminate the backend

```sh
cd backend
sls remove
```

## Client

The client is running on react.

### Running the project on localhost

```sh
cd client
npm run start
```

The application will be running on http://localhost:3000

### Build

```sh
cd client
npm run build
```
