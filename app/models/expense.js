import Model, { attr, belongsTo } from '@ember-data/model';

export default class ExpenseModel extends Model {
  @attr title;
  @attr value;
  @attr date;
  @belongsTo('category', { async: true, inverse: null }) category;
}
