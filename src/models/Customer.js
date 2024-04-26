const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/credit_approval_system');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monthly_salary: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  approved_limit: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  current_debt: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});


// Create a new customer
Customer.createCustomer = async (customerData) => {
  try {
    const customer = await Customer.create(customerData);
    return customer;
  } catch (error) {
    throw error;
  }
};

// Get all customers
Customer.getAllCustomers = async () => {
  try {
    const customers = await Customer.findAll();
    return customers;
  } catch (error) {
    throw error;
  }
};

// Get a customer by ID
Customer.getCustomerById = async (id) => {
  try {
    const customer = await Customer.findByPk(id);
    return customer;
  } catch (error) {
    throw error;
  }
};

// Update a customer
Customer.updateCustomer = async (id, customerData) => {
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.update(customerData);
      return customer;
    }
    throw new Error('Customer not found');
  } catch (error) {
    throw error;
  }
};

// Delete a customer
Customer.deleteCustomer = async (id) => {
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.destroy();
      return true;
    }
    throw new Error('Customer not found');
  } catch (error) {
    throw error;
  }
};


module.exports = Customer;
