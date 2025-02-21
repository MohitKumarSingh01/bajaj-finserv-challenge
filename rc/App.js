import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("Invalid JSON format");
        return;
      }

      // Call the backend API
      const res = await axios.post("https://your-backend-url.herokuapp.com/bfhl", parsedInput);
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid input or server error");
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredData = {};
    if (selectedFilters.includes("numbers")) {
      filteredData.numbers = response.numbers;
    }
    if (selectedFilters.includes("alphabets")) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedFilters.includes("highest_alphabet")) {
      filteredData.highest_alphabet = response.highest_alphabet;
    }

    return (
      <div>
        {Object.entries(filteredData).map(([key, value]) => (
          <p key={key}>
            {key}: {value.join(", ")}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <div>
        <textarea
          placeholder='Enter JSON input, e.g., { "data": ["M", "1", "334", "4", "B"] }'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Multi Filter</h3>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleFilterChange}
            />
            Highest Alphabet
          </label>
          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
