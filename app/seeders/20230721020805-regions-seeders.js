/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Regions', [
      {
        id: 'region-1',
        name: 'Cihampelas',
      },
      {
        id: 'region-2',
        name: 'Cihampelas',
      },
      {
        id: 'region-3',
        name: 'Cihampelas',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Regions', null, {});
  },
};
