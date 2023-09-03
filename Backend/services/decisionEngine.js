const decisionEngine = (payload) => {
  const { preAssessment, loanAmount } = payload;
  if (preAssessment === "60") {
    return +loanAmount * 0.6;
  } else if (preAssessment === "100") {
    return +loanAmount;
  } else {
    return +loanAmount * 0.2;
  }
};

module.exports = { decisionEngine };
