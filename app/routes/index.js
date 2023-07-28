import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  // find all expenses
  async model() {
    const categories = await this.store.findAll('category');

    const expenses = await this.store.findAll('expense');

    return { expenses, categories };
  }
}
