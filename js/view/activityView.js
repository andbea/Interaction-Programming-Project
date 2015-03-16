var ActivityView = function (container, model) {

	this.activitiesContainer = container.find("#activitiesContainer");
	this.addActivity = container.find("#addActivity");
	
	model.addObserver(this);

	this.update = function(){
		model.updateActivities(container, -1, "parked");
	}
}