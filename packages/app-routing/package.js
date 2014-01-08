Package.describe({
    summary: "App global routing configuration"
});

Package.on_use(function (api, where) {
    api.use([
        "iron-router",
        "templating",
        "session"
    ], "client");

    api.imply([
        "iron-router"
    ], "client");

    api.add_files([
        "loading.html",
        "notfound.html",
        "config.js"
    ], "client");
});