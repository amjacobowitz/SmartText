var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var klassSchema = Schema({
	// **REMOVED, NOT NECESSARY** teacher_id: Number,
	grade: Number,
	password: String
	// students: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Student'
	// }]

})
model.exports = mongoose.model('Klass', klassSchema);