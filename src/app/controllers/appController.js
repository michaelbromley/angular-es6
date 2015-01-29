/**
 * The one and only controller used in this app.
 */
class AppController {

    /*@ngInject*/
    constructor($scope, itemsService, thingFactory) {
        this.items = [];
        this.selection = [];

        itemsService.getItems().then( result =>  this.items = result );

        $scope.$watch('vm.items', () => {
            this.selection = this.items.filter(item => item.selected);
        }, true);

        this.makeThing = () => { thingFactory.newThing() };


        this.$inject = ['$scope', 'itemService', 'Thing'];
    }

}

register('app').controller('AppController', AppController);