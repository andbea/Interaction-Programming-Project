var ModalViewController = function(view, model) {
 	view.createActivity_button.click(function(e) {
 		e.preventDefault();
 		var name = $("#activityName").val();
 		var length = $("#activityDuration").val();
 		var typeId = $('#activityType').val();
 		var description = $("#activityDescription").val();

 		$("#modalView").modal('hide');


 		$("#activityName").val("");
 		$("#activityDuration").val("");
 		$('#activityType').val(-1);
 		$("#activityDescription").val("");

 		var activity = new Activity(name, length, typeId, description);
 		model.addActivity(activity, null, null);
 	});
}