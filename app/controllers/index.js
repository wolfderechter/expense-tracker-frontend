import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;
  @tracked filteredCategories;
  @tracked filteredExpenses = null;
  @tracked month = -1;
  @tracked year = new Date().getFullYear();

  constructor() {
    super(...arguments);
  }

  @action
  async nextMonth() {
    this.month = Number(this.month) + 1;
    if (this.month > 11) {
      this.month = 0;
      this.year = this.year + 1;
    }
    this.filter();
  }

  @action
  async prevMonth() {
    this.month = Number(this.month) - 1;
    if (this.month < 0) {
      this.month = 11;
      this.year = this.year - 1;
    }
    this.filter();
  }

  @action
  async changeMonth(event) {
    this.month = Number(event.target.value);
    this.filter();
  }
  @action
  async setCurrentMonth() {
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.filter();
  }

  @action
  async changeYear(event) {
    this.year = Number(event.target.value);
    this.filter();
  }

  @action
  async filter() {
    if (this.month === -1) {
      // show all expenses
      this.filteredExpenses = [...this.model.expenses];
      return;
    }

    this.filteredExpenses = [...this.model.expenses];

    this.filteredExpenses = this.filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === this.year &&
        expenseDate.getMonth() === this.month
      );
    });

    return this.filteredExpenses;
  }
}
