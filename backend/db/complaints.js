const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  selectedLab: String,
  complaintText: String,
  supervisorView: String,
  LabNumber: String,
  DepartmentName: String,
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed', 'Rejected'],
    default: 'Pending',
  },
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
