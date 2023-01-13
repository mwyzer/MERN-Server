const express = require('express');
const connectDB = require('./config/db');

const app = express();

// this is for heroku/railway deployment to get the port
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//initialize middleware
app.use(express.json({ extended: false }));

app.use('api/auth', require('./routes/api/auth'));
app.use('/api/users/', require('./routes/api/users'));

app.listen(5000, () => console.log(`server started on port ${PORT}`));
