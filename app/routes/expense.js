import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ExpenseRoute extends Route {
  @service store;

  // Find expense object by expense_id
  async model(params) {
    const expense = await this.store.findRecord('expense', params.expense_id);
    return expense;
  }
}
