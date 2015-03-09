//DayView Object constructor
var DayView = function (container, model) {
	
	//this.numberOfGuests = container.find("#numberOfGuests");

	model.addObserver(this);

	this.update = function(){
	}
}