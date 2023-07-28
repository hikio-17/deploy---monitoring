const { nanoid } = require('nanoid');
const { Region } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');
const InvariantError = require('../exeptions/InvariantError');

const createRegion = async ({ name }) => {
  const id = `region-${nanoid()}`;
  const region = await Region.create({ id, name: name.toLowerCase() });

  return region;
};

const existingRegionName = async (name) => {
  const region = await Region.findOne({ where: { name: name.toLowerCase() } });

  if (region) {
    throw new InvariantError(`Region dengan nama '${name}' sudah ada.`);
  }

  return true;
};

const availabilityRegion = async (regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  if (!region) {
    throw new NotFoundError(`Region dengan id '${regionId}' tidak ditemukan`);
  }

  return true;
};

const findAllRegions = async () => {
  const regions = await Region.findAll();

  return regions;
};

const findRegionById = async (regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  return region;
};

const deleteRegionById = async (regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  await region.destroy();
};

const updateRegionById = async ({ name }, regionId) => {
  await Region.update({ name }, { where: { id: regionId } });
};

module.exports = {
  createRegion,
  findAllRegions,
  findRegionById,
  deleteRegionById,
  updateRegionById,
  availabilityRegion,
  existingRegionName,
};
