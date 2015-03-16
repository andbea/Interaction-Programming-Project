var ModalView = function (container, model) {
	
	this.createActivity_button = container.find("#createActivity");

	model.addObserver(this);

	this.update = function(){
	}
}