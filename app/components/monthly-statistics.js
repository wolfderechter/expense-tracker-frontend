import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class MonthlyStatisticsComponent extends Component {
  @computed('args.filteredExpenses')
  get totalExpenses() {
    return this.args.filteredExpenses.length;
  }

  @computed('args.filteredExpenses')
  get averageValue() {
    const totalValue = this.args.filteredExpenses.reduce((acc, expense) => {
      return acc + parseFloat(expense.value);
    }, 0);
    const average = totalValue / this.totalExpenses;
    return isNaN(average) ? 0 : average.toFixed(2);
  }
}
