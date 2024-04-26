const Loan = require('../models/Loan');
const Customer = require('../models/Customer');
const { calculateCreditScore } = require('../utils/creditScoreCalculator');
const { calculateInterestRate, calculateMonthlyInstallment } = require('../utils/interestCalculator');

const checkEligibility = async (customerId, loanAmount, interestRate, tenure) => {
  const customer = await Customer.getCustomerById(customerId);
  const creditScore = calculateCreditScore(customer);

  const eligibilityResponse = {
    customer_id: customerId,
    approval: false,
    interest_rate: interestRate,
    corrected_interest_rate: null,
    tenure,
    monthly_installment: 0,
  };

  if (creditScore > 50) {
    eligibilityResponse.approval = true;
    eligibilityResponse.corrected_interest_rate = interestRate;
  } else if (creditScore > 30 && creditScore <= 50) {
    eligibilityResponse.approval = true;
    eligibilityResponse.corrected_interest_rate = Math.max(interestRate, 12);
  } else if (creditScore > 10 && creditScore <= 30) {
    eligibilityResponse.approval = true;
    eligibilityResponse.corrected_interest_rate = Math.max(interestRate, 16);
  } else {
    eligibilityResponse.approval = false;
  }

  if (eligibilityResponse.approval) {
    const monthlyIncome = customer.monthly_salary;
    const currentEMIs = await Loan.getCurrentEMIsForCustomer(customerId);
    const totalEMIs = currentEMIs.reduce((sum, loan) => sum + loan.monthly_repayment, 0);

    if (totalEMIs > 0.5 * monthlyIncome) {
      eligibilityResponse.approval = false;
    } else {
      const effectiveInterestRate = eligibilityResponse.corrected_interest_rate || interestRate;
      eligibilityResponse.monthly_installment = calculateMonthlyInstallment(
        loanAmount,
        effectiveInterestRate,
        tenure
      );
    }
  }

  return eligibilityResponse;
};

const createLoan = async (customerId, loanAmount, interestRate, tenure) => {
  const eligibilityResponse = await checkEligibility(customerId, loanAmount, interestRate, tenure);

  if (eligibilityResponse.approval) {
    const loanData = {
      customer_id: customerId,
      loan_amount: loanAmount,
      interest_rate: eligibilityResponse.corrected_interest_rate,
      tenure,
      monthly_repayment: eligibilityResponse.monthly_installment,
      emis_paid_on_time: 0,
      start_date: new Date(),
      end_date: null,
    };

    const loan = await Loan.createLoan(loanData);
    return {
      loan_id: loan.loan_id,
      customer_id: customerId,
      loan_approved: true,
      message: null,
      monthly_installment: eligibilityResponse.monthly_installment,
    };
  } else {
    return {
      loan_id: null,
      customer_id: customerId,
      loan_approved: false,
      message: 'Loan not approved due to low credit score or high existing EMIs.',
      monthly_installment: 0,
    };
  }
};

const getLoanById = async (loanId) => {
  const loan = await Loan.getLoanById(loanId);
  if (!loan) {
    throw new Error('Loan not found');
  }

  const customer = await Customer.getCustomerById(loan.customer_id);
  return {
    loan_id: loan.loan_id,
    customer,
    loan_amount: loan.loan_amount,
    interest_rate: loan.interest_rate,
    monthly_installment: loan.monthly_repayment,
    tenure: loan.tenure,
  };
};

// edit loan details by loan id
const updateLoan = async (loanId, loanData) => {
  const loan = await Loan.getLoanById(loanId);
  if (!loan) {
    throw new Error('Loan not found');
  }

  const updatedLoan = await Loan.updateLoan(loanId, loanData);
  return updatedLoan;
};

module.exports = {
  checkEligibility,
  createLoan,
  getLoanById,
  updateLoan,
};