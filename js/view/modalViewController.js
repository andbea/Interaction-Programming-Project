var ModalViewController = function(view, model) {

	/* This fucntion controlls if the button for creating 
	activities has been clicked. If so it gets the values from the
	input and selection boxes and then creates an activity. Thereafter it
	adds the activity to the activity list.*/
 	view.createActivity_button.click(function(e) {

 		e.preventDefault();
 		var name = $("#modalAddView").find("#activityName").val();
 		var length = $("#modalAddView").find("#activityDuration").val();
 		var typeId = $("#modalAddView").find('#activityType').val();
 		var description = $("#modalAddView").find("#activityDescription").val();

 		$("#modalView").modal('hide');

 		$("#modalAddView").find("#activityName").val("");
 		$("#modalAddView").find("#activityDuration").val("");
 		$("#modalAddView").find('#activityType').val(-1);
 		$("#modalAddView").find("#activityDescription").val("");

 		var activity = new Activity(name, length, typeId, description);
 		var id = model.addActivity(activity, null, null);

 		var dragDropView = new DragDropView($("#activityView").find("#".concat(id)), model, "-1");
		var dragDropViewController = new DragDropViewController(dragDropView, model);

		console.log("Creating view for " + id);
 	});

 	/* ----Unfinished---
 	This function is used to edit the information of an activity. Currently it only 
 	get´s the information. But in order for it to work it needs to get the correct activity
 	from the day list and then edit its information or remove and recreate an activity in its place.*/
 	view.editActivity_button.click(function(e) {
 		e.preventDefault();
 		var name = $("#modalAddView").find("#activityName").val();
 		var length = $("#modalAddView").find("#activityDuration").val();
 		var typeId = $("#modalAddView").find('#activityType').val();
 		var description = $("#modalAddView").find("#activityDescription").val();

 		$("#modalView").modal('hide');

 		$("#modalAddView").find("#activityName").val("");
 		$("#modalAddView").find("#activityDuration").val("");
 		$("#modalAddView").find('#activityType').val(-1);
 		$("#modalAddView").find("#activityDescription").val("");
 	});
}
