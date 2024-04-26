const customerService = require('../services/customerService');

exports.registerCustomer = async (req, res) => {
  try {
    const customerData = req.body;

    const customer = await customerService.registerCustomer(customerData);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();

    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await customerService.getCustomerById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = req.body;

    const updatedCustomer = await customerService.updateCustomer(
      customerId,
      customerData
    );

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const success = await customerService.deleteCustomer(customerId);

    if (!success) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};