export default class OutGoingModel {

  static getOutGoingModelName() {
      return OutGoingModel.schema.name;
  }

  static schema = {
      name: 'OutGoing',
      primaryKey: 'id',
      properties: {
          id: 'string',
          name: 'string',
          value: 'int'
      },
  };
}