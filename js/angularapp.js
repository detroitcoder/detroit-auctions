var app = angular.module('auction_app', []);

app.controller("AuctionCtrl", function($http){
    var app = this;
    app.userid = get_user_id();

    $http.get("/api/auctions").success(function(data){
        app.auctions = data.objects;
    });


    $http.get("/api/votes", {params: {user: app.userid}}).success(function(data) {
            app.user_votes = {};
            for (var i = 0; i < data.objects.length; i++) {
                app.user_votes[data.objects[i].house] = data.objects[i].score;
            }
        }
    );

    app.disableButton = function(house, inc){
        var disable = false;
        if (app.user_votes != undefined) {

//            if (house.id in app.user_votes) {
//                console.log("property");
//                console.log(house.id);
//                console.log(app.user_votes);
//                console.log(app.user_votes[house.id]);
//            }

            // console.log(app.user_votes[house.id]);
            if (house.id in app.user_votes) {
                if (app.user_votes[house.id] == inc) {
                    disable = true;
                }
            }
        }
        return disable;
    };

    app.incrementScore = function(house, inc){

        house.score = house.score + inc;
        $http.put("/api/auctions/" + house.id, house);
        if (app.user_votes[house.id] == undefined) {
            console.log(app.user_votes);
            console.log(house.id);
            console.log(app.user_votes[house.id] == undefined);
            app.user_votes[house.id] = inc;
            $http.post("api/votes",
                {
                    user: app.userid,
                    house: house.id,
                    score: inc}
            );

        } else {
            var new_user_score = app.user_votes[house.id] + inc;
            app.user_votes[house.id] = new_user_score;
            $http.put("/api/votes/" + house.id,
                {
                    user: app.userid,
                    house: house.id,
                    score: new_user_score}
            )
        }
    };

});

app.directive("myMaps", function($http){
    return {
        restrict: "E",
        template: "<div></div>",
        replace: true,
        link: function(scope, element, attrs){
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                center: new google.maps.LatLng(42.3814, -83.0458),
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            };
            var map = new google.maps.Map(document.getElementById(attrs.id),
                 mapOptions);

            var infoWindow = new google.maps.InfoWindow()
            $http.get("/api/auctions").success(function(data){
                var auctions = data.objects;
                for (var i=0; i < auctions.length; i++){
                    var position = new google.maps.LatLng(auctions[i].lat, auctions[i].lon);
//                    bounds.extend(position);
                    var html = "<h>"+auctions[i].addr+"</h><p><img src=\""+auctions[i].img+"\" alt=\"something\" /></p>"
                    var marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: auctions[i].addr,
                        html: html
                        });
//                    marker.setMap(map);
                    console.log(auctions[i]);
                    google.maps.event.addListener(marker, 'click', function(){
                                infoWindow.setContent(this.html);
                                infoWindow.open(map, this);

                    });
//                    map.fitBounds(bounds);
                    };
                });

            marker.setMap(map);

            }

        }
    });

