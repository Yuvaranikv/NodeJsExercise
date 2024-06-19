const fs = require('fs');

// Function to get the current date and time as a string
function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString();
}

// File path
const filePath = 'data.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(data);
       console.log(jsonData);
       console.log(data);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return;
    }

    // Get current date and time
    const currentDateTime = getCurrentDateTime();

    // Append current date and time to each element
    jsonData.forEach(item => {
        item.updatedAt = currentDateTime;
    });

    // Convert the updated array back to JSON string
    const updatedData = JSON.stringify(jsonData, null, 2); // pretty print with 2 spaces

    // Write the updated JSON back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing file:', writeErr);
            return;
        }
        console.log('The "updatedAt" property was appended to each element in the file!');
    });
});
