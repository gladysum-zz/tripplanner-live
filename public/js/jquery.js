$(document).ready(function() {
	var $hotelSelect = $("#hotel-dropdown").children("select");
	var $restaurantSelect = $("#restaurant-dropdown").children("select");
	var $activitySelect = $("#activity-dropdown").children("select");

	//Populates dropdown menu with options
	//Can add  to the option later if need be
	function dropdownFiller ($element, array) {
		array.forEach(function(item){
			$($element).append(`<option value = "${item.id}">${item.name}</option>`)
		});
	}
	console.log(hotels);
	dropdownFiller($hotelSelect, hotels);
	dropdownFiller($restaurantSelect, restaurants);
	dropdownFiller($activitySelect, activities);

	var $plusButtonHotel = $("#hotel-dropdown").children("button");
	var $plusButtonRestaurant = $("#restaurant-dropdown").children("button");
	var $plusButtonActivity = $("#activity-dropdown").children("button");

	//Adds selected hotel/restaurant/activity to itinerary and then adds it to the map
	function addSelectedItem (arrayOfOptions, $plusButton, dropdownId, itineraryId) {
		$plusButton.on("click", function(){
			var addedItemId = $(dropdownId).children("select").val();

			var matchId = function(value) {
				return value.id === +addedItemId;
			}

			var coords = arrayOfOptions.filter(matchId)[0].place.location;
			var selectedItem = arrayOfOptions.filter(matchId)[0];
			var selectedItemName = arrayOfOptions.filter(matchId)[0].name;
			var selectedItemId = arrayOfOptions.filter(matchId)[0].id;
			var type;

			
			if (arrayOfOptions === hotels) {
				type = "hotel";
				selectedItem.marker = drawMarker("hotel", coords);
			}
			if (arrayOfOptions === restaurants) {
				type = "restaurant";
				selectedItem.marker = drawMarker("restaurant", coords);
			}
			if (arrayOfOptions === activities) {
				type = "activity";
				selectedItem.marker = drawMarker("activity", coords);
			}

			$(itineraryId).prepend(`<div data-type = "${type}" data-id = "${selectedItemId}"><span>${selectedItemName}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button><br></div>`);


		});
	}

	addSelectedItem(hotels, $plusButtonHotel, "#hotel-dropdown", "#itinerary-item-hotel");
	addSelectedItem(restaurants, $plusButtonRestaurant, "#restaurant-dropdown", "#itinerary-item-restaurant");
	addSelectedItem(activities, $plusButtonActivity, "#activity-dropdown", "#itinerary-item-activity");

	//When user clicks on remove button next to an itinerary item:
	$(".panel-body#itinerary").on("click", "button", function(){
		$(this).parent("div").remove();
		var deselectedMarker;

		var deselectedItemId = $(this).parent("div").data("id");

		var matchId = function(value) {
				return value.id === +deselectedItemId;
			}
		var deselectedItemType = $(this).parent("div").data("type");			
 		
 		if (deselectedItemType === "hotel") {
 			deselectedMarker = hotels.filter(matchId)[0].marker
 		}

 		if (deselectedItemType === "restaurant") {
 			deselectedMarker = restaurants.filter(matchId)[0].marker
 		}

 		if (deselectedItemType === "activity") {
 			deselectedMarker = activities.filter(matchId)[0].marker
 		}	

		deselectedMarker.setMap(null);

	});


});

