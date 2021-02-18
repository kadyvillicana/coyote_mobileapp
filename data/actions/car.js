import CarModel from '../models/car';
import _ from 'lodash';

export default (realmInstance) => {
  return {
    saveCar: (carResponse) => {
        const { 
            make, model, version, miles, purchasePrice
        } = carResponse;
        return new Promise((resolve, reject) => {
            try {
                const id = Math.round(Math.random() * 1000000) + '';
                const purchaseDate = new Date();
                const car = {
                    id,
                    make,
                    model, 
                    version,
                    miles,
                    purchaseDate,
                    purchasePrice
                };
                realmInstance.write(() => {
                    const createdCar = realmInstance.create(CarModel.getCarModelName(), car, true);
                    resolve(createdCar);
                });
            } catch(e) {
                reject(e);
            }
        });
    },

    getAvailableCars: () => {
        return realmInstance.objects(CarModel.getCarModelName()).filtered('status = $0 SORT(purchaseDate DESC)', 'available');
    },

    getSoldCreditCars: () => {
        return realmInstance.objects(CarModel.getCarModelName()).filtered('status = $0 SORT(purchaseDate DESC)', 'soldCredit');
    },

    getAllSoldCars: () => {
        return realmInstance.objects(CarModel.getCarModelName()).filtered('status != $0 SORT(purchaseDate DESC)', 'available');
    },
  }
}