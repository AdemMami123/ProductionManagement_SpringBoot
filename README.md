# Production Management System

## Project Description

This Production Management System is a comprehensive solution designed for manufacturing facilities to efficiently manage their production processes. The application enables users to:

- Track and manage manufacturing orders
- Monitor machine statuses and maintenance schedules
- Assign technicians to maintenance tasks
- Manage product inventory and specifications
- Generate production reports and analytics

The system aims to optimize production workflows, reduce downtime, and improve overall manufacturing efficiency through digital transformation of traditional production management processes.

## Technologies Used

### Backend
- **Spring Boot 3**: Core framework for building REST APIs
- **Java 17**: Programming language with latest LTS features
- **Spring Data JPA/Hibernate**: ORM for database operations
- **Spring Security**: Authentication and authorization
- **MySQL**: Relational database for data persistence
- **Maven**: Dependency management and build tool
- **JUnit & Mockito**: Testing frameworks

### Frontend
- **Angular 18**: Frontend framework
- **TypeScript**: Strongly-typed programming language
- **Angular Material**: UI component library
- **RxJS**: Reactive programming library
- **NgRx**: State management (optional)
- **Chart.js**: Data visualization

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container deployment
- **GitLab CI/CD**: Continuous Integration/Continuous Deployment
- **Nginx**: Web server for frontend hosting

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

### Prerequisites for Docker Deployment
- Docker Engine (version 20.10.x or later)
- Docker Compose (version 2.x or later)
- At least 4GB available RAM for containers

### Running with Docker Compose

1. Clone the repository and navigate to the project root:
   ```bash
   git clone https://github.com/your-username/gestionProduction.git
   cd gestionProduction
   ```

2. Build the application:
   ```bash
   mvn clean package -DskipTests
   ```

3. Start all services:
   ```bash
   docker-compose up -d
   ```

4. Monitor container logs (optional):
   ```bash
   docker-compose logs -f
   ```

5. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080/api
   - Database: localhost:3306 (accessible via database client)

6. Stop the application:
   ```bash
   docker-compose down
   ```

### Individual Docker Commands

**Backend**
```bash
# Build backend image
docker build -t gestionprod-backend .
# Run backend container
docker run -p 8080:8080 --name production-backend -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/production_db -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=root gestionprod-backend
```

**Frontend**
```bash
# Navigate to frontend folder
cd frontend
# Build frontend image
docker build -t gestionprod-frontend .
# Run frontend container
docker run -p 80:80 --name production-frontend gestionprod-frontend
```

**Database**
```bash
# Run MySQL container
docker run -p 3306:3306 --name production-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=production_db -d mysql:8.0
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
```