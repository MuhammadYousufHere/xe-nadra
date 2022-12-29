const express = require("express");
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");

const User = require("../model/User");
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
async function getDescriptorsFromDB(image) {
  // Get all the face data from mongodb and loop through each of them to read the data
  let faces = await User.find();
  for (i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    // Turn the DB face docs to
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  // Process the image for the model
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);

  // Find matching faces
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}
router.post("/", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const File = req.files.image.tempFilePath;
  let result = await getDescriptorsFromDB(File);
  if (result) {
    res.json({ message: result });
  } else {
    res.json({ message: "Something went wrong, please try again." });
  }
});

module.exports = router;
