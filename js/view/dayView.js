var DayView = function (container, model, id) {

	/* This is the viewer for the individual days. Each day gets a id
	in order to keep track of its activity lists. When update is called
	the day viewer sends its container and id to the updateActivies function*/
	this.day = id;
	this.startTime = container.find("#startTime");
	this.activitiesContainer = container.find("#activitiesContainer");

	model.addObserver(this);

	this.update = function(){
		model.updateActivities(container, this.day);
	}
}