const asyncHandler = require('express-async-handler');
const { createReport } = require('../services/reportService');

const createReportHandler = asyncHandler(async (req, res) => {
  const { id: reportId } = await createReport(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      reportId,
    },
  });
});

module.exports = {
  createReportHandler,
};
