//DayView Object constructor
var DayView = function (container, model, id) {

	this.day = id;
	this.startTime = container.find("#startTime");
	this.activity = container.find("#activitiesContainer");

	model.addObserver(this);

		this.updateActivities = function (container, id, list_type) {
		container.find("#activitiesContainer").empty();
		var list; 
		if(id == -1){
			list = model.parkedActivities;
		}
		else {
			list = model.getActivities(id);
		}
		for(var i = 0; i < list.length; i++) {
			var activity = list[i];
			var name = activity.getName();
			var type = ActivityType[activity.getTypeId()];
			var time;
			if(list_type == "parked") {
				time = activity.getLength() + " min";
			}
			else {
				time = model.days[id].getActivityStart(i);
			}
			var html = 
				'<div class="activity '+ type + '" id="' + i + '" draggable="true" >\
					<div id="' + i + '" class="row" style="padding: 8px">\
						<div id="' + i + '" class="col-md-4" style="padding-left: 30px;">\
							<p id="' + i + '">' + time + '</p>\
						</div>\
						<div id="' + i + ' class="col-md-8" style="padding-left: 5px;">\
							<p id="' + i + '">' + name + ' </p>\
						</div>\
					</div>\
				</div>';
			container.find("#activitiesContainer").append(html);
		}

		if(list_type == "active") {
			container.find("#endTime").html(model.days[id].getEnd());
			container.find("#totalLength").html(model.days[id].getTotalLength() + " min");
			for(var i = 0; i < ActivityType.length; i++) {
				var procentage = model.days[id].getLengthByType(i)/model.days[id].getTotalLength();
				container.find("#" + ActivityType[i] + "_bar").width(procentage*100 + "%");
			}
		}
	}

	this.update = function(){
		this.updateActivities(container, this.day, "active");
	}
}