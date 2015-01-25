/**
 * This is an example of a "component" directive which encapsulates a template.
 */
class ItemDisplayDirective {

    constructor() {
        this.template = '<div class="item-display-container"><item ng-repeat="item in collection" model="item"></item></div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            collection: '=',
            start: '='
        }
    }
}

register.directive('itemDisplay', ItemDisplayDirective);