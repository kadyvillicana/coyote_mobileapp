export default class SellerModel {

    static getSellerModelName() {
        return SellerModel.schema.name;
    }
  
    static schema = {
        name: 'Seller',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            reference: 'string',
            number: 'string',
        },
    };
  }