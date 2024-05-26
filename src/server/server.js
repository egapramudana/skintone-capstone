'use strict';
//Ega
const Hapi = require('@hapi/hapi');
const { loadModel } = require('./src/services/loadModel');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
  });

  // Load the model once during server initialization
  const model = await loadModel();
  server.app.model = model;

  // Initialize routes
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
