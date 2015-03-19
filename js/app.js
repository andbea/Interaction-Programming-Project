$(function() {
	
	// this is the instance of our main model
	// this is what you should use in your application
	var model = new Model();
	
	var activityView = new ActivityView($("#activityView"), model);
	var activityViewController = new ActivityViewController(activityView, model);

	var modalView = new ModalView($("#modalView"), model);
	var modalViewController = new ModalViewController(modalView, model);

	var addDayView = new AddDayView($("#addDayView"), model);
	var addDayViewController = new AddDayViewController(addDayView, model);
	
});

