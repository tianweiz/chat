Router.map(function () {
    this.route("chat", {
        template: "chat",
        path: "/chat",
        waitOn: function () {
        	console.log("----- WAITING...");
        },
        // data: function () {
        // 	console.log("----- DATA");
        // },
        before: function () {
        	// console.log('before');
	    }
    });
});