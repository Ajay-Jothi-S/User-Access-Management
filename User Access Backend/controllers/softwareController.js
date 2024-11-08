const Software = require('../models/Software');

const createSoftware = async (req, res) => {
    const { name, description, accessLevels } = req.body;
    const software = new Software({ name, description, accessLevels });
    await software.save();
    res.status(201).json(software);
};
const getSoftwareList = async (req, res) => {
    try {
        const software = await Software.find();
        res.json(software);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching software list' });
    }
};
module.exports = { createSoftware, getSoftwareList };
