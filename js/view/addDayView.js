var AddDayView = function (container, model, id) {

	/* This view only gets the button container for the controller.*/
	
	this.addDay_button = container.find("#addDay");

	model.addObserver(this);

	this.update = function(){
		
	}
}