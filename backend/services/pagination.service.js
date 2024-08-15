const model = require("../models");
const PaginationData = require("../utils/pagination");
const { Op } = require("sequelize");
exports.GlobalPagination = async (req, res) => {
  try {
    const { page = 0, size = 10 } = req.query;
    const { limit, offset } = PaginationData.getPagination(page, size);
    const { filter = "" } = req.query;

    let modelNamedata = req.query.modelName;
    if (modelNamedata.toUpperCase() == "CATEGORY") {
      var datas = await model.category.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              categoryName: {
                [Op.like]: "%" + filter + "%",
              },
            },
          ],
        },
      });
    } else if (modelNamedata.toUpperCase() == "CUSTOMER") {
      var datas = await model.Customer.findAndCountAll({
        include: [
          {
            model: model.Order,
            as: "orders",
          },
        ],
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              customerPhoneNumber: {
                [Op.like]: "%" + filter + "%",
              },
            },
            {
              customerName: {
                [Op.like]: "%" + filter + "%",
              },
            },
            {
              customerAddress: {
                [Op.like]: "%" + filter + "%",
              },
            },
          ],
        },
      });
    } else if (modelNamedata.toUpperCase() == "FISCALYEAR") {
      var datas = await model.FiscalYear.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              year: {
                [Op.like]: "%" + filter + "%",
              },
            },
          ],
        },
      });
    } else if (modelNamedata.toUpperCase() == "ITEM") {
      var datas = await model.Item.findAndCountAll({
        include: [
          {
            model: model.category,
            as: "categories",
          },
        ],
        limit,
        offset,
        where: {
          name: {
            [Op.like]: "%" + filter + "%",
          },
        },
      });
    } else if (modelNamedata.toUpperCase() == "USER") {
      var datas = await model.User.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              fullName: {
                [Op.like]: "%" + filter + "%",
              },
            },
            {
              address: {
                [Op.like]: "%" + filter + "%",
              },
            },
            {
              mobileNumber: {
                [Op.like]: "%" + filter + "%",
              },
            },
          ],
        },
      });
    } else if (modelNamedata.toUpperCase() == "TRANSACTION") {
      var activeFiscalYearData = await model.FiscalYear.findOne({
        where: { status: true },
      });
      if (activeFiscalYearData) {
        let currentDate = new Date().toISOString().split("T")[0];

        let startDate = req.query.startDate
          ? req.query.startDate
          : "0000-01-01";
        let endDate = req.query.endDate ? req.query.endDate : currentDate;

        var isCustomerTrue = await isCustomer(filter);

        if (isCustomerTrue) {

          var datas = await model.OrderTransaction.findAndCountAll({
            include: [
              {
                model: model.Customer,
                as: "customer",
                where: {
                  [Op.or]: [
                    isCustomerTrue && {
                      customerPhoneNumber: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                    isCustomerTrue && {
                      customerName: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                    isCustomerTrue && {
                      customerAddress: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                  ],
                },
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
            limit,
            offset,
            where: {
              fiscalYearId: activeFiscalYearData.id,
              transactionDate: {
                [Op.between]: [startDate, endDate],
              },
            },
          });
        } else {
          var datas = await model.OrderTransaction.findAndCountAll({
            include: [
              {
                model: model.Customer,
                as: "customer",
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
            limit,
            offset,
            where: {
              fiscalYearId: activeFiscalYearData.id,
              transactionDate: {
                [Op.between]: [startDate, endDate],
              },
              orderTransactionNo: {
                [Op.like]: "%" + filter + "%",
              },
            },
          });
        }
      } else {
        return res.status(500).json({
          message: "fiscal year not found",
        });
      }
    } else {
      
      let currentDate = new Date().toISOString().split("T")[0];
      let startDate = req.query.startDate ? req.query.startDate : "0000-01-01";
      let endDate = req.query.endDate ? req.query.endDate : currentDate;

      var activeFiscalYearData = await model.FiscalYear.findOne({
        where: { status: true },
      });
      if (activeFiscalYearData) {

        const  isCustomers = await isCustomer(filter);
      
        if (isCustomers) {
          var orderData = await model.Order.findAndCountAll({
            include: [
              {
                model: model.Customer,
                as: "customer",
                where: {
                  [Op.or]: [
                    {
                      customerPhoneNumber: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                    {
                      customerName: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                    {
                      customerAddress: {
                        [Op.like]: "%" + filter + "%",
                      },
                    },
                  ],
                },
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
            limit,
            offset,
            where: {
              fiscalYearId: activeFiscalYearData.id,
              orderDate: {
                [Op.between]: [startDate, endDate],
              },
            },
          });
        } else {
        
          var orderData = await model.Order.findAndCountAll({
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
            limit,
            offset,
            where: {
              orderDate: {
                [Op.between]: [startDate, endDate],
              },
              fiscalYearId: activeFiscalYearData.id,
              orderInvoiceNo: {
                [Op.like]: "%" + filter + "%",
              },
            },
          });
        }

        return res.status(200).json({
          data: PaginationData.getPagingData(orderData, page, limit),
        });
      }
    }
    return res.status(200).json({
      data: PaginationData.getPagingData(datas, page, limit),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

async function isCustomer(filter) {
  let customers = await model.Customer.findAll({
    where: {
      [Op.or]: [
        {
          customerPhoneNumber: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          customerName: {
            [Op.like]: "%" + filter + "%",
          },
        },
        {
          customerAddress: {
            [Op.like]: "%" + filter + "%",
          },
        },
      ],
    },
  });
  if (customers.length == 0) {
    return false;
  } else {
    return true;
  }
}
