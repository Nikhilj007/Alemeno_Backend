const app = require('./app');
const dataIngestionTask = require("./config/celery");
const config = require('./config/database');

config.connectToDatabase(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to the database');

    // Start the data ingestion task
    dataIngestionTask.delay();

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });