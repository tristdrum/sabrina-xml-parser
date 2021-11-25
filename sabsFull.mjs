var text = ``

import { JSDOM } from "jsdom";
import { writeFileSync } from "fs";

const dom = new JSDOM(text);
var xmlDoc = dom.window.document;

// totals to be removed for each activity type
var educationActivitiesToDelete = 12892;
var shoppingActivitiesToDelete = 2952;
var leisureActivitiesToDelete = 5612;
var workActivitiesToDelete = 9165;

// totals to be removed for each transport type
var walkingActivitiesToDelete = 12392;
var carActivitiesToDelete = 13883;
var publicTransportActivitiesToDelete = 30531;

// iterate over all persons
var persons = xmlDoc.getElementsByTagName("person");
const personsArray = Array.from(persons);
console.log(personsArray.length)
for (let i = 0; i < personsArray.length; i++) {

	var person = personsArray[i];

	// temp totals to be removed for each activity type
	var eduActivitiesForPerson = 0;
	var shopActivitiesForPerson = 0;
	var leisActivitiesForPerson = 0;
	var worActivitiesForPerson = 0;

	// temp totals to be removed for each transport type
	var walkActivitiesForPerson = 0;
	var caActivitiesForPerson = 0;
	var pubActivitiesForPerson = 0;

	// get plan
	var plan = person.getElementsByTagName("plan")[0];

	// iterate over all activities
	var activities = plan.getElementsByTagName("activity");
	for (let j = 0; j < activities.length; j++) {
		var activity = activities[j];
		switch (activity.getAttribute("type")) {
			case "leisure":
				leisActivitiesForPerson++;
				break;

			case "shopping":
				shopActivitiesForPerson++;
				break;

			case "education":
				eduActivitiesForPerson++;
				break;

			case "work":
				worActivitiesForPerson++;
				break;

			case "other":
				leisActivitiesForPerson++;
				break;

			default:
				break;
		}
	}

	// iterate over all legs
	var legs = plan.getElementsByTagName("leg");
	for (let j = 0; j < legs.length; j++) {
		var leg = legs[j];
		switch (leg.getAttribute("mode")) {
			case "walk":
				walkActivitiesForPerson++;
				break;

			case "car":
				caActivitiesForPerson++;
				break;

			case "pt":
				pubActivitiesForPerson++;
				break;

			default:
				break;
		}
	}
	if(
		(eduActivitiesForPerson < educationActivitiesToDelete && eduActivitiesForPerson != 0 )
		|| ( shopActivitiesForPerson < shoppingActivitiesToDelete && shopActivitiesForPerson != 0)
		|| (leisActivitiesForPerson < leisureActivitiesToDelete && leisActivitiesForPerson != 0)
		|| (worActivitiesForPerson < workActivitiesToDelete && worActivitiesForPerson != 0)
		|| (walkActivitiesForPerson < walkingActivitiesToDelete && walkActivitiesForPerson != 0)
		|| (caActivitiesForPerson < carActivitiesToDelete && caActivitiesForPerson != 0)
		|| (pubActivitiesForPerson < publicTransportActivitiesToDelete && pubActivitiesForPerson != 0)
		) {
		// remove person from xmlDoc
		person.parentNode.removeChild(person);
		console.log("");
		console.log("removed person " + person.getAttribute("id") + " (" + i + ")");
		
		if (eduActivitiesForPerson != 0){
			console.log(eduActivitiesForPerson + " educationActivitiesToDelete removed");
			console.log(educationActivitiesToDelete - eduActivitiesForPerson + "education Activities still need to be removed");
		}
		if (shopActivitiesForPerson != 0){
			console.log(shopActivitiesForPerson + " shoppingActivitiesToDelete removed");
			console.log(shoppingActivitiesToDelete - shopActivitiesForPerson + " shopping ActivitiesToDelete still need to be removed");
		}
		if (leisActivitiesForPerson != 0){
			console.log(leisActivitiesForPerson + " leisureActivitiesToDelete removed");
			console.log(leisureActivitiesToDelete - leisActivitiesForPerson + " leisureActivitiesToDelete still need to be removed");
		}
		if (worActivitiesForPerson != 0){
			console.log(worActivitiesForPerson + " workActivitiesToDelete removed");
			console.log(workActivitiesToDelete - worActivitiesForPerson + " workActivitiesToDelete still need to be removed");
		}
		if (walkActivitiesForPerson != 0){
			console.log(walkActivitiesForPerson + " walkingActivitiesToDelete removed");
			console.log(walkingActivitiesToDelete - walkActivitiesForPerson + " walkingActivitiesToDelete still need to be removed");
		}
		if (caActivitiesForPerson != 0){
			console.log(caActivitiesForPerson + " carActivitiesToDelete removed");
			console.log(carActivitiesToDelete - caActivitiesForPerson + " carActivitiesToDelete still need to be removed");
		}
		if (pubActivitiesForPerson != 0){
			console.log(pubActivitiesForPerson + " publicTransportActivitiesToDelete removed");
			console.log(publicTransportActivitiesToDelete - pubActivitiesForPerson + " publicTransportActivitiesToDelete still need to be removed");
		}
		
		// decrement total
		educationActivitiesToDelete -= eduActivitiesForPerson;
		shoppingActivitiesToDelete -= shopActivitiesForPerson;
		leisureActivitiesToDelete -= leisActivitiesForPerson;	
		workActivitiesToDelete -= worActivitiesForPerson;
		walkingActivitiesToDelete -= walkActivitiesForPerson;
		carActivitiesToDelete -= caActivitiesForPerson;
		publicTransportActivitiesToDelete -= pubActivitiesForPerson;
	}
	else{
		console.log("");
		console.log("not removed person " + person.getAttribute("id") + " (" + i + ")");
	}
	
	if (educationActivitiesToDelete == 0 && shoppingActivitiesToDelete == 0  && leisureActivitiesToDelete == 0 && workActivitiesToDelete == 0 && walkingActivitiesToDelete == 0 && carActivitiesToDelete == 0 && publicTransportActivitiesToDelete == 0){
		break;
	}
}

writeFileSync("test.xml", xmlDoc.documentElement.outerHTML);