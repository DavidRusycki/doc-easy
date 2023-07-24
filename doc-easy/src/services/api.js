
const BASE_URL = process.env.ENDERECO_BACK_END;

export async function api (url, params = {}) {
    
    let response = await fetch(BASE_URL + url, params);
    let json = await response.json() || {};

    if (!response.ok){
        let errorMessage = JSON.stringify(json) || response.status;
        throw new Error(errorMessage);
    }

    return [json, response];
}