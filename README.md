🧮 Calculator API

The Calculator API is a lightweight RESTful service built with Node.js and Express that performs basic arithmetic operations such as addition, subtraction, multiplication, and division.

The API accepts query parameters (a, b, and op) to determine the operation and operands, processes the request on the server, and returns the result in a structured JSON response.

This project serves as a foundational backend application, showcasing core concepts such as routing, controller logic, query parameter handling, and error management. It is also designed to integrate seamlessly with a frontend interface, enabling real-time user interactions through API calls.

🚀 Features
	•	➕ Addition
	•	➖ Subtraction
	•	✖️ Multiplication
	•	➗ Division
    •    √  Sqrt
    •    ^  Power
    •    %  Modulus
	•	🌐 Integrated with a frontend UI

🛠 Tech Stack
	•	Node.js
	•	Express.js

🌍 Frontend Integration

This API serves as the backend for a calculator frontend application.

Users can perform calculations through the UI, which sends requests to this API and displays the results.

https://basic-calculator-api-1.onrender.com/


📁 Project Structure
calculator-api/
│
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── index.js
└── README.md

⚙️ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/Yel-lowBaby/Basic-Calculator-API.git
cd calculator-api

2️⃣ Install dependencies
npm install

3️⃣ Run the server
npm run dev

📬 API Endpoints (For Developers)

These endpoints can be tested using tools like Postman or directly in the browser.

➤ Add Numbers
GET /calculate?op=add&a=10&b=5

Response:
{
    "success": true,
    "operation": "add",
    "inputs": {
        "a": "10",
        "b": "5"
    },
    "result": 15
}

➤ Subtract Numbers
GET /calculate?op=sub&a=10&b=5

➤ Multiply Numbers
GET /calculate?op=mul&a=10&b=5

➤ Divide Numbers
GET /calculate?op=div&a=10&b=5

➤ Square root
GET /calculate?op=sqrt&a=25

➤ Power
Get /calculate?op=pow&a=10&b=5

➤ Modulus
Get /calculate?op=mod&a=10&b=5

⚠️ Error Handling
	•	Division by zero returns an error
	•	Missing query parameters return a bad request response

🧪 Testing
	•	Developers can test endpoints using Postman
	•	Users interact via the frontend interface

👨‍💻 Author
Olayinka Adedapo Abioye
Backend Developer → Backend Engineer loading 😤🔥

⭐ Final Note
This project demonstrates how a backend API integrates with a frontend application to deliver a complete user experience.

It highlights API design, routing, and real-world usage in a full-stack environment.