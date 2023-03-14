export default class CarProviderModel {

    static getModelName() {
        return CarProviderModel.schema.name;
    }
  
    static schema = {
        name: 'CarProvider',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            reference: 'string?',
            phoneNumber: 'string?',
            cars: {
                type: 'linkingObjects',
                objectType: 'Car',
                property: 'carProvider',
            },
        },
    }
}