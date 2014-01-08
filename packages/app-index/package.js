Package.describe({
    summary: "Index"
});

Package.on_use(function (api, where) {
    api.use([
        "templating",
        "app-routing"
    ], "client");

    api.add_files([
        "index.html",
        "index.js",
        "routing.js"
    ], "client");
});