import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const phase = process.env.PHASE || "local";

let envConfig;

if (phase === "production") {
  envConfig = require("./production").default;
} else if (phase === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  phase,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: 3001,
  logging: false,
};

export default merge(defaultConfig, envConfig);