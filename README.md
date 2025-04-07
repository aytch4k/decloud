# DeCloud Project

A React TypeScript application containerized with Docker.

## Docker Setup

This project is fully containerized using Docker and Docker Compose. All build and runtime components are inside Docker containers.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Development Environment

To start the development environment with hot-reloading:

```bash
docker-compose up app-dev
```

This will:
- Build the Docker image using the development target
- Mount your local code into the container
- Start the Vite development server
- Enable hot-reloading
- Make the app available at http://localhost:5173

### Production Environment

To build and run the production version:

```bash
docker-compose --profile prod up app-prod
```

This will:
- Build the Docker image using the production target
- Build the React application
- Serve the static files using Nginx
- Make the app available at http://localhost:8080

### Building Images

To build the images without starting containers:

```bash
docker-compose build
```

### Stopping Containers

To stop the running containers:

```bash
docker-compose down
```

## Docker Commands Reference

### Viewing Logs

```bash
docker-compose logs -f app-dev
```

### Executing Commands Inside Containers

```bash
docker-compose exec app-dev sh
```

### Rebuilding After Changes to Dockerfile or docker-compose.yml

```bash
docker-compose up --build app-dev
```

## Project Structure

- `Dockerfile`: Multi-stage Docker configuration for both development and production
- `docker-compose.yml`: Docker Compose configuration for orchestrating services
- `nginx.conf`: Nginx configuration for serving the production build
- `.dockerignore`: Files to exclude from the Docker build context