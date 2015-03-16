var DayViewController = function(view, model) {
	view.startTime.change(function(){
		var time = view.startTime.val().split(':');
		model.days[view.id].setStart(parseInt(time[0]), parseInt(time[1]));
		model.notifyObservers();
	});
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