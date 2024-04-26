const Loan = require('../models/Loan');

const calculateCreditScore = async (customer) => {
  const { customer_id } = customer;
  const loans = await Loan.getAllLoansForCustomer(customer_id);

  const loansPaidOnTime = loans.filter((loan) => loan.emis_paid_on_time === loan.tenure);
  const loansPastYear = loans.filter((loan) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return loan.start_date > oneYearAgo;
  });
  const loanApprovedVolume = loans.reduce((sum, loan) => sum + loan.loan_amount, 0);

  const creditScore =
    (loansPaidOnTime.length * 20) +
    (100 - loans.length * 10) +
    (loansPastYear.length * 10) +
    (loanApprovedVolume > customer.approved_limit ? 0 : 20) +
    (loans.some((loan) => loan.emis_paid_on_time !== loan.tenure) ? 0 : 40);

  return Math.max(0, Math.min(100, creditScore));
};

module.exports = {
  calculateCreditScore,
};