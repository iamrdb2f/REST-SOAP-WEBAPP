# WebApp

## Description

WebApp is a dual API service that provides both RESTful and SOAP APIs for managing and retrieving country information. It includes functionalities to fetch, add, and delete country details. This project is built using Node.js and Express.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <repo-name>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be available at:
   - REST API: [http://localhost:3000](http://localhost:3000)
   - SOAP API: [http://localhost:8001](http://localhost:8001)

---

## Available Scripts

### Start the application:

```bash
npm start
```
Uses `nodemon` to monitor file changes and restart the server automatically.

---

## Endpoints

### REST API

1. **Get all countries:**
   - **Endpoint:** `/api/pays`
   - **Method:** `GET`
   - **Response:** List of all countries.

2. **Get country by name:**
   - **Endpoint:** `/api/pays/:name`
   - **Method:** `GET`
   - **Response:** Details of a specific country by name.

3. **Add a new country:**
   - **Endpoint:** `/api/pays`
   - **Method:** `POST`
   - **Request Body:**
     ```json
     {
       "name": "CountryName",
       "capital": "CapitalCity",
       "region": "RegionName",
       "population": 1000000,
       "area": 50000
     }
     ```
   - **Response:** Confirmation of country creation.

4. **Delete a country by name:**
   - **Endpoint:** `/api/pays/:name`
   - **Method:** `DELETE`
   - **Response:** Confirmation of deletion.

### SOAP API

1. **Retrieve country names and codes:**
   - **WSDL URL:** [http://localhost:8001/soap/countries?wsdl](http://localhost:8001/soap/countries?wsdl)
   - **Operation:** `ListOfCountryNamesByCode`
   - **Response:** List of countries with their ISO codes and names.

---

## Contributing

Contributions are welcome! Please open an issue or create a pull request for any enhancements or bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Instructions

1. Save this content as a file named `README.md` in the root of your project directory.
2. Stage and commit the file:
   ```bash
   git add README.md
   git commit -m "Add README.md"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   
