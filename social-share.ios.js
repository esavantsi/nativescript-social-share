var frameModule = require("ui/frame");
var utilsModule = require("utils/utils");

function share(thingsToShare, index) {
	return new Promise(function (resolve, reject) {
		var activityController = UIActivityViewController.alloc()
			.initWithActivityItemsApplicationActivities(thingsToShare, null);
		var presentViewController = activityController.popoverPresentationController;
		if (presentViewController) {
			var page = frameModule.topmost().currentPage;
			if (page && page.ios.navigationItem.rightBarButtonItems &&
				page.ios.navigationItem.rightBarButtonItems.count > 0) {
				presentViewController.barButtonItem = page.ios.navigationItem.rightBarButtonItems[0];
			} else {
				presentViewController.sourceView = page.ios.view;
			}
		}
		activityController.completionWithItemsHandler = function (activityType, completed, returnedItems, error) {
			resolve();
    	};

		utilsModule.ios.getter(UIApplication, UIApplication.sharedApplication)
			.keyWindow
			.rootViewController
			.presentViewControllerAnimatedCompletion(activityController, true, null);
	});
}

module.exports = {
	shareImage: function(image) {
		return share([image]);
	},
	shareText: function(text) {
		return share([text]);
	},
	shareUrl: function(url, text) {
		return share([NSURL.URLWithString(url), text]);
	}
};
