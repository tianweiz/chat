Meteor.subscribe("users");
Meteor.subscribe("chat_records");

Template.chat.events({
	'click #send-button': function(e) {
		var comment = $('#chat-text').val();
		if(comment.trim()) {
			console.log(comment);
			var reply_to, reply_by, reply_to_thread;

			if ($('#post-property').attr('reply_to')) {
				reply_to = $('#post-property').attr('reply_to');
				reply_to_thread = $('#post-property').attr('reply_to_thread');
				reply_by = $('#post-property').attr('reply_by');
			}

			var uid = Meteor.userId();
			console.log(uid);
			var time = new Date();

			Meteor.call('createChatRecord', {
				uid: uid,
				time: time,
				comment: comment,
				reply_to: reply_to,
				reply_to_thread: reply_to_thread,
				reply_by:reply_by
			}, function(error, result) {
				$('#chat-text').val('');
				$('#post-reply-title').html('');
				$('#chat-text').blur();
				$('#post-property').removeAttr('reply_to');
				$('#post-property').removeAttr('reply_to_thread');
				$('#post-property').removeAttr('reply_by');
			});
			
			console.log('insert done');
		}
	},
	'click .ss-reply': function(e) {
		var grandParent = $($($($(e.target).parent()).parent()).parent());
		var toWhom = grandParent.find('.username').text().trim();
		toWhom = toWhom.replace(/\s+\@.*/g, '');
		var reply_to_thread = grandParent.find('.property').attr('tid');
		var reply_to = grandParent.find('.property').attr('owner');
		var reply_by = Meteor.userId();

		$('#post-reply-title').html('@'+toWhom+': <span class="cancel-reply"><i class="ss-icon">close</i></span>' );
		$('#chat-text').focus();
		$('#post-property').attr('reply_to', reply_to);
		$('#post-property').attr('reply_to_thread', reply_to_thread);
		$('#post-property').attr('reply_by', reply_by);
	},
	'click .cancel-reply': function(e) {
		$('#post-reply-title').html('');
		$('#chat-text').blur();
		$('#post-property').removeAttr('reply_to');
		$('#post-property').removeAttr('reply_to_thread');
		$('#post-property').removeAttr('reply_by');
	},
	'click #clear-text': function(e) {
		$('#chat-text').val('');
		$('#chat-text').blur();
		$('#clear-text').css('opacity', 0);
	}
});

Template.chat.allChatEntries = function() {
	console.log(chat_records.find().fetch());
	return chat_records.find();
};

Template.chat.repliedByMe = function() {
	if (Meteor.userId()) {
		if (chat_records.findOne({
			$and: [
				{user_id: Meteor.userId()},
				{reply_to_thread: this._id}
			]
		})) {
			return "repliedByMe";
		}
	}
};

Template.chat.mentionedMe = function() {
	if (Meteor.userId()) {
		if (Meteor.userId() == this.reply_to) {
			return 'mentionedMe';
		}
	}
};

Template.chat.myPost = function() {
	if (Meteor.userId()) {
		if (Meteor.userId() == this.user_id) {
			return 'myPost';
		}
	}	
};

Template.chat.threadUserName = function () {
	var profile = Meteor.users.findOne({_id: this.user_id});
	if (profile) {
		return profile.emails[0].address;
	}
	else {
		return "Guest";
	}
};

Template.chat.isReply = function() {
	if (this.reply_to != null) {
		return true;
	} else {
		return false;
	}
};

Template.chat.replyToWho = function() {
	var profile = Meteor.users.findOne({_id: this.reply_to});
	if (profile) {
		console.log(this.reply_to)
		return profile.emails[0].address;
	}
};

Template.chat.threadContent = function () {
	return this.content;
};

Template.chat.threadPostTime = function () {
	return moment(this.post_time).format('dddd');
};

Template.chat.threadId = function() {
	return this._id;
};

Template.chat.threadOwner = function() {
	return this.user_id;
};
