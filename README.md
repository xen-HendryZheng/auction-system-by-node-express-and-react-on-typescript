# Auction System - Backend and Frontend Setup

This repository contains the backend and frontend setup for the Auction System.

## Backend

The backend consists of a Docker configuration file (`docker-compose.yml`) and a migration script that needs to be run during the first-time setup.

### Docker Configuration

The backend is composed of two services: `postgres` and `web`.

#### Postgres Service

- Image: postgres:10.7
- Environment variables:
  - POSTGRES_USER: testuser
  - POSTGRES_PASSWORD: testpass
  - POSTGRES_DB: auction-system
- Ports:
  - Host: 5432
  - Container: 5432
- Volumes:
  - ./postgres-data:/var/lib/postgresql/data

#### Web Service

- Build context: .
- Dockerfile: dev.Dockerfile
- Links: postgres
- Container name: jtr-auction-express
- Ports:
  - Host: 3000
  - Container: 3000
- Environment variables:
  - PGHOST: postgres
  - PGHOST_MIGRATION: postgres
- Volumes:
  - ./:/app

### First-time Setup

To set up the backend for the first time, follow these steps:

1. Ensure that Docker is installed on your system.
2. Navigate to the project root directory.
3. Run the following command to start the backend services:

```shell
docker-compose up
```

4. After the services are up and running, open a new terminal window and navigate to the project root directory.
5. Run the following command to run the migration script:

```shell
npm run migration:run
```

This will set up the necessary database schema and initial data.

## Frontend

The frontend is built using React and TypeScript. The `package.json` file contains the dependencies and scripts required for the frontend setup.

### Dependencies

The frontend dependencies can be found in `package.json`

### Scripts

The available scripts for the frontend are:

- start: Starts the development server on port 3006.
- build: Builds the production-ready optimized bundle.
- test: Runs tests using the Jest testing framework.
- eject: Ejects the configuration and scripts from Create React App.

### Development Environment

The development environment is configured to support the following browsers:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)

## Getting Started

To set up the frontend, follow these steps:

1. Ensure that Node.js and npm (Node Package Manager) are installed on your system.
2. Navigate to the `frontend` directory.
3. Run the following command to install the dependencies:

```shell
npm install
```

4. Once the installation is complete, you can start the development server by running the following command:

```shell
npm start
```

This will start the frontend application on port 3006.
