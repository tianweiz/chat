Package.describe({
    summary: "Chat"
});

Package.on_use(function (api, where) {
    api.use([
        "templating",
        "session",
        "app-routing",
        "app-models"
    ], "client");

    api.add_files([
        "routing.js",
        "chat.html",
        "chat.js"
    ], "client");
});