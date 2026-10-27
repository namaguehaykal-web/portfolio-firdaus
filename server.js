// =========================================================================
// Server Backend Portofolio Full-Stack - Muhammad Firdaus Haykal
// Powered by Node.js Native HTTP (Zero external dependencies needed)
// =========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'data', 'portfolio-data.json');
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json');

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper: Read Portfolio Data
function getPortfolioData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading portfolio data:', err);
  }
  return {};
}

// Helper: Ensure messages file exists
function getMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading messages file:', err);
  }
  return [];
}

function saveMessage(messageObj) {
  try {
    const list = getMessages();
    list.unshift(messageObj);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving message:', err);
    return false;
  }
}

// HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoints
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Health check
    if (pathname === '/api/health' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'online',
        server: 'Firdaus Media Portfolio Core API',
        nodeVersion: process.version,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      }));
      return;
    }

    // Full Portfolio Data
    if (pathname === '/api/data' && method === 'GET') {
      const data = getPortfolioData();
      res.writeHead(200);
      res.end(JSON.stringify(data));
      return;
    }

    // Profile endpoint
    if (pathname === '/api/profile' && method === 'GET') {
      const data = getPortfolioData();
      res.writeHead(200);
      res.end(JSON.stringify(data.profile || {}));
      return;
    }

    // Projects endpoint
    if (pathname === '/api/projects' && method === 'GET') {
      const data = getPortfolioData();
      const category = parsedUrl.query.category;
      let projects = data.projects || [];
      if (category && category !== 'all') {
        projects = projects.filter(p => p.category === category);
      }
      res.writeHead(200);
      res.end(JSON.stringify(projects));
      return;
    }

    // Experience & Education
    if (pathname === '/api/experience' && method === 'GET') {
      const data = getPortfolioData();
      res.writeHead(200);
      res.end(JSON.stringify({
        education: data.education || [],
        experience: data.experience || [],
        achievements: data.achievements || []
      }));
      return;
    }

    // Skills
    if (pathname === '/api/skills' && method === 'GET') {
      const data = getPortfolioData();
      res.writeHead(200);
      res.end(JSON.stringify({
        skills: data.skills || [],
        tools: data.toolsList || []
      }));
      return;
    }

    // Contact POST Handler
    if (pathname === '/api/contact' && method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 1e6) { // 1MB flood protection
          req.connection.destroy();
        }
      });

      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const { name, email, projectType, message } = payload;

          if (!name || !email || !message) {
            res.writeHead(400);
            res.end(JSON.stringify({
              success: false,
              error: 'Nama, Email, dan Pesan wajib diisi.'
            }));
            return;
          }

          const messageRecord = {
            id: 'msg_' + Date.now(),
            name: name.trim(),
            email: email.trim(),
            projectType: (projectType || 'General Inquiry').trim(),
            message: message.trim(),
            createdAt: new Date().toISOString(),
            ip: req.socket.remoteAddress
          };

          saveMessage(messageRecord);

          // WhatsApp link generator
          const waPhone = '6282230076610';
          const waText = encodeURIComponent(
            `Halo Haykal! Saya ${messageRecord.name} (${messageRecord.email}).\n` +
            `Kebutuhan Proyek: ${messageRecord.projectType}\n\n` +
            `Pesan:\n${messageRecord.message}`
          );
          const whatsappUrl = `https://wa.me/${waPhone}?text=${waText}`;

          res.writeHead(201);
          res.end(JSON.stringify({
            success: true,
            message: 'Terima kasih! Pesan Anda telah tersimpan dengan aman.',
            whatsappUrl: whatsappUrl,
            data: messageRecord
          }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            error: 'Format data JSON tidak valid.'
          }));
        }
      });
      return;
    }

    // List messages (read API)
    if (pathname === '/api/messages' && method === 'GET') {
      const messages = getMessages();
      res.writeHead(200);
      res.end(JSON.stringify(messages));
      return;
    }

    // 404 for unknown API
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint API tidak ditemukan.' }));
    return;
  }

  // Static File Serving
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client-side routing
      const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, content) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found - Website Portofolio Muhammad Firdaus Haykal');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Portofolio Firdaus Media Server berjalan di port ${PORT}`);
  console.log(`🌐 Akses Lokal: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - GET  /api/data`);
  console.log(`   - GET  /api/profile`);
  console.log(`   - GET  /api/projects`);
  console.log(`   - GET  /api/experience`);
  console.log(`   - GET  /api/skills`);
  console.log(`   - POST /api/contact`);
  console.log(`=======================================================`);
});
