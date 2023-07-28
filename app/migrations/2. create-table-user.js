/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10],
            msg: 'Password must be more than 10 characters',
          },
        },
      },
      imageProfile: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['ADMIN_UTAMA', 'ADMIN_DAERAH', 'USER'],
        defaultValue: 'USER',
      },
      regionId: {
        type: Sequelize.STRING,
        references: {
          model: 'Regions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      age: {
        type: Sequelize.INTEGER,
      },
      isMarried: {
        type: Sequelize.BOOLEAN,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['MALE', 'FEMALE'],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
