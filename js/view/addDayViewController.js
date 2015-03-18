var AddDayViewController = function(view, model) {
	/* This controller checks to see if the add day button is clicked
	and if so adds a day through the model. It also creates a viewer and controller for that day.*/
 	view.addDay_button.click(function(){
 		model.addDay();
		
		var container = $("#dayView").last();
		var id = $("#dayView").length - 1;
		var dayView = new DayView(container, model, id);
		var dayViewController = new DayViewController(dayView, model);
 	});
}