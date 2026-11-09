const db = require('../models');

async function connectToDatabase() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await db.sequelize.sync({alter: true});
        console.log('Database synchronized.');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;