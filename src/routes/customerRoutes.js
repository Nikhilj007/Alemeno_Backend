const customerController = require('../controllers/customerController');

const router = require('express').Router();

router.post('/', customerController.registerCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:customerId', customerController.getCustomerById);
router.put('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

module.exports = router;