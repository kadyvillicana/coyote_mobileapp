import CarProviderModel from "../models/provider";

export default (realmInstance) => {
    return {
        saveProvider: (data) => {
            return new Promise((resolve, reject) => {
                try {
                    realmInstance.write(() => {
                        const created = realmInstance.create(CarProviderModel.getCarProviderModelName(), data, true);
                        resolve(created);
                    })
                    resolve(true);
                } catch(e){
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
                    const providerSuggestions = Array.from(realmInstance.objects(CarProviderModel.getCarProviderModelName()).filtered(`name CONTAINS[c] "${query}"`));
                    resolve(providerSuggestions);
                } catch(e) {
                    reject(e)
                }
            });
        },

        providerCars: (id) => {
            return new Promise((resolve, reject) => {
                try {
                    // if(!id){
                    //     resolve(null)
                    // }
                    const provider = realmInstance.objects(CarProviderModel.getCarProviderModelName()).filtered('id = "8498"')[0];
                    console.log(Array.from(provider.cars)); // [Dog { name: 'Fido', breed: 'Labrador', owner: Person { name: 'John', age: 30 } }, Dog { name: 'Spot', breed: 'Dalmatian', owner: Person { name: 'John', age: 30 } }]
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
}