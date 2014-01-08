Package.describe({
    summary: "Models"
});

Package.on_use(function (api, where) {
	api.use([
		"deps",
		"session"
	], "client");

	api.add_files("chat-model/chat-model.js", ["client", "server"]);

	api.export([
		"chat_records"
	], ["client", "server"]);
});