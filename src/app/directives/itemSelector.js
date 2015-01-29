/**
 * This is an example of a "component" directive which encapsulates a template.
 */
class ItemSelectorDirective {

    /*@ngInject*/
    constructor($timeout) {
        this.template = '<div class="items-selector">Which ones please you the most?<ul>' +
                            '<li ng-repeat="item in collection" selectable="item">' +
                                '<img ng-src="{{ item.thumb }}" class="item-thumb" />' +
                                '<span class="item-name">{{ item.name }}</span>' +
                        '</li></ul></div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            collection: '='
        };
        this.$timeout = $timeout;
    }
}

register('app').directive('itemSelector', ItemSelectorDirective);