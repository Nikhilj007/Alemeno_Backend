const Customer = require('../models/Customer');

const registerCustomer = async (customerData) => {
  const { monthly_income } = customerData;
  const approved_limit = Math.round(36 * monthly_income / 100000) * 100000;
  const customer = await Customer.createCustomer({ ...customerData, approved_limit });
  return customer;
};

const getAllCustomers = async () => {
  const customers = await Customer.getAllCustomers();
  return customers;
};

const getCustomerById = async (id) => {
  const customer = await Customer.getCustomerById(id);
  return customer;
};

const updateCustomer = async (id, customerData) => {
  const customer = await Customer.updateCustomer(id, customerData);
  return customer;
};

const deleteCustomer = async (id) => {
  const success = await Customer.deleteCustomer(id);
  return success;
};

module.exports = {
  registerCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};