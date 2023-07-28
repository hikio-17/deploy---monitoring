/* eslint-disable no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        fullname: 'Fulan',
        email: 'fulan@gmail.com',
        password: 'fulan_secret',
        regionId: 'region-1',
      },
      {
        id: 2,
        fullname: 'Budi',
        email: 'budi@gmail.com',
        password: 'budi_secret',
        regionId: 'region-1',
      },
      {
        id: 3,
        fullname: 'Bambang',
        email: 'bambang@gmail.com',
        password: 'bambang_secret',
        regionId: 'region-2',
      },
      {
        id: 4,
        fullname: 'Mawar',
        email: 'mawar@gmail.com',
        password: 'mawar_secret',
        regionId: 'region-2',
      },
      {
        id: 5,
        fullname: 'John Doe',
        email: 'john@gmail.com',
        password: 'john_secret',
        regionId: 'region-2',
      },
      {
        id: 6,
        fullname: 'Daniel',
        email: 'daniel@gmail.com',
        password: 'daniel',
        regionId: 'region-3',
      },
      {
        id: 7,
        fullname: 'Alexa',
        email: 'alexa@gmail.com',
        password: 'alexa',
        regionId: 'region-3',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
