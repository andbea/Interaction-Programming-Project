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

	// This function returns the starting time of the activity
	// by adding all the times of the earlier activities together
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

	// This part creates the day window by creating all the necessary elements
	// and then appending it infront of the addDay window
	var newDayContainer = document.createElement("td");
	newDayContainer.setAttribute("class", "dayView");

	var element = document.createElement("div");
	element.setAttribute("class", "post");

		var row = document.createElement("div");
		row.setAttribute("class", "row");

			var col = document.createElement("div");
			col.setAttribute("class", "col-md-4");
			col.setAttribute("style", "padding-right: 0;");

				var p = document.createElement("p");
				p.setAttribute("style", "padding-top: 4px;");
				p.innerHTML = "Start time:";
				col.appendChild(p);

				p = document.createElement("p");
				p.innerHTML = "End time:";
				col.appendChild(p);

				p = document.createElement("p");
				p.innerHTML = "Total length:";
				col.appendChild(p);

			row.appendChild(col);

			col = document.createElement("div");
			col.setAttribute("class", "col-md-3");
			col.setAttribute("align", "right");
			col.setAttribute("style", "padding-right: 3px; padding-left: 3px;");

				var input = document.createElement("input");
				input.setAttribute("id", "startTime");
				input.setAttribute("type", "text");
				input.setAttribute("value", "8:00");
				input.setAttribute("style", "width: 70%; margin-bottom: 4px;");
				col.appendChild(input);

				p = document.createElement("p");
				p.setAttribute("id", "endTime");
				p.setAttribute("style", "padding-top: 5px; padding-right: 2px; text-align: right;");
				col.appendChild(p);

				p = document.createElement("p");
				p.setAttribute("id", "totalLength");
				p.setAttribute("style", "text-align: right; padding-right: 2px; width:100%;");
				col.appendChild(p);

			row.appendChild(col);

			col = document.createElement("div");
			col.setAttribute("class", "col-md-5");
			col.setAttribute("style", "padding-left: 5px");

				var progress = document.createElement("div");
				progress.setAttribute("id", "progress");
				progress.setAttribute("class", "progress");
				progress.setAttribute("style", "height: 80px");

					var div = document.createElement("div");
					div.setAttribute("id", "break_bar");
					div.setAttribute("class", "progress-bar progress-bar-warning");
					div.setAttribute("style", "width: 0%");
					progress.appendChild(div);

					div = document.createElement("div");
					div.setAttribute("id", "groupWork_bar");
					div.setAttribute("class", "progress-bar progress-bar-danger");
					div.setAttribute("style", "width: 0%");
					progress.appendChild(div);

					div = document.createElement("div");
					div.setAttribute("id", "presentation_bar");
					div.setAttribute("class", "progress-bar progress-bar-info");
					div.setAttribute("style", "width: 0%");
					progress.appendChild(div);

					div = document.createElement("div");
					div.setAttribute("id", "discussion_bar");
					div.setAttribute("class", "progress-bar progress-bar-success");
					div.setAttribute("style", "width: 0%");
					progress.appendChild(div);

				col.appendChild(progress);

			row.appendChild(col);

		element.appendChild(row);

		row = document.createElement("div");
		row.setAttribute("id", "activitiesContainer");
		element.appendChild(row);

	newDayContainer.appendChild(element);

	var list = document.getElementById("container_table");
    list.insertBefore(newDayContainer, document.getElementById("addDayContainer"));
}


// this is our main module that contains days and parked activites
function Model(){
	this.days = [];
	this.parkedActivities = [];
	this.dragActivity = {"listId":0, "position":0, "activity":null};
	this.currentHover = {"dag":0, "id":-1};

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

		var container = $(".dayView").last();
		var id = $(".dayView").length - 1;
		var dayView = new DayView(container, this, id);
		var dayViewController = new DayViewController(dayView, this);
	};
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		var id;
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			if (position != null) {
				id = position;
				this.parkedActivities.splice(position,0,activity);
			}
			else {
				this.parkedActivities.push(activity);
				id = this.parkedActivities.length-1;
			}
		}
		this.notifyObservers();
		return id;
	}

	// This function gets the activity list for that specific day.
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

	/* This function updates the list of activities. The inputs are:
		container - The window in which the activity table can be found,
		this is either the day or the activity holder.

		id - This is the id of the day or -1 if it is the activity container.
		The activity holder also presents the time in minutes, whilst the days
		have the starting time of the activity presented.

	The function removes the entire container of activites and then replaces them with
	new elements. This function is called from the update windows of the days and activity holder*/
	this.updateActivities = function (container, id) {
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
			if(id == -1) {
				time = activity.getLength() + " min";
			}
			else {
				time = this.days[id].getActivityStart(i);
			}

			var element = document.createElement("div");
			element.setAttribute("class", "activity ".concat(type));
			element.setAttribute("id", i);
			element.setAttribute("draggable", "true");

				var row = document.createElement("div");
				row.setAttribute("class", "row");
				row.setAttribute("id", i);
				row.setAttribute("style", "padding: 8px;");

					var col = document.createElement("div");
					col.setAttribute("class", "col-md-4");
					col.setAttribute("id", i);
					col.setAttribute("style", "padding-left: 30px;");

						var p = document.createElement("div");
						p.setAttribute("class", "activity_text");
						p.setAttribute("id", i);
						p.innerHTML = time;
						
					col.appendChild(p);

				row.appendChild(col);

					col = document.createElement("div");
					col.setAttribute("class", "col-md-8");
					col.setAttribute("id", i);
					col.setAttribute("style", "padding-left: 5px;");

						p = document.createElement("div");
						p.setAttribute("class", "activity_text");
						p.setAttribute("id", i);
						p.innerHTML = name;
					col.appendChild(p);

				row.appendChild(col);

			element.appendChild(row);

			container.find("#activitiesContainer").append(element);

			var activityContainer = container.find("#activitiesContainer").find("#" + element.id);
	 		var dragDropView = new DragDropView(activityContainer, this, id);
			var dragDropViewController = new DragDropViewController(dragDropView, this);
		}

		if(id != -1) {
			container.find("#endTime").html(this.days[id].getEnd());
			container.find("#totalLength").html(this.days[id].getTotalLength() + " min");
			for(var i = 0; i < ActivityType.length; i++) {
				if(this.days[id].getTotalLength() != 0){
					var procentage = this.days[id].getLengthByType(i) / this.days[id].getTotalLength();
					container.find("#" + ActivityType[i] + "_bar").width(procentage*100 + "%");
				}
				else {
					container.find("#" + ActivityType[i] + "_bar").width(0 + "%");
				}
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