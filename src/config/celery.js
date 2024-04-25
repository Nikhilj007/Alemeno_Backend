const celery = require('celery-node');

// Celery broker configuration
const broker = process.env.CELERY_BROKER_URL || 'amqp://guest:guest@localhost:5672//';

// Celery backend configuration (for storing results)
const backend = process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/credit_approval_system';

// Create a Celery instance
const cel = celery.createClient({
  BROKER_URL: broker,
  BACKEND_URL: backend,
  CELERY_DEFAULT_QUEUE: 'default',
  CELERY_DEFAULT_EXCHANGE: 'default',
  CELERY_DEFAULT_ROUTING_KEY: 'default',
});

// Connect to the Celery broker
cel.connectBroker().then(() => {
  console.log('Connected to Celery broker');
}).catch((err) => {
  console.error('Failed to connect to Celery broker:', err);
});

module.exports = cel;