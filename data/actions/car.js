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
        });
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
        });
    },

    getCarById: id => {
        return realmInstance.objects(CarModel.getCarModelName()).filtered('id = $0', id)[0];
    },

    getAvailableCars: () => {
        return new Promise((resolve, reject) => {
            try {
                const cars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                .filtered('status = $0 SORT(purchaseDate DESC)', 'available'));

                if(!cars){
                    resolve([]);
                }

                resolve(cars);
            } catch(e) {
                reject(e)
            }
        });
    },

    getSoldCreditCars: () => {
        return new Promise((resolve, reject) => {
            try {
                const cars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                .filtered('status = $0 SORT(purchaseDate DESC)', 'soldCredit'));

                if(!cars){
                    resolve([]);
                }

                resolve(cars);
            } catch(e) {
                reject(e)
            }
        });
    },

    getAllSoldCars: () => {
        return realmInstance.objects(CarModel.getCarModelName())
            .filtered('status != $0 SORT(soldDate DESC)', 'available');
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
        });
    },

    getCarsByPeriod: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            try{
                if(!startDate || !endDate){
                    resolve([]);
                }
                const allCars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                .filtered('status != $0 AND soldDate >= $1 AND soldDate <= $2 SORT(soldDate DESC)', 'available', new Date(startDate), new Date(endDate)));
                resolve(allCars);
            }catch(e) {
                reject(e)
            }
        });
    },

    getSoldCreditClients: () => {
        return new Promise((resolve, reject) => {
            try {
                const cars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                    .filtered('status = $0 AND clientName != "" SORT(soldDate DESC)', 'soldCredit'));

                if(!cars){
                    resolve([]);
                }
                const clients = _.groupBy(cars, 'clientName');
                resolve(clients);
            } catch(e) {
                reject(e)
            }
        });
    },

    getSoldCreditClientsWithDebt: () => {
        return new Promise((resolve, reject) => {
            try {
                const cars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                    .filtered('status = $0 AND clientName != "" SORT(soldDate DESC)', 'soldCredit'));

                if(!cars){
                    resolve([]);
                }

                const result = cars.filter(car => car.carCreditDebt > 0)

                const clients = _.groupBy(result, 'clientName');
                resolve(clients);
            } catch(e) {
                reject(e)
            }
        });
    },

    getCarsByClientName: (clientName) => {
        return new Promise((resolve, reject) => {
            try {
                const cars = Array.from(realmInstance.objects(CarModel.getCarModelName())
                    .filtered('status = $0 AND clientName = $1 SORT(soldDate DESC)', 'soldCredit', clientName));
                if(!cars){
                    resolve([]);
                }
                resolve(cars);
            } catch(e) {
                reject(e)
            }
        });
    },
  }
}