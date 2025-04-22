# School Management API

A Node.js-based REST API system for managing school data with geolocation features. This API allows users to add new schools and retrieve a list of schools sorted by proximity to a user's location.

## Features

- Add new schools with location data
- Retrieve schools sorted by proximity to user location
- MySQL database integration
- Input validation
- Geospatial distance calculations

## Technologies Used

- Node.js
- Express.js
- MySQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/mohit251103/educase_india_assignment.git
cd educase_india_assignment
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=name
DB_PORT=3000
```

4. Set up the database
```sql
CREATE DATABASE school;
USE school;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

5. Start the server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Documentation

### Add School API

Adds a new school to the database.

- **Endpoint:** `/api/addSchool`
- **Method:** POST
- **Content-Type:** application/json

**Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Education St, Learning City, 12345",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

**Required Fields:**
- `name` (string): The name of the school
- `address` (string): The physical address of the school
- `latitude` (number): Latitude coordinate of the school location
- `longitude` (number): Longitude coordinate of the school location

**Response:**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

**Error Response:**
```json
{
  "message": "Error message describing the issue",
  "errors": "Error messages by validators or database"
}
```

### List Schools API

Retrieves all schools sorted by proximity to a specified location.

- **Endpoint:** `/api/listSchools`
- **Method:** GET
- **Query Parameters:**
  - `latitude` (number): User's latitude
  - `longitude` (number): User's longitude

**Example Request:**
```
GET /api/listSchools?latitude=37.7749&longitude=-122.4194
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Example School",
      "address": "123 Education St, Learning City, 12345",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "dist": 0.0
    },
    {
      "id": 2,
      "name": "Another School",
      "address": "456 Learning Ave, Education Town, 67890",
      "latitude": 37.7847,
      "longitude": -122.4295,
      "dist": 1.2
    }
  ]
}
```

**Error Response:**
```json
{
  "message": "Error message describing the issue"
}
```

## Testing with Postman

A Postman collection is available for testing the API endpoints. Below are examples of how to use the API:

### Add School Example:
```
POST /api/addSchool
Content-Type: application/json

{
  "name": "Central High School",
  "address": "100 Main St, Anytown, USA",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### List Schools Example:
```
GET /api/listSchools?latitude=40.7128&longitude=-74.0060
```

## Project Structure

```
school-management-api/
├── config/
│   └── db.js       # Database configuration
├── controllers/
│   └── schoolController.js  # API endpoint controllers
├── routes/
│   └── schoolRoutes.js   # API routes
├── .env                  # Environment variables (not tracked in git)
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # This documentation
└── index.js             # Main application entry point
```

Author - [mohit251103](https://github.com/mohit251103)
