const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user.route');
const CustomerRoute = require('./routes/customer.route');
const CategoryRoute = require('./routes/category.route');
const fiscalyearRoute = require('./routes/fiscalyear.route');
const OrderRoute = require('./routes/order.route');
const ItemRoute = require('./routes/item.route');
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdocs = require("swagger-jsdoc");
const swaggerOptions = require("./docs/swagger");
const fileUploadRoute = require("./routes/fileUploadRoute");
const contactUsRoute = require('./routes/ContactUsRoute');
const aboutusRoute = require('./routes/aboutusRoute');
const sliderImageRoute = require('./routes/sliderImageRoute');
const ourServiceRoute = require('./routes/ourserviceRoute');
const ourActivityRoute = require('./routes/ouractivityRoute');
const galleryRoute = require('./routes/albumRoute');
const transactionRoute = require('./routes/transactionRoute');
const cookieParser = require('cookie-parser');
const paginationRoute = require('./routes/paginationRoute');

const app = express();
app.use(cors());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdocs(swaggerOptions))
  );

  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/user",UserRoute);
app.use("/category",CategoryRoute);
app.use("/order",OrderRoute);
app.use("/customer",CustomerRoute);
app.use("/item",ItemRoute);
app.use("/fiscalYear",fiscalyearRoute);
app.use("/contactus", contactUsRoute);
app.use("/aboutus", aboutusRoute);
app.use("/slider",sliderImageRoute)
app.use("/gallery",galleryRoute)
app.use("/ourService",ourServiceRoute)
app.use("/ourActivity",ourActivityRoute)
app.use("/file", fileUploadRoute);
app.use("/transaction", transactionRoute);
app.use("/paginate", paginationRoute);

module.exports = app;
