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
		model.currentDragOver["id"] = null;
		var id;		
		if(ev.target.id == "activitiesContainer")
			id = null;
		else {
			id = ev.target.id;
			view.activitiesContainer.find("#" + id).first().css({"border-top": "4px solid rgba(101,153,255,1)"});
		}
		model.currentDragOver["id"] = id;

	});

	view.activitiesContainer.on("dragleave", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
		view.activitiesContainer.find("#" + model.currentDragOver["id"]).first().css({"border": "none"});
		model.currentDragOver["day"] = -1;
		model.currentDragOver["id"] = null;
	});

	//makes it posible to drop events
	view.activitiesContainer.on("drop", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
	});

}
