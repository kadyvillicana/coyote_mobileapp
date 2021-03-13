import _ from 'lodash';
export default class CarModel {

    static getCarModelName() {
        return CarModel.schema.name;
    }

    static schema = {
        name: 'Car',
        primaryKey: 'id',
        properties: {
            id: 'string',
            make:  'string',
            model: 'string',
            version: 'string',
            miles: {type: 'int', default: 0},
            purchasePrice: 'int',
            salePrice: 'int?',
            soldPrice: 'int?',
            picture: 'data?',
            purchaseDate: 'date?',
            outgoings: 'OutGoing[]',
            payments: 'Payment[]',
            createdDate: 'date?',
            comments: 'string?',
            // status: available, sold, soldCredit
            status: {type: 'string', default: 'available'},
            soldDate: 'date?',
            // if status is soldCredit set dueDate for credit
            dueDate: 'date?',
            clientName: 'string?',
        },
    }

    get outgoingsList() {
        return this.outgoings.map((e) => {
            return {
                name: e.name,
                value: e.value,
                id: e.id,
            }
        });
    }

    get outgoingsSum(){
        return this.outgoings.reduce((sum, {value}) => sum + value, 0);
    }

    get paymentsSum(){
        return this.payments.reduce((sum, {value}) => sum + value, 0);
    }

    get purchasePricePlusOutgoings(){
        return this.outgoings.reduce( ( sum, { value } ) => sum + value , 0) + this.purchasePrice
    }

    get lastPaymentDate(){
        const sortedPayments = _.sortBy(this.payments, 'createdDate');
        if(!sortedPayments || sortedPayments.length === 0){
            return new Date();
        }
        return sortedPayments[sortedPayments.length - 1].createdDate;
    }

    get carRevenue(){
        return this.soldPrice - this.purchasePricePlusOutgoings;
    }

    get carCreditDebt(){
        const payments = this.paymentsSum && this.paymentsSum > 0 ? this.paymentsSum : 0;
        return this.soldPrice - payments;
    }
};