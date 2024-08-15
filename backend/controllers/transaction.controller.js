const model = require("../models");
//save transaction
// Compare this snippet from services\transaction.service.js:


async function saveTransaction(req, res) {
    let InvoiceNumber = generateRandomNumber();
    let userId = req.userData.userId;

    try {
        const FiscalYearData = await model.FiscalYear.findOne({
            where: { status: true },
          });
      
          if (FiscalYearData.length == 0) {
            res.status(404).json({ message: "Fiscal year not found" });
          }
          const fiscalYearDataId = FiscalYearData.id;
          const transactionData = {
            customerId: req.body.customerId,
            paidAmount: req.body.paidAmount,
            paymentMethod: req.body.paymentMethod,
            transactionRemarks: req.body.transactionRemarks,
            transactionDate: req.body.transactionDate,
            orderTransactionNo:InvoiceNumber,
            paymentStatus:req.body.paymentStatus,
            fiscalYearId:fiscalYearDataId,
            registerBy:userId
        }

        const customer = await model.Customer.findByPk(req.body.customerId);
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            })
        }
        else{

            if(parseFloat(req.body.paidAmount) > parseFloat(customer.payableAmount)){
                return res.status(400).json({
                    message: "Paid amount is greater than payable amount"
                })
            }
            else{
                const payableAmt = parseFloat(customer.payableAmount) - parseFloat(req.body.paidAmount);
                const updateCustomer = await model.Customer.update({
                    payableAmount: payableAmt
                },{where: {id: req.body.customerId}});

                if(updateCustomer){
                    const transaction = await model.OrderTransaction.create(transactionData);
                    return res.status(201).json({
                        message: "Transaction saved successfully",
                        transaction: transaction
                    })
                
                }
                else{
                    return res.status(400).json({
                        message: "Error in updating customer"
                    })
                }
               
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

async function getTransaction(req,res){

    try{

       await model.FiscalYear.findOne({ where: { status: true } }).then(
            async(activeFiscalYearData) => {
              if (activeFiscalYearData) {
                let Transaction = await model.OrderTransaction.findAll(
                    {
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
                        ]
                    }
                ).then((result) => {
                  if (result) {
                    return res.status(200).json(result);
                  }
                });
              } else {
                res.status(400).json({ message: "Please active fiscal year!!" });
              }
            }
          );

    }catch(err){
        return res.status(500).json({
            error:err.message,
            message:"Internal server error"
        })
    }
}
async function getTransactionById(req,res){

    let transactionId = req.params.id;

    try{

        await model.FiscalYear.findOne({ where: { status: true } }).then(
            async(activeFiscalYearData) => {
              if (activeFiscalYearData) {
                let Transaction = await model.OrderTransaction.findByPk(transactionId,
                    {
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
                        ]
                    }
                ).then((result) => {
                  if (result) {
                    return res.status(200).json(result);
                  }
                });
              } else {
                res.status(400).json({ message: "Please active fiscal year!!" });
              }
            }
          );

    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

function generateRandomNumber () {
    return  "INV-" + Math.floor(Date.now() / 1000)
  }
module.exports = {
    saveTransaction: saveTransaction,
    getTransaction:getTransaction,
    getTransactionById:getTransactionById
  };