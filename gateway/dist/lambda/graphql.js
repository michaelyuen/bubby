(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./graphql.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./graphql.js":
/*!********************!*\
  !*** ./graphql.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const ws = require("ws");
// const { ApolloLink, split } = require("apollo-link");
// const { ApolloServer } = require("apollo-server");
const express = __webpack_require__(/*! express */ "express"); // const { ApolloServer } = require("apollo-server-express");


const {
  ApolloServer
} = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");

const {
  HttpLink
} = __webpack_require__(/*! apollo-link-http */ "apollo-link-http"); // const { WebSocketLink } = require("apollo-link-ws");
// const { getMainDefinition } = require("apollo-utilities");


const fetch = __webpack_require__(/*! node-fetch */ "node-fetch");

const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} = __webpack_require__(/*! graphql-tools */ "graphql-tools");

const app = express();
const isProduction = "development" === "production";
const serverBaseUrl = isProduction ? "https://bubby-server.netlify.com" : `http://localhost:9000`;
const messagesBaseUrl = isProduction ? "https://limitless-stream-50260.herokuapp.com/" : `http://localhost:4000`;
const serverLink = new HttpLink({
  uri: `${serverBaseUrl}/.netlify/functions/graphql`,
  fetch
});
const messagesLink = new HttpLink({
  uri: messagesBaseUrl,
  fetch
}); // const messagesWsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//   },
//   webSocketImpl: ws,
// });
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const messagesLink = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     console.log(definition);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   messagesWsLink,
//   messagesHttpLink
// );

const createSchema = async () => {
  const serverSchema = await introspectSchema(serverLink);
  const messagesSchema = await introspectSchema(messagesLink); //const messagesWsSchema = await introspectSchema(messagesWsLink);

  const serverExecutableSchema = makeRemoteExecutableSchema({
    schema: serverSchema,
    link: serverLink
  });
  const messagesExecutableSchema = makeRemoteExecutableSchema({
    schema: messagesSchema,
    link: messagesLink
  }); // const messagesWsExecutableSchema = makeRemoteExecutableSchema({
  //   schema: messagesWsSchema,
  //   link: messagesWsLink,
  // });

  const schema = mergeSchemas({
    schemas: [serverExecutableSchema, messagesExecutableSchema // messagesWsExecutableSchema,
    ]
  }); // return schema;
  // const server = new ApolloServer({
  //   schema,
  //   // TODO: Make these ENV specific
  //   playground: true,
  //   introspection: true,
  // });
  // return server.listen({ port: 9001 });
  // return server.createHandler({
  //   cors: {
  //     origin: "*",
  //     credentials: true,
  //   },
  // });
};

createSchema().then(schema => {
  const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true
  });
  server.applyMiddleware({
    app
  });
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
});
module.exports = app; // startServer().then(({ url }) => {
//   console.log(`Gateway ready at ${url} 🏛️`);
// });

/***/ }),

/***/ "apollo-link-http":
/*!***********************************!*\
  !*** external "apollo-link-http" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ })

/******/ })));