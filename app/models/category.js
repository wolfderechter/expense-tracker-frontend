import Model, { attr, hasMany } from '@ember-data/model';

export default class CategoryModel extends Model {
  @attr title;
  @hasMany('expense', { async: true, inverse: null }) expenses;
}
