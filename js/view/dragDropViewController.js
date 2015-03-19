var DragDropViewController = function(view, model) {

	/* Here the controller will control the actions made during the drag and drop process.
	The action would have to be initiated from either the activity holder window or the individual day
	windows.*/

	//makes it posible to drg events in container
	view.holder.on("drag", function (ev) {
		ev.preventDefault();
		var id = ev.target.id;
		var list;
		if(view.day == -1)
			list = model.parkedActivities;
		else
 		 	list = model.getActivities(view.day);
		var activity = list[id];

		model.dragActivity["listId"] = view.day;
		model.dragActivity["position"] = id;
		model.dragActivity["activity"] = activity;

		if(view.day == -1) {
			model.removeParkedActivity(id);
		}
		else 
			model.days[view.day]._removeActivity(id);
		model.notifyObservers();
	});

	view.holder.on("drop", function (ev) {
		ev.preventDefault();
		model.addActivity(model.dragActivity["activity"], model.currentDragOver["day"], model.currenDragOver["id"]);

	});
}