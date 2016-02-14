angular.module('symphony', ['ngRoute', 'ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
  			.primaryPalette('indigo')
  			.accentPalette('amber');
    });
angular.bootstrap(document, ['symphony']);
