require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("../server/db/conn");
const PORT = process.env.PORT || 5000;
const userRoutes = require('../server/routes/userRoutes/userRoutes');

const contactUs = require('./routes/userRoutes/contactRoutes');
const ecom = require('./routes/eCommerceRoutes/ecomUserRoutes')
app.use(cors())


app.use(express.json());





// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, DELETE",
//     credentials: true
// }));




app.use('/api/users', userRoutes);
app.use('/api/contact',contactUs);
app.use('/api/ecom',ecom);



app.listen(PORT, () => {
    console.log(`Server started at port no ${PORT}`);
});
