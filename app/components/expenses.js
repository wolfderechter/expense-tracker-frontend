import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExpensesComponent extends Component {
  @service store;

  get sorted() {
    let { expenses } = this.args;

    let sortedExpenses = [...expenses];
    sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedExpenses;
  }

  @action
  removeExpense(expense, event) {
    event.preventDefault();
    expense.destroyRecord();
  }
}
