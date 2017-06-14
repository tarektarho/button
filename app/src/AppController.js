/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
 function GetController($scope, $http) {

    $scope.click = function() {

        // $http.defaults.useXDomain = true;

        var response = $http.get('http://192.168.137.159:5555/?device=solenoid&duration=150');

        response.success(function(data, status, headers, config) {

            alert("Ok.");

        });

        response.error(function(data, status, headers, config) {
            alert("Error.");
        });

    };

}

function AppController(UsersDataService, $mdSidenav) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;

  // Load all registered users

  UsersDataService
        .loadAllUsers()
        .then( function( users ) {
          self.users    = [].concat(users);
          self.selected = users[0];
        });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }
}

export default [ 'UsersDataService', '$mdSidenav', AppController ];
