import http from 'http';
import axios from 'axios';
import fs from 'fs/promises';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { callTotoro } from './OpenAi.js';
import { marked } from 'marked';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT
let dataresponse = "";
const server = http.createServer(async (req, res) => {
  let filePath;
  let fileimg ; 
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
        const data = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
      }
      else{
        fileimg = path.join(__dirname, req.url);
        const data = await fs.readFile(fileimg);
        let ext = path.extname(fileimg).toLowerCase();
        let contentType = 'text/plain';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data)

      }
    }
    else if(req.method === 'POST' && req.url === '/api/test'){
      let body = "" ; 
      req.on('data', chunk => {
        body += (chunk);
      });
      req.on ('end' , async ()=>{
        body = JSON.parse(body)
        console.log(body.query)
        const response = await  callTotoro(body.query)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const markedres = marked(response)
        res.end( markedres);
      })
    } 

    else {
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
