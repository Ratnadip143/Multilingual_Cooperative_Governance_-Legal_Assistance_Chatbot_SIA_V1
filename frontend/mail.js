const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS so your frontend (HTML file) can fetch data from this server
app.use(cors()); 
app.use(express.json()); // Allows server to accept JSON data if you want to POST messages later

// This is the route our frontend fetches from
app.get('/api/messages', (req, res) => {
    
    // In a real application, you would query a database here (e.g., MongoDB, PostgreSQL)
    const backendMessages = [
        { 
            id: 101, 
            sender: "Backend Server", 
            subject: "Connection Successful!", 
            body: "If you are reading this, your HTML frontend is successfully fetching data from your Node.js backend. Great job!", 
            date: new Date().toISOString() 
        },
        { 
            id: 102, 
            sender: "Security Bot", 
            subject: "Weekly Audit", 
            body: "No vulnerabilities found. The green and white theme has been securely deployed.", 
            date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
    ];

    // Send the array as a JSON response to the frontend
    res.json(backendMessages);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});