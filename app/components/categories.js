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

  @action
  categoryExpensesAmount(category) {
    let { month, year } = this.args;

    // only filter and count expenses when the month is set and there are expenses
    if (month > -1 && category.expenses.length > 0) {
      let count = 0;
      category.expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        if (
          expenseDate.getFullYear() === year &&
          expenseDate.getMonth() === month
        )
          count++;
      });
      return count;
    } else {
      return category.expenses.length;
    }
  }
}
