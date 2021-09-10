const express = require('express');
const userRoute = require('./routes/users_route');
const app = express();


app.use('/users', userRoute);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`server started at http://localhost:${port}`));