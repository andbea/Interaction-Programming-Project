var DragDropViewController = function(view, model) {

	/* Here the controller will control the actions made during the drag and drop process.
	The action would have to be initiated from either the activity holder window or the individual day
	windows.*/

	//makes it posible to drg events in container
	view.holder.on("drag", function (ev) {
		ev.preventDefault();
    	ev.stopPropagation();
		view.position = ev.target.id;
		var list;
		if(view.day == -1)
			list = model.parkedActivities;
		else
 		 	list = model.getActivities(view.day);
		var activity = list[view.position];

		model.dragActivity["listId"] = view.day;
		model.dragActivity["position"] = view.position;
		model.dragActivity["activity"] = activity;

	});

	view.holder.on("dragend", function (ev) {
		ev.preventDefault();
    	ev.stopPropagation();
		console.log("added");
		if(view.day == -1) {
			model.removeParkedActivity(view.position);
		}
		else 
			model.days[view.day]._removeActivity(view.position);
		var day;
		if(model.currentDragOver["day"] == -1)
			day = null;
		else
			day = model.currentDragOver["day"];
		model.addActivity(model.dragActivity["activity"], day, model.currentDragOver["id"]);
		console.log("added");

		model.notifyObservers();
	});
}