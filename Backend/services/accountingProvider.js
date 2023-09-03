const { sampleBalanceSheet } = require("../constants");

const fetchBalanceSheet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sampleBalanceSheet);
    }, 1000);
  });
};

module.exports = { fetchBalanceSheet };
