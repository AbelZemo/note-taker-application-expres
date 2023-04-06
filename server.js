const express = require('express');
const noteRoutes = require('./routes/routes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', noteRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port :${PORT}!`);
});




