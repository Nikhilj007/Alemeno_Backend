const loanService = require("../services/loanService");

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

exports.updateLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loanData = req.body;

    const updatedLoan = await loanService.updateLoan(loanId, loanData);

    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
