const loanController = require('../controllers/loanController');

const router = require('express').Router();

router.post('/check-eligibility', loanController.checkEligibility);
router.post('/create-loan', loanController.createLoan);
router.get('/:loanId', loanController.viewLoan);
router.put('/:loanId', loanController.updateLoan);

module.exports = router;