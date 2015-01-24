class ItemDirective {

    constructor($interval) {
        this.template = '<div class="item"><img ng-src="{{ model.image }}" /></div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            model: '='
        };

        this.$interval = $interval;
    }

    compile(tElement) {

        tElement.css('position', 'absolute');

        //return this.link.bind(this);
    }

    link(scope, element) {

        this.$interval(() => this.move(element), 1000);

    }

    move(element) {
        var newPos = this.getNewPosition();
        element.css('left', newPos.x + 'px');
        element.css('top', newPos.y + 'px');
    }

    getNewPosition() {
        var width = window.innerWidth,
            height = window.innerHeight;

        return {
            x: Math.random() * width,
            y: Math.random() * height
        };
    }
}

register.directive('item', ItemDirective);