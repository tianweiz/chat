chat_records = new Meteor.Collection("chat_records");

chat_records.allow({
	insert: function(userId, record) {
		return false;
	}
});

if (Meteor.isServer) {
	Meteor.publish('users', function() {
		return Meteor.users.find({});
	});

	Meteor.publish('chat_records', function() {
		return chat_records.find({});
	});
}

Meteor.methods({
	createChatRecord: function(options) {
		console.log('create chat record');
		options = options || {};

		chat_records.insert({
			user_id: options.uid,
			post_time: options.time,
			content: options.comment,
			reply_to: options.reply_to,
			reply_to_thread: options.reply_to_thread,
			reply_by: options.reply_by
		});
	}
});