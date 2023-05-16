const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');
server.use(projectsRouter);
server.use(actionsRouter);

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
});

module.exports = server;
