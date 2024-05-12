
const BASE_URL = process.env.ENDERECO_BACK_END;

export async function apiNoBody (url, params = {}) {
    
    let response = await fetch(BASE_URL + url, params);

    if (!response.ok){
        let errorMessage = JSON.stringify(json) || response.status;
        throw new Error(errorMessage);
    }

    return response;
}