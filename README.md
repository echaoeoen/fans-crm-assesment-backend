
# NestJS Application

This is a NestJS application that can be run either locally or using Docker. The application is set up to use Docker for both the database and the development environment, simplifying the setup process.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Yarn v4](https://yarnpkg.com/getting-started/install) (Ensure Yarn is installed and up to date)

## Getting Started

### Running with Docker

1. **Clone the Repository**

   ```bash
   git clone https://github.com/echaoeoen/fans-crm-assesment-backend.git
   cd fans-crm-assesment-backend
   ```

2. **Build and Run the Application**

   To build and run the application using Docker, use the following command:

   ```bash
   docker-compose up
   ```

   This command will build the Docker images and start the application along with the database. Docker Compose will ensure that all the services defined in the `docker-compose.yml` file are up and running.

3. **Access the Application**

   Once the application is running, you can access it in your browser at:

   ```
   http://localhost:3000/docs
   ```
4. **Login User**
   You can use this user: `admin@mail.com` with password: `password123` to test the login endpoint and use the token other endpoints

### Running Locally (Without Docker)

If you prefer to run the application locally without Docker, follow these steps:

1. **Install Dependencies**

   Make sure you have Node.js and Yarn v4 installed. Then, install the dependencies:

   ```bash
   yarn install
   ```

2. **Set Up the Database**

   Ensure you have a local database running and configure the connection in the `ormconfig.json` or `.env` file.

3. **Run the Application**

   Start the NestJS application:

   ```bash
   yarn start
   ```

4. **Access the Application**

   You can now access the application in your browser at:

   ```
   http://localhost:3000
   ```

## Available Scripts

- **\`yarn start\`** - Runs the NestJS application.
- **\`yarn start:dev\`** - Runs the application in development mode.
- **\`yarn start:prod\`** - Runs the application in production mode.

## API Documentation

The application comes with Swagger UI for testing the API endpoints. Once the application is running, open the following URL in your browser to access the Swagger UI:

```
http://localhost:3000/docs
```

This will allow you to test and interact with the API directly from the browser.

## Using Docker Compose

The `docker-compose.yml` file includes services for the NestJS application and the database. Here's a brief overview:

- **nestjs-app**: The main NestJS application.
- **database**: The database service (e.g., MySQL) that the application connects to.

### Customizing the Docker Setup

If you need to customize the database or other services, modify the `docker-compose.yml` file to suit your needs.

## Environment Variables

Make sure to set the environment variables required by the application. You can define these variables in a `.env` file at the root of the project.

Example `.env` file:

```env
MYSQL_ROOT_PASSWORD=development-root
MYSQL_DATABASE=fans-crm
MYSQL_USER=fans-crm
MYSQL_PASSWORD=development
MYSQL_HOST=0.0.0.0
```

## Stopping the Application

To stop the application when using Docker Compose, press `Ctrl + C` in the terminal where `docker-compose up` is running, or run:

```bash
docker-compose down
```

This will stop and remove all the containers defined in the `docker-compose.yml` file.
