const calculateInterestRate = (creditScore) => {
    if (creditScore > 50) {
      return 10;
    } else if (creditScore > 30 && creditScore <= 50) {
      return 12;
    } else if (creditScore > 10 && creditScore <= 30) {
      return 16;
    } else {
      return 0;
    }
  };
  
  const calculateMonthlyInstallment = (loanAmount, interestRate, tenure) => {
    const effectiveInterestRate = interestRate / 100 / 12;
    const numerator = loanAmount * effectiveInterestRate * Math.pow(1 + effectiveInterestRate, tenure);
    const denominator = Math.pow(1 + effectiveInterestRate, tenure) - 1;
    const monthlyInstallment = numerator / denominator;
    return monthlyInstallment;
  };
  
  module.exports = {
    calculateInterestRate,
    calculateMonthlyInstallment,
  };