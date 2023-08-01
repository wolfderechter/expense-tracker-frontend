import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExpensesComponent extends Component {
  @service store;
  @tracked existingCategoryID;
  @tracked newCategory;
  @tracked selectedCategory = null;
  @tracked categories;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  @action
  async initialize() {
    try {
      this.categories = await this.store.findAll('category');
      this.existingCategoryID = this.args.expense.category.id;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  @action
  async selectCategory(event) {
    // Get the selected category ID from the event
    const selectedCategoryID = event.target.value;
    this.selectedCategory = await this.store.peekRecord(
      'category',
      selectedCategoryID
    );
  }

  @action
  editExpense(expense, event) {
    event.preventDefault();
    expense.save();

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
      if (cat.title === this.newCategory) {
        categoryExists = true;
      }
    });

    if (categoryExists) return;

    let category = null;
    category = this.store.createRecord('category', {
      title: this.newCategory,
    });

    try {
      await category.save();
      this.newCategory = '';
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }
}
