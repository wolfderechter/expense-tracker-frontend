import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExpensesComponent extends Component {
  @service store;
  @tracked newCategory;
  @tracked selectedCategory = null;
  @tracked categories;
  @service toast;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  @action
  async initialize() {
    try {
      this.categories = await this.store.findAll('category');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  @action
  async selectCategory(event) {
    // Get the selected category ID from the event
    const selectedCategoryID = event.target.value;

    // exit if 'select a category' is selected
    if (selectedCategoryID === '') return;

    this.selectedCategory = await this.store.findRecord(
      'category',
      selectedCategoryID
    );
  }

  @action
  editExpense(expense, event) {
    event.preventDefault();
    expense.save();
    this.toast.success('Expense sucesfully edited!', 'Success!');

    // Only update the category when one is selected
    if (this.selectedCategory !== null) {
      expense.category = this.selectedCategory;
      expense.save();
    }
  }

  @action
  async createCategory(event) {
    event.preventDefault();

    if (this.newCategory === '') return;

    // check if exists or create category
    let categoryExists = false;
    this.categories.forEach((cat) => {
      if (cat.title.toLowerCase() === this.newCategory.toLowerCase()) {
        categoryExists = true;
      }
    });

    if (categoryExists) {
      this.toast.warning(
        `Category ${this.newCategory} already exists!`,
        'Warning!'
      );
      return;
    };

    let category = null;
    category = this.store.createRecord('category', {
      title: this.newCategory,
    });

    try {
      await category.save();
      this.toast.success(
        `Category ${this.newCategory} sucesfully created!`,
        'Success!'
      );
      this.newCategory = '';
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }
}
