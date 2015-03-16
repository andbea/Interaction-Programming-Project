var AddDayViewController = function(view, model) {
 	view.addDay_button.click(function(){
 		model.addDay();
		
		var container = $("#dayView").last();
		var id = $("#dayView").length - 1;
		var dayView = new DayView(container, model, id);
		var dayViewController = new DayViewController(dayView, model);
 	});
}