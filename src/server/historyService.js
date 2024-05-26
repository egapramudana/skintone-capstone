const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const predictionsCollection = firestore.collection('predictions');

async function getHistories() {
  const snapshot = await predictionsCollection.get();
  const histories = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));
  return histories;
}

module.exports = { getHistories };
