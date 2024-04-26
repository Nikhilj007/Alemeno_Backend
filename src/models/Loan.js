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

// Create a new loan
Loan.createLoan = async (loanData) => {
  try {
    const loan = await Loan.create(loanData);
    return loan;
  } catch (error) {
    throw error;
  }
};

// Get all loans
Loan.getAllLoans = async () => {
  try {
    const loans = await Loan.findAll();
    return loans;
  } catch (error) {
    throw error;
  }
};

// Get a loan by ID
Loan.getLoanById = async (id) => {
  try {
    const loan = await Loan.findByPk(id);
    return loan;
  } catch (error) {
    throw error;
  }
};

// Update a loan
Loan.updateLoan = async (id, loanData) => {
  try {
    const loan = await Loan.findByPk(id);
    if (loan) {
      await loan.update(loanData);
      return loan;
    }
    throw new Error('Loan not found');
  } catch (error) {
    throw error;
  }
};

// Delete a loan
Loan.deleteLoan = async (id) => {
  try {
    const loan = await Loan.findByPk(id);
    if (loan) {
      await loan.destroy();
      return true;
    }
    throw new Error('Loan not found');
  } catch (error) {
    throw error;
  }
};

module.exports = Loan;
