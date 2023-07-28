import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CategoryComponent extends Component {
  @service store;

  @action
  removeCategory(category, event) {
    event.preventDefault();
    category.destroyRecord();
  }
}
