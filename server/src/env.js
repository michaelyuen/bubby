module.exports = (function(env) {
  const propsWeWant = [
    "NODE_ENV",
    "FIREBASE_API_KEY",
    "FIREBASE_AUTH_DOMAIN",
    "FIREBASE_DATABASE_URL",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_STORAGE_BUCKET",
    "FIREBASE_MESSAGING_SENDER_ID",
    "FIREBASE_APP_ID",
    "FIREBASE_MEASUREMENT_ID"
  ];

  let justTheObjectWeWant = {};
  for (key in env) {
    if (propsWeWant.indexOf(key) !== -1) {
      justTheObjectWeWant[key] = env[key];
    }
  }
  return justTheObjectWeWant;
})(process.env);
