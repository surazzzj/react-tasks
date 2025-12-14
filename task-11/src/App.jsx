import { useEffect, useState } from "react";

export default function SelectRemote22() {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setOptions(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch options:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getSelectedUserName = () => {
    if (!selectedValue) return "None";
    const selectedOption = options.find(option => option.id.toString() === selectedValue);
    return selectedOption ? selectedOption.name : "Unknown";
  };

  return (
    <div className="select-container">
      <h3>User Selection</h3>
      
      {isLoading ? (
        <div className="loading">Loading options...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <select 
            value={selectedValue} 
            onChange={handleSelectChange}
            disabled={options.length === 0}
            className="select-dropdown"
          >
            <option disabled value="">-- Select a user --</option>
            {options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name} ({option.email})
              </option>
            ))}
          </select>
          
          {options.length === 0 && !isLoading && !error && (
            <div className="no-options">No options available</div>
          )}
        </>
      )}
      
      <div className="selection-info">
        <p><strong>Selected User ID:</strong> {selectedValue || "None"}</p>
        <p><strong>Selected User Name:</strong> {getSelectedUserName()}</p>
      </div>
    </div>
  );
}