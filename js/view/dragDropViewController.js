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

	/* This function checks to see whether a activity has been clicked.
	If so it presents the modal (popup window) in editing view and populates it with
	the activities details for editing.*/ 
	view.holder.click(function(e) {
 		$("#modalAddView").css("display", "none");
 		$("#modalEditView").css("display", "inherit");

 		var id = e.target.id;
 		var list, day;
 		if(view.day != -1) {
 			list = model.getActivities(view.day);
 			day = view.day;
 		}
 		else {
 			list = model.parkedActivities;
 			day = -1;
 		}
		var activity = list[id];

		model.editActivity["day"] = day;
		model.editActivity["id"] = id;
		$("#modalEditView").find("#activityName").val(activity.getName());
 		$("#modalEditView").find("#activityDuration").val(activity.getLength());
 		$("#modalEditView").find('#activityType').val(activity.getTypeId());
 		$("#modalEditView").find("#activityDescription").val(activity.getDescription());

 		$("#modalView").modal('show');
	});
}