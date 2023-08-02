import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExpensesComponent extends Component {
  @service store;

  @action
  async removeExpense(expense, event) {
    event.preventDefault();
    await expense.destroyRecord();
    // Tell parent component to refresh data
    this.args.onRemoveExpense();
  }
}
