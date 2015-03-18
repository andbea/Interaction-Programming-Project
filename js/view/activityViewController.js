var ActivityViewController = function(view, model) {

	// This controller only opens upp the add modal for adding activities.
	view.addActivity.click(function(){
 		$("#modalAddView").css("display", "inherit");
 		$("#modalEditView").css("display", "none");
 		$("#modalView").modal('show');
	});
}