import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;
  @tracked filteredCategories;
  @tracked filteredExpenses = null;
  @tracked month = -2; //set default filter to 'all time'
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

    // reset the year to the current year after selecting 'all time'
    if (event.target.value === '-2') {
      this.year = new Date().getFullYear();
    }

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

  // This function sorts and filters expenses, if a month is selected it will filter for those expenses
  @action
  async filter() {
    console.log('filtering');
    this.filteredExpenses = [...this.model.expenses];
    this.filteredExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (this.month === -2) {
      // show all expenses
      console.log('hi?');
      return;
    }

    if (this.month === -1) {
      // show all expenses of the year
      this.filteredExpenses = this.filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === this.year;
      });
      return;
    }

    this.filteredExpenses = this.filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === this.year &&
        expenseDate.getMonth() === this.month
      );
    });
  }
}
