import CarModel from '../models/car';
import _ from 'lodash';

export default (realmInstance) => {
  return {
    saveCar: (data) => {
        return new Promise((resolve, reject) => {
            try {
                data.id = Math.round(Math.random() * 1000000) + '';
                const purchaseDate =  new Date();
                data.purchasePrice = parseInt(data.purchasePrice);
                data.miles = parseInt(data.miles);
                const car ={
                    ...data,
                    purchaseDate,
                }
                realmInstance.write(() => {
                    const created = realmInstance.create(CarModel.getCarModelName(), car, true);
                    resolve(created);
                })
                resolve(true);
            } catch(e){
                reject(e);
            }
        })
        // const { 
        //     make, model, version, miles, purchasePrice
        // } = carResponse;
        // return new Promise((resolve, reject) => {
        //     try {
        //         const id = Math.round(Math.random() * 1000000) + '';
        //         const purchaseDate = new Date();
        //         const car = {
        //             id,
        //             make,
        //             model, 
        //             version,
        //             miles,
        //             purchaseDate,
        //             purchasePrice
        //         };
        //         realmInstance.write(() => {
        //             const createdCar = realmInstance.create(CarModel.getCarModelName(), car, true);
        //             resolve(createdCar);
        //         });
        //     } catch(e) {
        //         reject(e);
        //     }
        // });
    },

    updateCarById: (car) => {
        return new Promise((resolve, reject) => {
            try {
                realmInstance.write(() => {
                    const updatedCar = realmInstance.create(CarModel.getCarModelName(), car, 'modified');
                    resolve(updatedCar);
                })
            } catch(e) {
                reject(e);
            }
        });
    },

    deleteCarById: id => {
        return new Promise((resolve, reject) => {
            try {
                const car = realmInstance.objects(CarModel.getCarModelName()).filtered('id = $0', id);
                realmInstance.write(() => {
                    const deleteCar = realmInstance.delete(car);
                    resolve(deleteCar);
                })
            }catch(e) {
                reject(e);
            }
        })
    },

    getCarById: id => {
        return realmInstance.objects(CarModel.getCarModelName()).filtered('id = $0', id)[0];
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

    clientSuggestions: (query) => {
        return new Promise((resolve, reject) => {
            try {
                if(!query){
                    resolve([]);
                }
                const clientSuggestions = realmInstance.objects(CarModel.getCarModelName()).filtered(`clientName CONTAINS[c] "${query}"`);
                resolve(_.groupBy(clientSuggestions, 'clientName'));
            } catch(e) {
                reject(e)
            }
        })
    },
  }
}