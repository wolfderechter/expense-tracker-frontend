import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NewController extends Controller {
  @tracked newTitle;
  @tracked existingCategory;
  @tracked newValue;
  @tracked newDate;

  @service store;
  @tracked categories;
  @tracked newCategory;

  constructor() {
    super(...arguments);
  }

  // only used for controllers
  async init() {
    super.init();

    // Set the date to today by default in the form
    this.newDate = new Date().toISOString().split('T')[0];

    try {
      // Fetch categories using async/await
      this.categories = await this.store.findAll('category');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  @action
  async selectCategory(event) {
    // Get the selected category ID from the event
    const selectedCategoryID = event.target.value;
    this.existingCategory = await this.store.peekRecord(
      'category',
      selectedCategoryID
    );
  }

  @action
  async createExpense(event) {
    event.preventDefault();

    if (this.newTitle === '') return;

    const expense = this.store.createRecord('expense', {
      title: this.newTitle,
      // category: this.existingCategory,
      value: this.newValue,
      date: this.newDate,
    });

    await expense.save();
    expense.category = this.existingCategory;
    await expense.save();

    // clear input fields
    this.newTitle = '';
    this.existingCategory = '';
    this.newDate = '';
    this.newValue = '';
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
