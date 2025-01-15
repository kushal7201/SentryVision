const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://devins:RDR8vzi4S8fLTAuH@sentryvision.dwlst.mongodb.net/sentryvision', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const accessibilitySchema = new mongoose.Schema({
//   endpoint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Endpoint' },
//   roles: String
// }, {
//   collection: 'accessibility'
// });

// const endpointSchema = new mongoose.Schema({
//   endpoint: String,
//   method: String
// }, {
//   collection: 'endpoints'
// });

// const roleSchema = new mongoose.Schema({
//   title: String
// }, {
//   collection: 'roles'
// });

// const userSchema = new mongoose.Schema({
//   firstname: { type: String, required: true },
//   lastname: String,
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   avatar: String,
//   role_id: { type: Number, default: 33 },
//   videos: String
// }, {
//   collection: 'users'
// });

// Create models
const Accessibility = mongoose.model('Accessibility', accessibilitySchema);
const Endpoint = mongoose.model('Endpoint', endpointSchema);
const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Accessibility,
  Endpoint,
  Role,
  User
};
