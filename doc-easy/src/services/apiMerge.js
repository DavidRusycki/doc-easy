
const BASE_URL_MERGE = process.env.ENDERECO_BACK_END_MERGE;

export async function apiMerge (url, params = {}) {
    
    let response = await fetch(BASE_URL_MERGE + url, params);
    let json = await response.json() || {};

    if (!response.ok){
        let errorMessage = JSON.stringify(json) || response.status;
        throw new Error(errorMessage);
    }

    return [json, response];
}