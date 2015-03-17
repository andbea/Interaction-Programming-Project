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

//	var dayView = new DayView($("#dayView"), model);
//	var dayViewController = new DayViewController(dayView, model);

	var dragDropView = new DragDropView($("#dragDropView"), model);
	var dragDropViewController = new DragDropViewController(dragDropView, model);
	
	createTestData(model); 
});

