$(document).ready(function() {
	var $hotelSelect = $("#hotel-dropdown").children("select");
	var $restaurantSelect = $("#restaurant-dropdown").children("select");
	var $activitySelect = $("#activity-dropdown").children("select");

	function dropdownFiller ($element, array) {
		array.forEach(function(item){
			$($element).append(`<option >${item.name}</option>`)
		});
	}
	
	dropdownFiller($hotelSelect, hotels);
	dropdownFiller($restaurantSelect, restaurants);
	dropdownFiller($activitySelect, activities);

	var $plusButtonHotel = $("#hotel-dropdown").children("button");
	var $plusButtonRestaurant = $("#restaurant-dropdown").children("button");
	var $plusButtonActivity = $("#activity-dropdown").children("button");

	function addSelectedItem ($plusButton, dropdownId, itineraryId) {
		$plusButton.on("click", function(){
			var addedItem = $(dropdownId).children("select").val();
			$(itineraryId).prepend(`<span>${addedItem}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button><br>`);
		});
	}

	addSelectedItem($plusButtonHotel, "#hotel-dropdown", "#itinerary-item-hotel");
	addSelectedItem($plusButtonRestaurant, "#restaurant-dropdown", "#itinerary-item-restaurant");
	addSelectedItem($plusButtonActivity, "#activity-dropdown", "#itinerary-item-activity");



	$(".panel-body#itinerary").on("click", "button", function(){
		console.log("hello");
		console.log($(this));
		console.log($(this).closest("span"));
		$(this).siblings("span").remove();
		$(this).remove();
	});


});

// value = "${item.id}"	