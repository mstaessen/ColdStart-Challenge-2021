const { sqlConfig } = require("./config");
const mssql = require('mssql');

async function insertOrder(user, icecreamId, fullAddress) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
  .input('userId', mssql.NVarChar, user)
  .input('icecreamId', mssql.Int, icecreamId)
  .input('fullAddress', mssql.NVarChar, fullAddress)
  .query(`INSERT INTO dbo.Orders ([User], [IcecreamId], [FullAddress]) VALUES (@userId, @icecreamId, @fullAddress)`);
};

async function getLastOrder(userId) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .input('userId', mssql.NVarChar, userId)
    .query(`SELECT TOP 1 * FROM dbo.orders WHERE [User] = @userId ORDER BY [Date] DESC`);

  return result.recordset;
};

module.exports = { insertOrder, getLastOrder };
