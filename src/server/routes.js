const { detectSkinTone, getSuggestions } = require('./src/services/inferenceService');
const { storeData, firestore } = require('./src/services/storeData');
const { postPredictHandler, getHistories } = require('./src/server/handler');

const routes = [
  // Endpoint for predicting skin tone and foundation suggestion
  {
    method: 'POST',
    path: '/api/predict',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
    }
  },
  // Endpoint for getting prediction histories
  {
    method: 'GET',
    path: '/api/predict/histories',
    handler: getHistories
  },
  // Endpoint for getting all foundation shades
  {
    method: 'GET',
    path: '/api/shades',
    handler: async (request, h) => {
      // Implementation remains the same
    }
  },
  // Endpoint for getting a single foundation shade by ID
  {
    method: 'GET',
    path: '/api/shades/{shadeId}',
    handler: async (request, h) => {
      // Implementation remains the same
    }
  },
  // Endpoint for adding a new foundation shade
  {
    method: 'POST',
    path: '/api/shades',
    handler: async (request, h) => {
      // Implementation remains the same
    }
  }
];

module.exports = routes;
