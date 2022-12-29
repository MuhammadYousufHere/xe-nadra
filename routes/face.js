const express = require("express");
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const Face = require("../model/Face");
faceapi.env.monkeyPatch({ Canvas, Image });
const router = express.Router();
async function LoadModels() {
  // Load the models
  // __dirname gives the root directory of the server
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/model");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/model");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/model");
}
LoadModels();

async function uploadLabeledImages(images, label) {
  try {
    const descriptions = [];
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      // Read each face and save the face descriptions in the descriptions array
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }

    // Create a new face document with the given label and save it in DB
    const createFace = new Face({
      label: label,
      descriptions: descriptions,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

router.post("/", async (req, res) => {
  const File1 = req.files.File1.tempFilePath;
  const File2 = req.files.File2.tempFilePath;
  const File3 = req.files.File3.tempFilePath;
  const label = req.body.label;
  let result = await uploadLabeledImages([File1, File2, File3], label);
  if (result) {
    res.json({ message: "Face data stored successfully" });
  } else {
    res.json({ message: "Something went wrong, please try again." });
  }
});

module.exports = router;
