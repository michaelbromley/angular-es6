import * as register from '../utils/annotations';

/**
 * Provides access to the JSON endpoint which contains the data about the items.
 */
class ItemsService {

    constructor($http) {
        this.$http = $http;
    }

    getItems() {
        return this.$http.get('../api/items');
    }

}

register.service('itemsService', ItemsService);

export default ItemsService;