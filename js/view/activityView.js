var ActivityView = function (container, model) {

	this.activitiesContainer = container.find("#activitiesContainer");
	this.activitiesContainer = container.find("#activitiesContainer");

	model.updateActivities(this.activitiesContainer, model.parkedActivities);

	model.addObserver(this);

	this.update = function(){
		model.updateActivities(this.activitiesContainer, model.parkedActivities);
	}
}