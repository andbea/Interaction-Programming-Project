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
		view.holder.css({"display":"none"});
	});

/* When letting go of an event when dragging it.
The function removs the event from teh previos list and adds it in teh new list.
If the event is draged and droped within teh same container/day it checks if the element it hovers over has a lower 
or a higher id. If higher the event has to move down in the list and therefore the index has to decrease with one, 
due to that itself is removed before inserted again.  */
	view.holder.on("dragend", function (ev) {
		ev.preventDefault();
    	ev.stopPropagation();
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

		var newPosition = model.currentDragOver["id"];
		if(view.position < newPosition)
			newPosition--;
		model.addActivity(model.dragActivity["activity"], day, newPosition);

		model.notifyObservers();
	});
}