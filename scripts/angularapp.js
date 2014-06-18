(function(){
	var app = angular.module('auction_app', []);
	
	app.controller('AuctionsController', function(){
		this.houses = houses;
	});
	
})();