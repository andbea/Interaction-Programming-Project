var ModalView = function (container, model) {
	
	this.createActivity_button = container.find("#createActivity");
	this.editActivity_button = container.find("#editActivity");

	model.addObserver(this);

	this.update = function(){
	}
}