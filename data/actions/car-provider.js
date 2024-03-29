import CarProviderModel from "../models/provider";
import _ from 'lodash';

export default (realmInstance) => {
    return {
        saveProvider: (data) => {
            return new Promise((resolve, reject) => {
                try {
                    realmInstance.write(() => {
                        const created = realmInstance.create(CarProviderModel.getModelName(), data, true);
                        resolve(created);
                    })
                    resolve(true);
                } catch(e){
                    reject(e);
                }
            }); 
        },

        updateProviderById: (provider) => {
            return new Promise((resolve, reject) => {
                try {
                    realmInstance.write(() => {
                        const updatedProvider = realmInstance.create(CarProviderModel.getModelName(), provider, 'modified');
                        resolve(updatedProvider);
                    })
                } catch(e) {
                    reject(e);
                }
            });
        },

        providerSuggestions: (query) => {
            return new Promise((resolve, reject) => {
                try {
                    if(!query){
                        resolve([]);
                    }
                    const providerSuggestions = Array.from(realmInstance.objects(CarProviderModel.getModelName()).filtered(`name CONTAINS[c] "${query}"`));
                    resolve(providerSuggestions);
                } catch(e) {
                    reject(e)
                }
            });
        },

        allProviders: () => {
            return new Promise((resolve, reject) => {
                try {
                    const providers = Array.from(realmInstance.objects(CarProviderModel.getModelName()))
                    resolve(providers)
                } catch(e) {
                    reject(e)
                }
            })
        },

        carsByProviderId: (id) => {
            return new Promise((resolve, reject) => {
                try {
                    if(!id){
                        resolve([]);
                        return;
                    }
                    const provider = realmInstance.objects(CarProviderModel.getModelName()).filtered('id = $0', id)[0];
                    const cars = _.orderBy(Array.from(provider.cars), ['purchaseDate'], ['desc'])
                    resolve({provider, cars});
                } catch(e) {
                    reject(e)
                }
            })
        }
    }
}