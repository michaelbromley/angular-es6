import * as register from '../utils/annotations';
import itemsService from '../services/itemsService';

console.log('appController.js');

/**
 * The one and only controller used in this app.
 */
class AppController {

    constructor($scope, itemsService) {
        var vm = this;
        vm.items = [];
        vm.selection = [];

        itemsService.getItems().then( result =>  vm.items = result.data );

        $scope.$watch('vm.items', () => {
            vm.selection = vm.items.filter(item => item.selected);
        }, true);
    }

}
register.controller('AppController', AppController);

export default AppController;