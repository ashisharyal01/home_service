'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderedItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Items', // name of Target table name
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
      itemPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      itemRemarks: {
        allowNull: true,
        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('OrderedItems');
  }
};