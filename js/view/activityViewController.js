var ActivityViewController = function(view, model) {

	// This controller only opens upp the add modal for adding activities.
	view.addActivity.click(function(){
 		$("#modalAddView").css("display", "inherit");
 		$("#modalEditView").css("display", "none");
 		$("#modalView").modal('show');
	});

	view.activitiesContainer.on("dragover", function (ev){
		ev.preventDefault();
		view.activitiesContainer.css({"border": "2px solid rgba(101,153,255,0.6)"});
	});

	view.activitiesContainer.on("dragleave", function (ev){
		ev.preventDefault();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
	});
	
	//makes it posible to drop events
	view.activitiesContainer.on("drop", function (ev){
		ev.preventDefault();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
	});

}
