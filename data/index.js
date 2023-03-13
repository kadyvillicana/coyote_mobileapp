import CarSchema from './models/car';
import OutGoingSchema from './models/outgoing';
import PaymentSchema from './models/payment';
import CarProviderSchema from './models/provider';

import CarActions from './actions/car';
import CarProviderActions from './actions/car-provider';

import Realm from 'realm';

const realmInstance = new Realm({
    schema: [OutGoingSchema, CarSchema, PaymentSchema, CarProviderSchema],
    schemaVersion: 25,
    migration: (oldRealm, newRealm) => {
        if(oldRealm.schemaVersion < 1) {
            const oldObjects = oldRealm.objects('Car');
            const newObjects = newRealm.objects('Car');

            // loop through all objects and set the name property in the new schema
            for (let i = 0; i < oldObjects.length; i++) {
                newObjects[i].payments = [];
                newObjects[i].carProvider = null;
                newObjects[i].creditPurchasePayments = [];
            }
        }
    }
});


console.log("Realm is located at: " + realmInstance.path);

export const getRealmInstance = () => realmInstance;

export const carActions = CarActions(realmInstance);

export const carProviderActions = CarProviderActions(realmInstance);