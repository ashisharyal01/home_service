'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paidAmount:{
        type: Sequelize.FLOAT,
        allowNull:false,
        default:10,
      },
      paymentMethod: {
        type:  Sequelize.ENUM('esewa', 'khalti', 'mobile banking', 'cash','cheque'),
        allowNull: true,
      },
      paymentStatus: {
        type:  Sequelize.ENUM('noPayment', 'partialPayment', 'fullPayment'),
        allowNull: true,
      },
      fiscalYearId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'FiscalYears', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: "CASCADE",
      },
      registerBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      transactionRemarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      transactionDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      orderTransactionNo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      customerId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderTransactions');
  }
};