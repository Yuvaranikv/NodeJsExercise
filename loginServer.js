const http = require("http");
const PORT = process.env.PORT || 3000;

let users = [
    { username: 'john_doe', name: 'John Doe', email: 'john@example.com' },
    { username: 'jane_smith', name: 'Jane Smith', email: 'jane@example.com' }
  ];

const server = http.createServer((req, res) => {
  // Handle only POST requests to /login
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    // Read incoming data as chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { username, password } = data;

        // Check if both username and password are provided
        if (username && password) {
          // Simulate authentication logic (replace with actual logic)
          if (username === "admin" && password === "password") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Login successful" }));
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid credentials" }));
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Username and password are required" })
          );
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
  } 
  else if (req.method === 'PUT' && req.url === '/update') 
  {
   let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const updateData = JSON.parse(body);
    const { username, ...attributesToUpdate } = updateData;

    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      // Update user attributes
      users[userIndex] = { ...users[userIndex], ...attributesToUpdate };
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Update Successful!');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Username not found');
    }
  });
  }
  else {
    // Handle other routes or methods
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
