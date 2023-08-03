import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MonthlyStatisticsComponent extends Component {
  @service store;
  @tracked chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  @computed('args.filteredExpenses.length')
  get totalExpenses() {
    return this.args.filteredExpenses.length;
  }

  @computed('args.filteredExpenses', 'totalExpenses')
  get averageValue() {
    const totalValue = this.args.filteredExpenses.reduce((sum, expense) => {
      return sum + parseFloat(expense.value);
    }, 0);
    const average = totalValue / this.totalExpenses;
    return isNaN(average) ? 0 : average.toFixed(2);
  }

  get categoriesByValueData() {
    const { year, month, filteredExpenses } = this.args;
    const data = {};

    filteredExpenses.forEach((expense) => {
      // add default 'no category' if the expense doesn't have a category
      const categoryTitle = expense.category.get('title') || 'No category';
      const expenseDate = new Date(expense.date);

      if (
        month === -1 ||
        (expenseDate.getFullYear() === year && expenseDate.getMonth() === month)
      ) {
        data[categoryTitle] =
          (data[categoryTitle] || 0) + parseFloat(expense.value);
      }
    });
    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#FF9F40',
            '#9966FF',
            '#F76D57',
            '#2DD3FF',
            '#FFC94D',
            '#A76DFF',
          ],
        },
      ],
    };
  }
}
