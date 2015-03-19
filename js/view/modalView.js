var ModalView = function (container, model) {
	
	/* The modal is the popup window which lets you edit or add activities*/
	this.createActivity_button = container.find("#createActivity");
	this.editActivity_button = container.find("#editActivity");
	this.editActivity_day = container.find("#activityDay");
	this.editActivity_id = container.find("#activityId");

	model.addObserver(this);

	this.update = function(){
	}
}