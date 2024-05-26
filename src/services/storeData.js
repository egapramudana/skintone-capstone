const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

async function storeData(id, data) {
  const predictCollection = firestore.collection('predictions');

  const documentData = {
    id: data.id,
    skinTone: data.skinTone,
    suggestions: data.suggestions.map(suggestion => ({
      shade_id: suggestion.shade_id,
      description: suggestion.description,
      image_url: suggestion.image_url,
      skintone: suggestion.skintone,
      source: suggestion.source,
      recommended_brands: suggestion.recommended_brands
    })),
    createdAt: Firestore.Timestamp.now()
  };

  return predictCollection.doc(id).set(documentData);
}

module.exports = { storeData, firestore };
