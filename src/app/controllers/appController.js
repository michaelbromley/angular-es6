/**
 * The one and only controller used in this app.
 */
class AppController {

    constructor($scope, itemsService) {
        var vm = this;
        vm.items = [];
        vm.selection = [];

        itemsService.getItems().then( result =>  vm.items = result );

        $scope.$watch('vm.items', () => {
            vm.selection = vm.items.filter(item => item.selected);
        }, true);
    }

}

register.controller('AppController', AppController);