// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.PERSONALIZER_KEY,
  personalizer_baseuri: process.env.PERSONALIZER_BASEURI,
};

const sqlConfig = process.env.SQL_CONNECTIONSTRING;

module.exports = { config, sqlConfig };
