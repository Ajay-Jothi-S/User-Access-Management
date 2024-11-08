const Request = require('../models/Request');

const submitRequest = async (req, res) => {
    const { softwareId, accessType, reason } = req.body;
    const request = new Request({ userId: req.user._id, softwareId, accessType, reason });
    await request.save();
    res.status(201).json(request);
};

const approveRequest = async (req, res) => {
    const request = await Request.findById(req.params.id);
    request.status = 'Approved';
    await request.save();
    res.json(request);
};

const rejectRequest = async (req, res) => {
    const request = await Request.findById(req.params.id);
    request.status = 'Rejected';
    await request.save();
    res.json(request);
};
const getPendingRequests = async (req, res) => {
    try {
        // Find requests with "Pending" status and populate user and software details
        const requests = await Request.find({ status: 'Pending' })
            .populate('userId', 'username') // Populate employee's username
            .populate('softwareId', 'name'); // Populate software's name

        // Format the response to include necessary details
        const formattedRequests = requests.map(req => ({
            _id: req._id,
            employeeName: req.userId.username,
            softwareName: req.softwareId.name,
            accessType: req.accessType,
            reason: req.reason
        }));

        res.json(formattedRequests);
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).json({ message: 'Error fetching pending requests' });
    }
};

module.exports = { submitRequest, approveRequest, rejectRequest,getPendingRequests };
