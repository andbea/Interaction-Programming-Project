var DragDropView = function (container, model, id) {

	/* Here the drag and drop view will be added if one is required.*/
	this.day = id;
	console.log("day = " + id);
	this.container = container;
	model.addObserver(this);

	this.update = function(){
	}
}