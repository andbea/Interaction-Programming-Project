var AddDayView = function (container, model, id) {
	
	this.addDay_button = container.find("#addDay");

	model.addObserver(this);

	this.update = function(){
		
	}
}