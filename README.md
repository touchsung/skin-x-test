# Project Overview

- This project includes a server folder built with Nest.ts and a frontend folder built with React.ts. The development environment is containerized using Docker, allowing for easy setup and deployment.

## Getting Started

1. Clone the repository to your local machine.
2. Make sure you have Docker installed on your machine.
3. Open a terminal and navigate to the project root directory.

## Running the Project

- To start the project, run the following command:

  ```bash
  docker-compose up
  ```

- This command will build and start the Docker containers for both the server and frontend. Once the containers are running, you can access the application at` http://localhost:3000` in your web browser.

## Project Structure

1. `server/`: Contains the Nest.ts server code.
2. `frontend/`: Contains the React.ts frontend code.
3. `docker-compose.yml`: Defines the Docker services for the project.
   Customization

Feel free to customize the codebase according to your requirements. You can modify the server code in the `server/` folder and the frontend code in the `frontend/` folder.

## Dependencies

1. Docker
2. Node.js (for local development, not required in Docker environment)

## Additional Notes

- Make sure to install Docker before running the project.
- You can stop the Docker containers by pressing Ctrl + C in the terminal where docker-compose up is running.
