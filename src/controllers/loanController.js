const loanService = require('../services/loanService');

exports.checkEligibility = async (req, res) => {
  try {
    const { customerId, loanAmount, interestRate, tenure } = req.body;

    const eligibilityResponse = await loanService.checkEligibility(
      customerId,
      loanAmount,
      interestRate,
      tenure
    );

    res.json(eligibilityResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { customerId, loanAmount, interestRate, tenure } = req.body;

    const loanResponse = await loanService.createLoan(
      customerId,
      loanAmount,
      interestRate,
      tenure
    );

    res.json(loanResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loanDetails = await loanService.getLoanById(loanId);

    res.json(loanDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};