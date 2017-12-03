const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
	text: String,
	author: Object,
	media: {type: String, default: "text"},
	created_at: Date,
	updated_at: Date
});

postSchema.pre('save', function (next) {
	let currentDate = new Date();

	this.updated_at = currentDate;

	if (!this.created_at) {
		this.created_at = currentDate;
	}

	next();
})

module.exports = mongoose.model('Post', postSchema);