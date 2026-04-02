const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "Cannot divide by zero" : a / b;
}

app.get('/add', (req, res) => {
    const { a, b } = req.query;

    const result = add(Number(a), Number(b));

    res.json({
        operation: "addition",
        result: result
    });
});

app.get('/subtract', (req, res) => {
    const { a, b } = req.query;

    const result = subtract(Number(a), Number(b));

    res.json({
        operation: "subtraction",
        result: result
    });
});

app.get('/multiply', (req, res) => {
    const { a, b } = req.query;

    const result = multiply(Number(a), Number(b));

    res.json({
        operation: "multiplication",
        result: result
    });
});

app.get('/divide', (req, res) => {
    const { a, b } = req.query;

    const result = divide(Number(a), Number(b));

    res.json({
        operation: "division",
        result: result
    });
});


const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Calculator API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
