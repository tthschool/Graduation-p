import http from 'http';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Đường dẫn tuyệt đối tới thư mục frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT
console.log(PORT);

console.log(__dirname);
const server = http.createServer(async (req, res) => {
  let filePath;
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
        const data = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
      } else if (req.url === '/api/revenue') {
        // Gọi đến backend
        const response = await axios.get('http://localhost:8080/api/revenue')
        .then((data)=>{
            console.log(data.data);
        })
        res.end();
      } else {
        filePath = path.join(__dirname, 'src', req.url);
        const data = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
      }
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
