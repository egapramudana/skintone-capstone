const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

// Example skin tone labels and corresponding foundation shades
const skinToneLabels = ['Fair', 'Light', 'Light Medium', 'Medium Tan', 'Dark', 'Deep'];

const foundationSuggestions = {
  "Fair": [
    {
      shade_id: "shade_001",
      description: "VERY FAIR W/NEUTRAL UNDERTONES",
      image_url: "https://storage.googleapis.com/submissionmlgc-egapramudana-bucket/submissions-model/image1.jpg",
      skintone: "Fair",
      source: "Model 1",
      recommended_brands: ["KAT VON D - LIGHT 40", "LANÇOME TEINT IDOLE - 095"]
    },
    {
      shade_id: "shade_002",
      description: "PINK UNDERTONES",
      image_url: "https://storage.googleapis.com/submissionmlgc-egapramudana-bucket/submissions-model/image2.jpg",
      skintone: "Fair",
      source: "Model 2",
      recommended_brands: ["CIATE LONDON - 101N PORCELAIN", "FENTY - 110", "MILK MAKEUP - CREME", "SMASHBOX STUDIO SKIN - 0.1"]
    },
    // Add more shades...
  ],
  "Light": [
    // Add shades...
  ],
  "Light Medium": [
    // Add shades...
  ],
  "Medium Tan": [
    // Add shades...
  ],
  "Dark": [
    // Add shades...
  ],
  "Deep": [
    // Add shades...
  ],
};

async function detectSkinTone(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const skinToneIndex = tf.argMax(prediction, 1).dataSync()[0];
    const skinTone = skinToneLabels[skinToneIndex];

    return { confidenceScore, skinTone };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function getSuggestions(skinTone) {
  return foundationSuggestions[skinTone] || [];
}

module.exports = { detectSkinTone, getSuggestions };
