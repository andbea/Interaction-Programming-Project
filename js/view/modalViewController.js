var ModalViewController = function(view, model) {
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
 		model.addActivity(activity, null, null);
 	});

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

 		var activity = new Activity(name, length, typeId, description);
 		model.addActivity(activity, null, null);
 	});
}