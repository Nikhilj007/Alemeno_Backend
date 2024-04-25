const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/credit_approval_system');

const Loan = sequelize.define('Loan', {
  loan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  loan_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tenure: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  interest_rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  monthly_repayment: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  emis_paid_on_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Loan;
