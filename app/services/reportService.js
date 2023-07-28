const { nanoid } = require('nanoid');
const { Report } = require('../models');

const createReport = async ({ date, waterOut, deviceId }) => {
  const id = `report-${nanoid()}`;

  const report = {
    id, date, waterOut, deviceId,
  };

  const newReport = await Report.create(report);

  return newReport;
};

const findAllReport = async () => {
  const reports = await Report.findAll();

  return reports;
};

// const findReportByRegion = async (regionId) => {

// }

module.exports = {
  createReport,
  findAllReport,
  // findReportByRegion,
};
