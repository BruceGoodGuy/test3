var myapp = angular.module("myapp",["ngRoute"]);

//route
myapp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: "pages/one.html",
		controller: "onecontroller"
	})
	.when('/home',{
		templateUrl: "pages/home.html",
		controller: "homecontroller"
	})
	.when("/result",{
		templateUrl:"pages/result.html",
		controller: "resultcontroller"
	})
})


//controller
myapp.controller("onecontroller",function($scope,saveService){
	$scope.setNum = function(number){
		saveService.setNum(number);
		location.href="#/home";
	}
});
myapp.controller('homecontroller',function($scope,saveService){
	var num = saveService.getNum();
	$scope.number = num;
	$scope.range = saveService.getArray(num);
	saveService.saveOriginal($scope.range);
	$scope.process = function(){
		for(var i = 0; i<$scope.range.length; i++)
		{
			var j = i+1;
			$scope.range[i]*=j;
		}
		saveService.saveArray($scope.range);
		location.href="#/result";
	}

});

myapp.controller("resultcontroller",function($scope,saveService){
	$scope.array =(saveService.takeArray());
});

//service
myapp.service("saveService",function(){
			var numBer;
			var sArray;
			var origin;
	return{
		setNum: function(num){
			numBer = num;
		},
		getNum: function(){
			return numBer;
		},
		getArray: function(max){
			var range =[];
			for(var i = 1 ; i <= max; i++)
			{
				var j=i-1;
				range[j]="";
			}
			return range;
		},
		saveArray: function(array){
			sArray = array;
			return sArray;
		},
		takeArray: function(){
			return  sArray;
		},
		saveOriginal: function(array){
			origin = array;
		},
		getOriginal: function(){
			return origin;
		}

	}
});