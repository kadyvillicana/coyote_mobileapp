export default class PaymentModel {

  static getPaymentModelName() {
      return PaymentModel.schema.name;
  }

  static schema = {
      name: 'Payment',
      primaryKey: 'id',
      properties: {
          id: 'string',
          value: 'int',
          createdDate: 'date'
      },
  };
}