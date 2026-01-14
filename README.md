# Distributed Demo Project

A full-stack distributed application DEMO featuring a Spring Boot backend, an Angular frontend, PostgreSQL 16 for persistent storage, and Redis for high-performance caching.

---

## 1. Project Overview

This project runs a distributed stack using Docker Compose:
- **Backend**: Spring Boot service.
- **Frontend**: Angular web application.
- **Database**: PostgreSQL 16.
- **Cache**: Redis (high-performance caching).
- **Proxy**: Nginx reverse proxy to the backend.

---

## 2. Prerequisites

- Docker and Docker Compose installed.
- (Optionally) Bruno (API client) for manual backend endpoint testing.

---

## 3. Getting Started

From the project root:

```bash
docker-compose up --scale backend=3
```
This spins up the entire infrastructure (database, cache, backend, frontend, and proxy) with default 3 instances of backend.

To stop the stack:

```bash
docker-compose down
```

## 4. Access Points

- **Frontend**: `http://localhost:4200`
- **Backend API** (via Nginx): `http://localhost:8080`

---

## 5. Authentication

The backend requires an API key for all requests.

- **Test API Key**: `U69gjmAxp5Y4HOF94QzO2qrj8lkZbOEn`
- Enter this key into the **`apikey`** field in the frontend UI and save it to enable record management and other secured features.

---

## 6. API Documentation (Bruno)

A Bruno collection is included in the repository.

Use it to:
- Inspect available endpoints.
- See required headers (including API key).
- Understand request and response models.

Steps:
1. Open Bruno.
2. Import the provided collection from the repo.
3. Set the base URL to `http://localhost:8080`.
4. Configure the API key in the collection/environment if applicable.

---

## 7. Infrastructure & Services

The stack defined in `docker-compose.yml` includes:

- **db**: PostgreSQL 16  
  - User: `user`
  - Password `password`
  - Database: `distributed-demo`
- **redis**: Redis `8.4-alpine`  
  - Port: `6379`
- **backend**: Spring Boot idempotent services connected to PostgreSQL and Redis.
- **nginx**: Nginx `1.29-alpine` reverse proxy in front of the backend.
- **frontend**: Angular-based web UI.

---

## 8. Data Persistence

PostgreSQL data is stored in a Docker volume named **`pgdata`**, so data remains available even after stopping the containers with `docker-compose down`. To completely remove persisted data, run:

```bash
docker-compose down -v
```
