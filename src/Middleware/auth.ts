import admin from "firebase-admin";
import type { RequestHandler } from "express";

/**
 * Authenticate a request using a firebase id token from a client sdk
 */
export const AuthMiddleware: RequestHandler = (req, res, next) => {
  console.log(`Attempting to authenticate request to ${req.method} => ${req.url}...`);
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header!",
      "Authorization requires passing an HTTP header with the scheme:",
      "Authorization: Bearer <Firebase ID Token>",
    );
    res.status(403).send("Unauthorized Request!");
    return;
  }
  const FirebaseToken = req.headers.authorization.split("Bearer ")[1];
  admin
    .auth()
    .verifyIdToken(FirebaseToken)
    .then((decodedToken) => {
      console.log(`Authentication Succeeded! User ID: ${decodedToken.uid}`);
      req.user = decodedToken;
      /*
        Upon successful authentication pass to the next middleware (or api endpoint)
        callback is necessary for middleware to work!
      */
      // eslint-disable-next-line promise/no-callback-in-promise
      return next();
    })
    .catch((error) => {
      console.error(`Failed to verify Firebase ID Token! Error: ${error}`);
      res.status(403).send("Unauthorized Request! Invalid Token!");
    });
};
