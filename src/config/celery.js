const celery = require('celery-node');
const ingestData = require("../workers/dataIngestionWorker");

// Celery broker configuration
const broker = process.env.CELERY_BROKER_URL || 'amqp://guest:guest@localhost:5672//';

// Celery backend configuration (for storing results)
const backend = process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/credit_approval_system';

// console.log(broker, backend);

// Create a Celery instance
const cel = celery.createClient( 
    broker
);

const dataIngestionTask = cel.createTask('data_ingestion', ingestData);


module.exports = dataIngestionTask;