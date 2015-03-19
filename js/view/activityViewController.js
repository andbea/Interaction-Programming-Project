var ActivityViewController = function(view, model) {

	// This controller only opens upp the add modal for adding activities.
	view.addActivity.click(function(){
 		$("#modalAddView").css("display", "inherit");
 		$("#modalEditView").css("display", "none");
 		$("#modalView").modal('show');
	});

	view.activitiesContainer.on("dragover", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "2px solid rgba(101,153,255,0.6)"});
		model.currentDragOver["day"] = -1;
		var position;
		if(model.parkedActivities.length == 0)
			position = 0;
		else
			position = model.parkedActivities.length - 1;
		model.currentDragOver["id"] = position;

	});

	view.activitiesContainer.on("dragleave", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
		model.currentDragOver["id"] = -1;
	});

	//makes it posible to drop events
	view.activitiesContainer.on("drop", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
	});

}
