const { sqlConfig } = require("./config");
const mssql = require('mssql');

async function getCatalog() {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT * FROM dbo.Icecreams ORDER BY [Id]`);

  return result.recordset;
}

async function getIcecream(icecreamId) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .input('icecreamId', mssql.Int, icecreamId)
    .query(`SELECT TOP 1 * FROM dbo.icecreams WHERE [Id] = @icecreamId`);

  return result.recordset;
};

module.exports = { getCatalog, getIcecream };
