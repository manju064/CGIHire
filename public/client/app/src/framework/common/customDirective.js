angular.module("app").directive('userInfoCard', function(){
    return {
        template : "Name: {user.name}",
        restrict : "E"
    }
	
});