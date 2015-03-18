var ActivityView = function (container, model) {

	/*The activity updates the activites when called. The id for the activity window is -1*/

	this.activitiesContainer = container.find("#activitiesContainer");
	this.addActivity = container.find("#addActivity");
	
	model.addObserver(this);

	this.update = function(){
		model.updateActivities(container, -1);
	}
}