const model = require("../models");
const { Op } = require("sequelize");
const PaginationData = require("../utils/pagination");

exports.saveCustomer = async (req, res) => {
  const customerData = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    customerPhoneNumber: req.body.customerPhoneNumber,
  };
  try {
    let newCustomer = await model.Customer.create(customerData);
    res.status(201).json({
      message: "customer created sucessfully",
      data: newCustomer,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
exports.getCustomer = async (req, res) => {
  try {
    const { customer = "" } = req.query;
    let result = customer.includes("^([9][0-9]{9})$");
    let customers = await model.Customer.findAndCountAll({
      where: result
        ? {
            customerPhoneNumber: {
              [Op.like]: "%" + customer + "%",
            },
          }
        : {
            customerName: {
              [Op.like]: "%" + customer + "%",
            },
          },

      include: [
        {
          model: model.Order,
          as: "orders",
        },
        {
          model: model.OrderTransaction,
          as: "transactionOrder",
        },
      ],
    });
    return res.status(200).json({
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.showCustomerById = async (req, res) => {
  const customerId = req.params.id;
  // const { filterOrder = "",filterTransaction = "" } = req.query;
  // let currentDate = new Date().toISOString().split("T")[0];

  // let orderStartDate = req.query.orderStartDate
  //   ? req.query.orderStartDate
  //   : "0000-01-01";
  // let orderEndDate = req.query.orderEndDate
  //   ? req.query.orderEndDate
  //   : currentDate;

  // let transactionStartDate = req.query.transactionStartDate
  //   ? req.query.transactionStartDate
  //   : "0000-01-01";
  // let transactionEndDate = req.query.transactionEndDate
  //   ? req.query.transactionEndDate
  //   : currentDate;

  try {
    let customers = await model.Customer.findByPk(customerId, {
      include: [
        {
          model: model.Order,
          as: "orders",
        },
        {
          model: model.OrderTransaction,
          as: "transactionOrder",
        },
      ],
    });
    res.status(200).json({
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.getCustomerByOrder = async (req, res) => {
  const customerId = req.params.id;
  const { filterOrder = "" } = req.query;
  let currentDate = new Date().toISOString().split("T")[0];

  let orderStartDate = req.query.orderStartDate
    ? req.query.orderStartDate
    : "0000-01-01";
  let orderEndDate = req.query.orderEndDate
    ? req.query.orderEndDate
    : currentDate;

  try {

    
  await model.FiscalYear.findOne({ where: { status: true } }).then(
    async (activeFiscalYearData) => {
      if (activeFiscalYearData) {

    let customers = await model.Customer.findByPk(customerId, {
      include: [
        {
          model: model.Order,
          as: "orders",
          include: [
            {
              model: model.Customer,
              as: "customer",
            },
            {
              model: model.User,
              as: "user",
            },
            {
              model: model.FiscalYear,
              as: "fiscalYear",
            },
            {
              model: model.OrderedItem,
              required: true,
              attributes: ["orderId", "itemId", "quantity", "itemPrice"],
              include: {
                model: model.Item,
                as: "itemLists",
                attributes: ["name"],
              },
            },
          ],
          
          where: {
            fiscalYearId:activeFiscalYearData.id,
            orderDate: {
                [Op.between]: [orderStartDate, orderEndDate],
              },

            [Op.or]: [
              {
                orderInvoiceNo: {
                  [Op.like]: "%" + filterOrder + "%",
                },
              },
              {
                workStatus: {
                  [Op.like]: "%" + filterOrder + "%",
                },
              },
            ],
          },
        },
      ],
    });
  return res.status(200).json({
      data: customers,
    });
  }
    else {
      res.status(400).json({ message: "Please active fiscal year!!" });
    }
  }
);

  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

exports.getCustomerByTransaction = async (req, res) => {
  const customerId = req.params.id;
  const { filterTransaction = "" } = req.query;
  let currentDate = new Date().toISOString().split("T")[0];

  let transactionStartDate = req.query.transactionStartDate
    ? req.query.transactionStartDate
    : "0000-01-01";
  let transactionEndDate = req.query.transactionEndDate
    ? req.query.transactionEndDate
    : currentDate;

  try {

    
    await model.FiscalYear.findOne({ where: { status: true } }).then(
      async (activeFiscalYearData) => {
        if (activeFiscalYearData) {

    let customers = await model.Customer.findByPk(customerId, {
      include: [
        {
          model: model.OrderTransaction,
          as: "transactionOrder",
          include : [
            {
              model: model.Customer,
              as: "customer",
              include: [
                {
                  model: model.Order,
                  as: 'orders',
                },
               
            ]
            },
            {
                model: model.FiscalYear,
                as: "fiscalYearTransaction",
              },
              {
                model: model.User,
                as: "RegisterUser",
              },
        ],
          where:{
            fiscalYearId:activeFiscalYearData.id,
            transactionDate: {
                [Op.between]: [transactionStartDate, transactionEndDate],
              },
              [Op.or]: [
                {
                    paymentMethod: {
                    
                    [Op.like]: "%" + filterTransaction + "%",
                  },
                },
                {
                    orderTransactionNo: {
                    [Op.like]: "%" + filterTransaction + "%",
                  },
                },
                {
                    paymentStatus: {
                    [Op.like]: "%" + filterTransaction + "%",
                  },
                },
              ], 
          }
        
        },
      ],
    });
    res.status(200).json({
      data: customers,
    });
}
  else {
    res.status(400).json({ message: "Please active fiscal year!!" });
  }
})

  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
exports.updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customerData = {
    customerName: req.body.customerName,
    customerAddress: req.body.customerAddress,
    customerPhoneNumber: req.body.customerPhoneNumber,
  };
  try {
    let newCustomer = await model.Customer.update(customerData, {
      where: { id: customerId },
    });
    res.status(201).json({
      message: "customer updated sucessfully",
      data: newCustomer,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
exports.deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    await model.Customer.destroy({ where: { id: customerId } });
    res.status(200).json({
      message: "customer deleted sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
exports.FilterCustomer = async (req, res) => {
  try {
    let customers = await model.Customer.findAndCountAll({
      where: {
        customerName: {
          [Op.like]: "%" + req.query.customer + "%",
        },
      },
    });
    return res.status(200).json({
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
