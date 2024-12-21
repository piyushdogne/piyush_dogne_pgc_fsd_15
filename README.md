##Guide to Run the Backend for ShoppyGlobe and Test APIs
This document provides detailed steps to set up, run the backend for ShoppyGlobe, and test all the APIs.
Prerequisites
Ensure the following software and tools are installed on your system:
1. Node.js (LTS version recommended)
2. MongoDB (Ensure the service is running locally or use a cloud instance like MongoDB Atlas)
3. Postman or any API testing tool (optional for testing)
4. A code editor (e.g., VS Code)
Steps to Run the Backend
1. Clone the Repository
Clone the ShoppyGlobe repository from GitHub using the following command:
```bash
git clone https://github.com/piyushdogne/piyush_dogne_pgc_fsd_15.git
```
2. Install Dependencies
Navigate to the backend directory and install the required dependencies:
```bash
npm install
```
4. Start the Backend Server
Start the server using the following command:
```bash
npm start
```
The backend will run on `http://localhost:5000` by default.
Testing APIs
1. Using Postman
You can use Postman to test the APIs by sending requests to the server. Below are the API details:
2. API Endpoints
API Endpoint	Method	Description

/api/auth/register	POST	Register a new user.

/api/auth/login	POST	Login user and retrieve token.

/api/auth/verify-token	POST	Verify user token.

/api/cart	GET	Fetch user-specific cart.

/api/cart/add	POST	Add item to cart.

/api/cart/update/:id	PUT	Update cart item quantity.

/api/cart/remove/:id	DELETE	Remove item from cart.

/api/products/create POST Create Product

/api/products/ GET Fetch Products

Ensure to include the JWT token in the `Authorization` header as `Bearer <token>` for protected routes.

Conclusion
Follow the above steps to run the backend and test the APIs for ShoppyGlobe. For any issues, check the logs in the terminal or contact the development team.
