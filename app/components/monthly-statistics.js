import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MonthlyStatisticsComponent extends Component {
  @service store;

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
        month === -2 || month === -1 ||
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


  get totalExpensesByMonthsData() {
    const { year, filteredExpenses } = this.args;
    const data = new Array(12).fill(0);

    filteredExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getFullYear() === year) {
        const month = expenseDate.getMonth();
        data[month] += parseFloat(expense.value);
      }
    });

    return {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [
        {
          label: 'Total Expenses',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
  get totalExpensesByOneMonthData() {
    const { year, month, filteredExpenses } = this.args;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = new Array(daysInMonth).fill(0);

    filteredExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (month === -1 || expenseDate.getFullYear() === year && expenseDate.getMonth() === month) {
        const day = expenseDate.getDate();
        data[day - 1] += parseFloat(expense.value);
      }
    });

    // Generate labels for each day of the month
    const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Total Expenses',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  get currentMonth() {
    const monthsList = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthsList[this.args.month];
  }
}
