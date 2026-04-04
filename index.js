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

function power(a, b) {
    return a ** b;
}

function sqrt(a) {
    return Math.sqrt(a);
}

function modulus(a, b) {
    return a % b;
}

app.get('/calculate', (req, res) => {
    const { op, a, b } = req.query;

    if (!op) {
        return res.status(400).json({
            message: "Operation (op) is required"
        });
    }

    const numA = Number(a);
    const numB = Number(b);

    let result;

    switch (op) {
        case 'add':
            if (!a || !b) return res.status(400).json({ message: "a and b required"})
            result = add(numA, numB);
            break;
        case 'sub':
            result = subtract(numA, numB);
            break;
        case 'mul': 
            result = multiply(numA, numB);
            break;
        case 'div':
            result = divide(numA, numB);
            break;
        case 'pow':
            if (!a || !b) return res.status(400).json({ message: "a and b required"})
            result = power(numA, numB);
            break;
        case 'mod':
            if (!a || !b) return res.status(400).json({ message: "a and b required"})
            result = modulus(numA, numB);
            break;
        case 'sqrt':
             if (!a) return res.status(400).json({ message: "a and b required"})
            result = sqrt(numA);
            break;

        default:
            return res.status(400).json({
                message: "Invalid operation"
            });
    }

    res.json({
        success: true,
        operation: op,
        inputs: { a, b },
        result
    });
});

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Calculator API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
