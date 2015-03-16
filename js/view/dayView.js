//DayView Object constructor
var DayView = function (container, model, id) {

	this.day = id;
	this.startTime = container.find("#startTime");
	this.activity = container.find("#activitiesContainer");

	model.addObserver(this);

	this.update = function(){
		model.updateActivities(container, this.day, "active");
	}
}