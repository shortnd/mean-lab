angular
  .module("Champs", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("ChampFactory", [
    "$resource",
    ChampFactoryFunction
  ])
  .controller("IndexController", [
    "ChampFactory",
    "$state",
    IndexControllerFunction
  ])
  .controller("ShowController", [
    "ChampFactory",
    "$stateParams",
    "$state",
    ShowControllerFunction
  ])

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/champs",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/champs/:name",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
  }

  function ChampFactoryFunction($resource){
    return $resource("/api/champs/:name", {}, {
      update: { method: "PUT" }
    })
  }

  function IndexControllerFunction(ChampFactory, $state){
    this.champs = ChampFactory.query()
    this.newChamp = new ChampFactory()
    this.create = function(){
      this.newChamp.$save().then(function(champ){
        $state.go("show", { name: champ.name })
      })
    }
  }

  function ShowControllerFunction(ChampFactory, $stateParams, $state){
    this.champ = ChampFactory.get({ name: $stateParams.name })
    this.update = function(){
      console.log("Updating");
      this.champ.$update({ name: $stateParams.name })
    }
    this.destroy = function(){
      this.champ.$delete({ name: $stateParams.name }).then(function(){
        $state.go("index")
      })
    }
  }
