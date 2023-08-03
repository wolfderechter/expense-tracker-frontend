import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ExpenseRoute extends Route {
  @service store;

  // Find expense object by expense_id
  async model(params) {
    await this.store.findAll('expense'); // need to fetch all expenses so when we do a refresh on the expense page all the expenses are still fetched and there when we go to the index page
    const expense = await this.store.peekRecord('expense', params.expense_id);
    return expense;
  }
}
