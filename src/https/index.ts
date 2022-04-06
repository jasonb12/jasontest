import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
// import admin from "firebase-admin";
import { spawn } from "child-process-promise";
// import mkdirp from "mkdirp";
// import path from "path";
// import fs from "fs";

// admin.initializeApp();
const app = express();

/**
 * Plugins / Middleware
 */
app.use(cors());

/**
 * Routes / Endpoints
 */

/**
  GET http://test.com
*/

/**
 * Example
 * Start writing Firebase Functions
 * https://firebase.google.com/docs/functions/typescript
 */
app.get("/", (_, response) => {
  response.send("Hello from Firebase Again!");
});

app.get("/yarnVersion", (_, response) => {
  // const promise = spawn("yarn", ["version"], { capture: ["stdout", "stderr"] });
  const promise = spawn("yarn", ["version"], { capture: ["stdout", "stderr"] });
  promise
    .then((result) => {
      response.send(`Result: \n Out2: \n ${result.stdout}\n Err2: \n ${result.stderr}`);
    })
    .catch((err) => {
      response.send("Error: " + err);
    });
});

app.get("/uname", (_, response) => {
  // const promise = spawn("yarn", ["version"], { capture: ["stdout", "stderr"] });
  const promise = spawn("uname", ["-a"], { capture: ["stdout", "stderr"] });
  promise
    .then((result) => {
      response.send(`Result: \n Out2: \n ${result.stdout}\n Err2: \n ${result.stderr}`);
    })
    .catch((err) => {
      response.send("Error: " + err);
    });
});

app.get("/npm", (_, response) => {
  // const promise = spawn("yarn", ["version"], { capture: ["stdout", "stderr"] });
  const promise = spawn("npm", ["version"], { capture: ["stdout", "stderr"] });
  promise
    .then((result) => {
      response.send(`Result: \n Out2: \n ${result.stdout}\n Err2: \n ${result.stderr}`);
    })
    .catch((err) => {
      response.send("Error: " + err);
    });
});
// exports.imageToJPG = functions.storage.object().onFinalize(async (object) => {
//   const filePath = object.name;
//   const baseFileName = path.basename(filePath, path.extname(filePath));
//   const fileDir = path.dirname(filePath);
//   const JPEGFilePath = path.normalize(path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION }));
//   const tempLocalFile = path.join(os.tmpdir(), filePath);
//   const tempLocalDir = path.dirname(tempLocalFile);
//   const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);

//   // Exit if this is triggered on a file that is not an image.
//   if (!object.contentType.startsWith("image/")) {
//     functions.logger.log("This is not an image.");
//     return null;
//   }

//   // Exit if the image is already a JPEG.
//   if (object.contentType.startsWith("image/jpeg")) {
//     functions.logger.log("Already a JPEG.");
//     return null;
//   }

//   const bucket = admin.storage().bucket(object.bucket);
//   // Create the temp directory where the storage file will be downloaded.
//   await mkdirp(tempLocalDir);
//   // Download file from bucket.
//   await bucket.file(filePath).download({ destination: tempLocalFile });
//   functions.logger.log("The file has been downloaded to", tempLocalFile);
//   // Convert the image to JPEG using ImageMagick.
//   await spawn("convert", [tempLocalFile, tempLocalJPEGFile]);
//   functions.logger.log("JPEG image created at", tempLocalJPEGFile);
//   // Uploading the JPEG image.
//   await bucket.upload(tempLocalJPEGFile, { destination: JPEGFilePath });
//   functions.logger.log("JPEG image uploaded to Storage at", JPEGFilePath);
//   // Once the image has been converted delete the local files to free up disk space.
//   fs.unlinkSync(tempLocalJPEGFile);
//   fs.unlinkSync(tempLocalFile);
//   return null;
// });
export const api = functions.https.onRequest(app);
