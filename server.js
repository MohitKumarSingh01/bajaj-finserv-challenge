const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// POST Method
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    // Validate input
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    // Extract numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

    // Find the highest alphabet (case-insensitive)
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      highest_alphabet = [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))];
    }

    // Prepare response
    const response = {
      is_success: true,
      user_id: "mohit_kumar_singh_22102003", // Replace with your fullname_ddmmyyyy
      email: "22BCS10039@cuchd.in", // Replace with your college email
      roll_number: "22BCS10039", // Replace with your roll number
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

// GET Method
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
