// JavaScript Document

// The possible activity types
var ActivityType = ["presentation","groupWork","discussion","break"]

// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name,length,typeid,description){
	var _name = name;
	var _length = length;
	var _typeid = typeid;
	var _description = description;
	
	// sets the name of the activity
	this.setName = function(name) {
		_name = name;
		model.notifyObservers();
	}

	// get the name of the activity
	this.getName = function(name) {
		return _name;
	}
	
	// sets the length of the activity
	this.setLength = function(length) {
		_length = length;
		model.notifyObservers();
	}

	// get the name of the activity
	this.getLength = function() {
		return _length;
	}
	
	// sets the typeid of the activity
	this.setTypeId = function(typeid) {
		_typeid = typeid;
		model.notifyObservers();
	}

	// get the type id of the activity
	this.getTypeId = function() {
		return _typeid;
	}
	
	// sets the description of the activity
	this.setDescription = function(description) {
		_description = description;
		model.notifyObservers();
	}

	// get the description of the activity
	this.getDescription = function() {
		return _description;
	}
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return ActivityType[_typeid];
	};
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH, startM) {
	this._start = startH * 60 + startM;
	this._activities = [];

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;
	}

	// returns the total length of the acitivities in 
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};
	
	// returns the string representation Hours:Minutes of 
	// the end time of the day
	this.getEnd = function() {
		var end = this._start + this.getTotalLength();
		return Math.floor(end/60) + ":" + end % 60;
	};

	this.getActivityStart = function(id) {
		var time = 0,
			minutes = "";
		for(var i = 0; i < id; i++) {
			time += this._activities[i].getLength();
		}
		time = this._start + time;
		if(time%60 == 0){
			minutes = "00";
		}
		else {
			minutes = time%60;
		}
		return Math.floor(time/60) + ":" + minutes;
	};
	
	// returns the string representation Hours:Minutes of 
	// the start time of the day
	this.getStart = function() {
		return Math.floor(this._start/60) + ":" + this._start % 60;
	};
	
	// returns the length (in minutes) of activities of certain type
	this.getLengthByType = function (typeid) {
		var length = 0;
		$.each(this._activities,function(index,activity){
			if(activity.getTypeId() == typeid){
				length += activity.getLength();
			}
		});
		return length;
	};
	
	// adds an activity to specific position
	// if the position is not provided then it will add it to the 
	// end of the list
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
		return this._activities.splice(position,1)[0];
	};
	
	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		// In case new position is greater than the old position and we are not moving
		// to the last position of the array
		if(newposition > oldposition && newposition < this._activities.length - 1) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
	};

	var newDayContainer = document.createElement("td");
	newDayContainer.setAttribute("id", "dayView");
	newDayContainer.innerHTML = 
		'<div class="post">\
			<div class="row">\
				<div class="col-md-4" style="padding-right: 0">\
					<p style="padding-top: 4px">Start time:</p>\
					<p>End time:</p>\
					<p>Total length:</p>\
				</div>\
				<div class="col-md-3" align="right" style="padding-right: 3px; padding-left: 3px;">\
					<input id="startTime" type="text" value="08:00" style="width: 70%; margin-bottom: 4px;">\
					<p id="endTime" style="padding-top: 5px; padding-right: 2px; text-align: right;">8:00</p>\
					<p id="totalLength" style="text-align: right; padding-right: 2px; width:100%;">0 min</p>\
				</div>\
				<div class="col-md-5" style="padding-left: 5px">\
					<div id="progress" class="progress" style="height: 80px">\
						<div id="groupWork_bar" class="progress-bar progress-bar-warning" style="width: 0%"></div>\
						<div id="break_bar" class="progress-bar progress-bar-danger" style="width: 0%"></div>\
						<div id="presentation_bar" class="progress-bar progress-bar-info" style="width: 0%"></div>\
						<div id="discussion_bar" class="progress-bar progress-bar-success" style="width: 0%"></div>\
					</div>\
				</div>\
			</div>\
			<div id="activitiesContainer"></div>\
		</div>';

	var list = document.getElementById("container_table");
    list.insertBefore(newDayContainer, document.getElementById("addDayContainer"));

}


// this is our main module that contains days and parked activites
function Model(){
	this.days = [];
	this.parkedActivities = [];
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
		this.days.push(day);
		this.notifyObservers();
		return day;
	};
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			if (position != null) {
				this.parkedActivities.splice(position,0,activity);
			}
			else this.parkedActivities.push(activity);
		}
		this.notifyObservers();
	}

	this.getActivities = function (day) {
		return this.days[day]._activities;
	}
	
	// add an activity to parked activities
	this.addParkedActivity = function(activity,position){
		this.addActivity(activity,null,position);
	};
	
	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];
		this.notifyObservers();
		return act;
	};
	
	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		}else if(oldday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}
		this.notifyObservers();
	};
	
	//*** OBSERVABLE PATTERN ***
	var listeners = [];
	
	this.notifyObservers = function (args) {
	    for (var i = 0; i < listeners.length; i++){
	        listeners[i].update(args);
	    }
	};
	
	this.addObserver = function (listener) {
	    listeners.push(listener);
	};
	//*** END OBSERVABLE PATTERN ***

	this.updateActivities = function (container, id, list_type) {
		container.find("#activitiesContainer").empty();
		var list; 
		if(id == -1){
			list = this.parkedActivities;
		}
		else {
			list = this.getActivities(id);
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
				time = this.days[id].getActivityStart(i);
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
			container.find("#endTime").html(this.days[id].getEnd());
			container.find("#totalLength").html(this.days[id].getTotalLength() + " min");
			for(var i = 0; i < ActivityType.length; i++) {
				var procentage = this.days[id].getLengthByType(i)/this.days[id].getTotalLength();
				container.find("#" + ActivityType[i] + "_bar").width(procentage*100 + "%");
			}
		}
	}
}


// you can use this method to create some test data and test your implementation
function createTestData(model){
	model.addDay();
		
	var container = $("#dayView").last();
	var id = $("#dayView").length-1;
	var dayView = new DayView(container, model, id);
	var dayViewController = new DayViewController(dayView, model);

	model.addActivity(new Activity("Introduction",10,0,""),0);
	model.addActivity(new Activity("Idea 1",30,0,""),0);
	model.addActivity(new Activity("Working in groups",35,1,""),0);
	model.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
	model.addActivity(new Activity("Coffee break",20,3,""),0);
	
	console.log("Day Start: " + model.days[0].getStart());
	console.log("Day End: " + model.days[0].getEnd());
	console.log("Day Length: " + model.days[0].getTotalLength() + " min");
	$.each(ActivityType,function(index,type){
		console.log("Day '" + ActivityType[index] + "' Length: " +  model.days[0].getLengthByType(index) + " min");
	});
}