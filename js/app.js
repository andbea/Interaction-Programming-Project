$(function() {
	
	// this is the instance of our main model
	// this is what you should use in your application
	var model = new Model();
	
	var activityView = new ActivityView($("#activityView"), model);
	var activityViewController = new ActivityViewController(activityView, model);

	var dayView = new DayView($("#dayView"), model);
	var dayViewController = new DayViewController(dayView, model);

	var dragDropView = new DragDropView($("#dragDropView"), model);
	var dragDropViewController = new DragDropViewController(dragDropView, model);
});

