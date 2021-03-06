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

 		if (name == "") {
 		 		alert("You must enter a activity name");	
 		}
 		else if (length == null || length == "") {
 			alert("You must enter a number for the length of the activity");
 		}
		else if (typeId == null) {
 			alert("You must enter a activity type");
 		}
 		else {
 			length = parseInt(length);
	 		$("#modalView").modal('hide');

	 		$("#modalAddView").find("#activityName").val("");
	 		$("#modalAddView").find("#activityDuration").val("");
	 		$("#modalAddView").find('#activityType').val(-1);
	 		$("#modalAddView").find("#activityDescription").val("");
	 		
	 		console.log("name: " + name);


	 		var activity = new Activity(name, length, typeId, description);
	 		var id = model.addActivity(activity, null, null);
	 	}
 	});

 	/* ----Unfinished---
 	This function is used to edit the information of an activity. Currently it only 
 	get´s the information. But in order for it to work it needs to get the correct activity
 	from the day list and then edit its information or remove and recreate an activity in its place.*/
 	view.editActivity_button.click(function(e) {
 		e.preventDefault();
 		var name = $("#modalEditView").find("#activityName").val();
 		var length = $("#modalEditView").find("#activityDuration").val();
 		var typeId = $("#modalEditView").find('#activityType').val();
 		var description = $("#modalEditView").find("#activityDescription").val();

 		if (name == "") {
 		 		alert("You must enter a activity name");	
 		}
 		else if (length == null || length == "") {
 			alert("You must enter a number for the length of the activity");
 		}
 		else {
 			length = parseInt(length);
	 		if(model.editActivity["day"] == -1) {
	 			activity = model.parkedActivities[view.editActivity["id"]];
	 		}
	 		else {
	 			var list = model.getActivities(model.editActivity["day"]);
	 			var id = model.editActivity["id"];
	 			activity = list[id];
	 		}

	 		activity.setName(name);
	 		activity.setLength(length);
	 		activity.setTypeId(typeId);
	 		activity.setDescription(description);

			model.notifyObservers();

	 		$("#modalView").modal('hide');

	 		$("#modalEditView").find("#activityName").val("");
	 		$("#modalEditView").find("#activityDuration").val("");
	 		$("#modalEditView").find('#activityType').val(-1);
	 		$("#modalEditView").find("#activityDescription").val("");
 		}
 	});
}
