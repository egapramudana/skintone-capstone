const { detectSkinTone, getSuggestions } = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData } = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, skinTone } = await detectSkinTone(model, image);
  const suggestions = getSuggestions(skinTone);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    skinTone,
    suggestions,
    createdAt
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  });
  response.code(201);
  return response;
}

async function getHistories(request, h) {
  const { firestore } = request.server.app;
  const predictCollection = firestore.collection('predictions');

  try {
    const snapshot = await predictCollection.get();
    const histories = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    return h.response({ status: 'success', data: histories }).code(200);
  } catch (error) {
    return h.response({ status: 'fail', message: error.message }).code(500);
  }
}

module.exports = { postPredictHandler, getHistories };
