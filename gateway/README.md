# 🛸 Bubby GraphQL Server - Built on Apollo Server

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7266ccb-530f-4332-8b68-696da32d30be/deploy-status)](https://app.netlify.com/sites/bubby-apollo/deploys)

## Playground

https://bubby-apollo.netlify.com/.netlify/functions/graphql

## Available Scripts

In the project directory, you can run:

### `npm start` 🚀

Runs the Playground.<br />
Open [http://localhost:9000/.netlify/functions/graphql](http://localhost:9000/.netlify/functions/graphql) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any errors in the console.

### `npm build` 🤖

- Removes `/dist`
- Builds Apollo Server as a Netlify Function to `/dist/lambda`

## Netlify Notes 📓

- Typically the root of the Apollo Server would be `src/index.js`, but here it is `src/lambda/graphql.js`.
  - This is due to supporting Netlify Functions (with [netlify-lambda](https://github.com/netlify/netlify-lambda)), where it looks to a source folder (`/src/lambda`) and outputs to a build folder (`/dist/lambda`).
  - When thinking of the root, just look to `src/lambda/graphql.js` and all else should be the same.
- Additionally, there's a custom webpack config (`webpack.lambda.js`) to be aware of. Reference the comment at the top of the file for more info.
- [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/) does what it do
  - In this specific case, I don't think the `base` portion does anything but I think it's good to keep it regardless.
  - I believe this is due to our monorepo structure, because I had to define the base directory in the Netlify UI for the Deploy to work correctly. After that, it picked up the rest from the config file.
- Env variables are defined in the Netlify UI, copied from local values.
