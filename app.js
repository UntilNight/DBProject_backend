const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const { getConnection } = require('./config/db'); 
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/restaurants', restaurantRoutes);

// put app.listen inside getConnection()
getConnection().then(() => {
    console.log('Database connection pool created.');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch(err => {
    console.error('Failed to configure the database:', err);
});


