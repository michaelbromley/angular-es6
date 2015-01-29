/**
 * This is an example of a "behavioural" directive that has no template, but decorates the behaviour of the
 * element which it is attached to.
 *
 * The directive makes an element "selectable", which means when it is clicked, the class `selected` will be added to the element, and if a
 * object is supplied as the value of the "selectable" attribute, the directive will attempt to add a property `selected = true` to that
 * object.
 */
class Selectable {

    constructor() {
        this.restrict = 'A';
    }

    compile(tElement) {
        tElement.addClass('selectable');
    }

    link(scope, element, attrs) {
        var model = scope.$eval(attrs.selectable) || {};

        element.on('click', () => {
            scope.$apply(() => {
                element.toggleClass('selected');
                model.selected = !model.selected;
            });
        });
    }

}

register('app').directive('selectable', Selectable);