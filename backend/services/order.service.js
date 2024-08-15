const model = require("../models");
const { sequelize } = require("../models");

exports.saveOrder = async (req, res) => {
  let t;
  let userId = req.userData.userId;
  let orderItemsIdArray = req.body.orderItemsArray;
  let vatAmount = parseFloat(req.body.vatAmount).toFixed(2);
  let discountAmount = parseFloat(req.body.discountAmount).toFixed(2);
  try {
    const FiscalYearData = await model.FiscalYear.findOne({
      where: { status: true },
    });
    const fiscalYearDataId = FiscalYearData.id;

    if (!fiscalYearDataId) {
      res.status(404).json({error:"Fiscal year not found", message: "Fiscal year not found" });
    }

    await sequelize.transaction(async (t) => {
      const TotalOrderAmount = calculateTotalOrderAmount(orderItemsIdArray);
      let InvoiceNumber = generateRandomNumber();
      const GrandTotal = calculateGrandTotal(
        TotalOrderAmount,
        vatAmount ? vatAmount : 0,
        discountAmount ? discountAmount : 0
      );
      const orderData = {
        customerId: req.body.customerId,
        fiscalYearId: fiscalYearDataId,
        orderLocation: req.body.orderLocation,
        workStatus: req.body.workStatus,
        totalOrderAmount: TotalOrderAmount,
        vatAmount: vatAmount,
        discountAmount: discountAmount,
        grandTotal: GrandTotal,
        remarks: req.body.remarks,
        orderDate: req.body.orderDate,
        orderInvoiceNo: InvoiceNumber,
        registerBy: userId,
      };
      const saveOrder = await model.Order.create(orderData, { transaction: t });

      const customer = await model.Customer.findByPk(req.body.customerId);

      if (customer) {
        if (
          req.body.paymentStatus == "partialPayment" ||
          req.body.paymentStatus == "fullPayment"
        ) {
          let NewInvoiceNumber = generateRandomNumberTransaction();
          const transactionData = {
            customerId: req.body.customerId,
            paidAmount: req.body.paidAmount,
            paymentMethod: req.body.paymentMethod,
            transactionRemarks: req.body.transactionRemarks,
            transactionDate: req.body.transactionDate,
            orderTransactionNo: NewInvoiceNumber,
            paymentStatus: req.body.paymentStatus,
            registerBy: userId,
            fiscalYearId: fiscalYearDataId,
          };
          let AmountToPay =
            parseFloat(customer.payableAmount) + parseFloat(GrandTotal);
          if (parseFloat(req.body.paidAmount) > parseFloat(AmountToPay)) {
            return res.status(400).json({
              error: {
                message: 'Paid amount is greater than payable amount'
              }
            });
          }
          const payableAmt = AmountToPay - parseFloat(req.body.paidAmount);
          customer.update(
            {
              payableAmount: payableAmt,
            },
            { transaction: t }
          );
          const transaction = await model.OrderTransaction.create(
            transactionData,
            { transaction: t }
          );
        } else {
          customer.update(
            {
              payableAmount:
                parseFloat(customer.payableAmount) + parseFloat(GrandTotal),
            },
            { transaction: t }
          );
        }
      }
      let orderIds = saveOrder.id;
      await Promise.all(
        orderItemsIdArray.map(async (item) => {
          const order = await model.Item.findByPk(item.itemId);
          if (!order) {
            return res.status(400).json({
              message: "order item doesnot exist",
            });
          }
          let orderDatas = {
            orderId: orderIds,
            itemId: item.itemId,
            quantity: item.quantity,
            itemPrice: item.itemPrice,
            itemRemarks: item.itemRemarks,
          };
          let savedOrderItem = await model.OrderedItem.create(orderDatas, {
            transaction: t,
          });
        })
      );

      return res.status(200).json({
        message: "Order created successfully!!",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};
//calculate total order amount
function calculateTotalOrderAmount(orderItemsIdArray) {
  let totalOrderAmount = 0.0;
  orderItemsIdArray.forEach((item) => {
    totalOrderAmount += parseFloat(item.itemPrice).toFixed(2) * item.quantity;
  });
  return parseFloat(totalOrderAmount).toFixed(2);
}
//calculate grand total
function calculateGrandTotal(totalOrderAmount, vatAmount, discountAmount) {
  let grandTotal =
    parseFloat(totalOrderAmount) +
    parseFloat(vatAmount) -
    parseFloat(discountAmount);
  return parseFloat(grandTotal).toFixed(2);
}
exports.getOrder = async (req, res) => {
  try {
  await  model.FiscalYear.findOne({ where: { status: true } }).then(
      async (activeFiscalYearData) => {
        if (activeFiscalYearData) {
          let orders = await model.Order.findAndCountAll({
            where: { fiscalYearId: activeFiscalYearData.id },
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
          }).then((result) => {
            if (result) {
              return res.status(200).json(result);
            }
          });
        } else {
          res.status(400).json({ message: "Please active fiscal year!!" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};
exports.showOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {

  await model.FiscalYear.findOne({ where: { status: true } }).then(
      async (activeFiscalYearData) => {
        if (activeFiscalYearData) {
          let orders = await model.Order.findByPk(orderId, {
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
          }).then((result) => {
            if (result) {
              return res.status(200).json(result);
            }
          });
        } else {
          res.status(400).json({ message: "Please active fiscal year!!" });
        }
      }
    );

  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};
exports.updateWorkStatus = async (req,res) =>{
  const order_id = req.params.id
 
  try{
    await model.Order.update({workStatus: req.body.workStatus}, {
      where: { id: order_id },
    }).then((data)=>{
      return res.status(200).json({
        data,
        message:"Order working status updated sucessfully"
      })
    })
  }catch(err){
    return res.status(500).json({
      error:err.message,
      message:"Internal Server Error"
    })
  }
}
exports.updateOrder = async (req, res) => {
  let order_id = req.params.id;
  let t;
  let orderItemsIdArray = req.body.orderItemsArray;
  let vatAmount = parseFloat(req.body.vatAmount).toFixed(2);
  let discountAmount = parseFloat(req.body.discountAmount).toFixed(2);
  const TotalOrderAmount = calculateTotalOrderAmount(orderItemsIdArray);
  const GrandTotal = calculateGrandTotal(
    TotalOrderAmount,
    vatAmount ? vatAmount : 0,
    discountAmount ? discountAmount : 0
  );

  const updatedOrderData = {
    customerId: req.body.customerId,
    fiscalYearId: req.body.fiscalYearId,
    orderLocation: req.body.orderLocation,
    workStatus: req.body.workStatus,
    totalOrderAmount: TotalOrderAmount,
    discountAmount: discountAmount,
    vatAmount: vatAmount,
    grandTotal: GrandTotal,
    orderDate: req.body.orderDate,
    remarks: req.body.remarks,
  };
  try {
    await sequelize.transaction(async (t) => {
      await model.Order.update(updatedOrderData, {
        where: { id: order_id },
        transaction: t,
      });
      await model.OrderedItem.destroy({
        where: { orderId: order_id },
        transaction: t,
      });
      await Promise.all(
        orderItemsIdArray.map(async (item) => {
          const order = await model.Item.findByPk(item.itemId);
          if (!order) {
            return res.status(400).json({
              message: "order item doesnot exist",
            });
          }
          let orderDatas = {
            orderId: order_id,
            itemId: item.itemId,
            quantity: item.quantity,
            itemPrice: parseFloat(item.itemPrice),
          };
          await model.OrderedItem.create(orderDatas, { transaction: t });
        })
      );
      res.status(201).json({
        message: "Order updated successfully!!",
      });
    });
  } catch (error) {
    return "rollback";
  }
};
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {

    await model.FiscalYear.findOne({ where: { status: true } }).then(
      async (activeFiscalYearData) => {
        if (activeFiscalYearData) {
          await model.Order.destroy({ where: { id: orderId } }).then((result) => {
            if (result) {
              return res.status(200).json({
                message: "order deleted sucessfully",
              });
            }
          });
        } else {
          res.status(400).json({ message: "Please active fiscal year!!" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};
function generateRandomNumber() {
  return "INV-" + Math.floor(Date.now() / 1000);
}
function generateRandomNumberTransaction() {
  return "INV-" + Math.floor(Date.now() / 1000 + 1);
}
