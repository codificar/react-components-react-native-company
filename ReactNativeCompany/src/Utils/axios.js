import * as constants from './constants';
import axios from 'axios';

export default class ProviderApi {

    static api;
    static newApi;

    constructor(BASE_URL) {
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });       
    }

    /**
     * Search cep and get the information
     * @param {string} zipCode
     */
    CepInformation(zipCode) {
        return this.api.post(constants.CEP_PROVIDER_INFO, { zipcode: zipCode });
    }

    /**
     * Search All IBGE estates
     */
    IbgeEstadoInfo() {
        return this.api.get(constants.ESTADO_INFO);
    }

    /**
      * Search All IBGE city by estade
     * @param {string} uf
     */
    IbgeCidadeInfo(uf) {
        return this.api.get(constants.ESTADO_INFO+"/"+uf+"/municipios");
    }

}


