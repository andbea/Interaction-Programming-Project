var AddDayView = function (container, model) {
	
	this.addDay_button = container.find("#button_add_day");

	model.addObserver(this);

	this.update = function(){
		
	}
}