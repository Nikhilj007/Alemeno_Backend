const fs = require('fs');
const csv = require('csv-parser');
const Customer = require('./models/Customer');
const Loan = require('./models/Loan');

const ingestCustomerData = async () => {
  try {
    const customers = [];

    fs.createReadStream('../../data/customer_data.xlsx')
      .pipe(csv())
      .on('data', (data) => {
        const customer = {
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          monthly_salary: data.monthly_salary,
          approved_limit: data.approved_limit,
          current_debt: data.current_debt,
        };
        customers.push(customer);
      })
      .on('end', async () => {
        await Customer.bulkCreate(customers);
        console.log('Customer data ingested successfully');
      });
  } catch (error) {
    console.error('Error ingesting customer data:', error);
  }
};

const ingestLoanData = async () => {
  try {
    const loans = [];

    fs.createReadStream('../../data/loan_data.xlsx')
      .pipe(csv())
      .on('data', (data) => {
        const loan = {
          customer_id: data.customer_id,
          loan_amount: data.loan_amount,
          tenure: data.tenure,
          interest_rate: data.interest_rate,
          monthly_repayment: data.monthly_repayment,
          emis_paid_on_time: data.emis_paid_on_time,
          start_date: data.start_date,
          end_date: data.end_date,
        };
        loans.push(loan);
      })
      .on('end', async () => {
        await Loan.bulkCreate(loans);
        console.log('Loan data ingested successfully');
      });
  } catch (error) {
    console.error('Error ingesting loan data:', error);
  }
};

const ingestData = async () => {
  try {
    await ingestCustomerData();
    await ingestLoanData();
  } catch (error) {
    console.error('Error ingesting data:', error);
  }
};

module.exports = ingestData;