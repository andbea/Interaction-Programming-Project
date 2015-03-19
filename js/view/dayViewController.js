var DayViewController = function(view, model) {

	/* This function checks to see if the starting time is changed
	and if so, it notifies the observers so that the activities list can be updated*/
	view.startTime.change(function(){
		var time = view.startTime.val().split(':');
		model.days[view.day].setStart(parseInt(time[0]), parseInt(time[1]));
		model.notifyObservers();
	});

	//makes it posible to drop events
	view.activitiesContainer.on("drop", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
	});

	/* When draging an element over an other element
	The event is marked showing a posibility of interact with it. 
	Uses the variable from model "currentDragOver" do identify the element you are hoverng over with an other element.*/
	view.activitiesContainer.on("dragover", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "2px solid rgba(101,153,255,0.6)"});
		model.currentDragOver["day"] = view.day;
		var id;		
		if(ev.target.id == "activitiesContainer")
			id = null;
		else {
			id = ev.target.id;
			view.activitiesContainer.find("#" + id).first().css({"border-top": "4px solid rgba(101,153,255,1)"});
		}
		model.currentDragOver["id"] = id;
	});

	/* When you leave an area to hover 
	The color goes back to nomal and you set valus to the variable currentDragOver. */
	view.activitiesContainer.on("dragleave", function (ev){
		ev.preventDefault();
    	ev.stopPropagation();
		view.activitiesContainer.css({"border": "1px solid rgba(211,211,211,1)"});
		view.activitiesContainer.find("#" + model.currentDragOver["id"]).first().css({"border": "none"});
		model.currentDragOver["day"] = -1;
		model.currentDragOver["id"] = null;
	});


}
