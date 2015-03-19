var DragDropViewController = function(view, model) {

	/* Here the controller will control the actions made during the drag and drop process.
	The action would have to be initiated from either the activity holder window or the individual day
	windows.*/


	//makes it posible to drg events in container
	view.container.on("drag", function (ev){
		console.log("dragging");
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

		console.log("Sent in = " + id);
		if(view.day == -1) {
			model.removeParkedActivity(id);
		}
		else 
			model.days[view.day].removeActivity(id);

		model.notifyObservers();
	});

}