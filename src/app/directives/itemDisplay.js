/**
 * This is an example of a "component" directive which encapsulates a template.
 */
class ItemDisplayDirective {

    constructor() {
        this.template = '<div class="item-display-container"><item ng-repeat="item in items" model="item"></item></div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            collection: '=',
            start: '='
        }
    }

    link(scope) {

        scope.$watch('start', (value) => {
            if (value) {
                scope.items = scope.collection;
            }
        });
    }
}

register('app').directive('itemDisplay', ItemDisplayDirective);