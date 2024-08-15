'use strict';
const models = require("../models/")
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',[
      {
        fullName:"superadmin@gmail.com",
        mobileNumber:"9867121099",
        gender:"Male",
        password:bcrypt.hashSync("Superadmin@123",8),
        email:"superadmin@gmail.com",
        dateOfBirth:"2020/12/01",
        address:"Butwal",
        createdAt:new Date(),
        updatedAt:new Date()
 
      }
    ],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Users", null, {});

  }
};
