import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  task: String,
  clientApproval: Boolean,
  completionDate: Date,
  resultDescription: String,
  entryDate: { type: Date, default: Date.now }
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);
