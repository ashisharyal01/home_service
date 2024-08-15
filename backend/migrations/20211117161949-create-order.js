'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      orderLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalOrderAmount: {
        allowNull: false,
        type: Sequelize.FLOAT
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
      discountAmount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      vatAmount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      grandTotal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      workStatus: {
        allowNull: false,
        type: Sequelize.ENUM('cancelled', 'completed', 'inProgress')
      },
      orderDate: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      remarks: {
        allowNull: false,
        type: Sequelize.STRING
      },
      orderInvoiceNo: {
        allowNull: false,
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};