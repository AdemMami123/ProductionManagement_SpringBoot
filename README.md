# Production Management System

A full-stack application for production management built with Spring Boot and Angular.

## Technologies Used

- Backend: Spring Boot 3, Java 17, JPA/Hibernate, MySQL
- Frontend: Angular, Material Design
- DevOps: Docker, GitLab CI/CD

## Development Setup

### Prerequisites

- JDK 17
- Maven
- Node.js & npm
- MySQL
- Docker and Docker Compose

### Running Locally (Without Docker)

1. **Backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

3. Access the application at `http://localhost:4200`

## Docker Setup

### Running with Docker Compose

1. Build the application:
   ```bash
   mvn clean package -DskipTests
   ```

2. Start all services:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080/api

### Individual Docker Commands

**Backend**
```bash
docker build -t gestionprod-backend .
docker run -p 8080:8080 gestionprod-backend
```

**Frontend**
```bash
cd frontend
docker build -t gestionprod-frontend .
docker run -p 80:80 gestionprod-frontend
```

## GitLab CI/CD Pipeline

The project includes a GitLab CI/CD pipeline with the following stages:

1. **Build**: Compiles both backend and frontend applications
2. **Test**: Runs unit tests
3. **Package**: Creates deployable artifacts
4. **Deploy**: Deploys the application using Docker Compose (manual trigger)

### Pipeline Configuration

The pipeline is configured in `.gitlab-ci.yml` and includes:

- Caching for Maven and npm dependencies
- Separate jobs for backend and frontend
- Artifact preservation for JAR files and frontend builds
- Manual deployment step for production

## Docker Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Angular        │────▶│  Spring Boot    │────▶│  MySQL          │
│  Frontend       │     │  Backend        │     │  Database       │
│  (Port 80)      │     │  (Port 8080)    │     │  (Port 3306)    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘