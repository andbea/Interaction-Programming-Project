var DragDropView = function (container, model, id) {

	/* Here the drag and drop view will be added if one is required.*/
	this.day = id;
	this.position = -1;
	this.holder = container;
	model.addObserver(this);

	this.update = function(){
	}
}