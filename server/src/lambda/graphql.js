require("dotenv").config();
// https://stackoverflow.com/questions/41214625/firebase-node-js-error-the-xmlhttprequest-compatibility-library-was-not-foun
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;
const { ApolloServer } = require("apollo-server-lambda");
const firebase = require("firebase/app").default;
require("firebase/auth");
const admin = require("firebase-admin");
const env = require("../env");
const resolvers = require("../resolvers");
const typeDefs = require("../schema");
const { parseToken } = require("../utils");
const FirebaseAdmin = require("../datasources/firebaseAdmin");
const FirebaseClient = require("../datasources/firebaseClient");

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_PROJECT_ID,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

const dataSources = () => ({
  firebaseAdmin: new FirebaseAdmin({ admin }),
  firebaseClient: new FirebaseClient({ firebase })
});

const context = async req => {
  try {
    const token = parseToken(req);

    if (!token) {
      return null;
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);
    return { user };
  } catch (error) {
    /**
     * TODO: auth/id-token-expired
     * https://firebase.google.com/docs/auth/admin/errors
     * - How should we handle this?
     */
    console.error(error.message);
    return error.message;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  // TODO: Make these ENV specific
  playground: true,
  introspection: true
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
