var DayViewController = function(view, model) {

	/* This function checks to see if the starting time is changed
	and if so, it notifies the observers so that the activities list can be updated*/
	view.startTime.change(function(){
		var time = view.startTime.val().split(':');
		model.days[view.day].setStart(parseInt(time[0]), parseInt(time[1]));
		model.notifyObservers();
	});

	/* This function checks to see whether a activity has been clicked.
	If so it presents the modal (popup window) in editing view and populates it with
	the activities details for editing.*/ 
	view.activity.click(function(e) {
 		$("#modalAddView").css("display", "none");
 		$("#modalEditView").css("display", "inherit");

 		var id = e.target.id;
 		var list = model.getActivities(view.day);
		var activity = list[id];

		$("#modalEditView").find("#activityName").val(activity.getName());
 		$("#modalEditView").find("#activityDuration").val(activity.getLength());
 		$("#modalEditView").find('#activityType').val(activity.getTypeId());
 		$("#modalEditView").find("#activityDescription").val(activity.getDescription());

 		$("#modalView").modal('show');
	});
}