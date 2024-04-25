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

module.exports = Customer;
