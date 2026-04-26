import {API_BASE} from "../config.js";

async function readErrorMessage(response) {
    const text = await response.text();
    if(text) return response.statusText || `HTTP ${response.status}`

    try{
        const json = JSON.parse(text);
        if(typeof(json) === 'string') return json;
        if(json.message) return json.message;
        if(json.title) return json.title;

        if(json.errors && typeof json.errors === 'object') {
            const parts = []
            for (const [, msgs] of Object.entries(json.errors)) {
                if(Array.isArray(msgs)) parts.push(...msgs);
                else parts.push(String(msgs));
            }
            if(parts.length) return parts.join(' ');
        }
        return text
    }
    catch{
        return  text
    }
}

export async function getAllProducts(){
    const res = await fetch(`${API_BASE}/api/products`);
    if(!res.ok) throw new Error(await readErrorMessage(res));
    return res.json();
}

export async function getProductById(id){
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if(!res.ok) throw new Error(await readErrorMessage(res));
    return res.json();
}

export async function createProduct(formData){
    const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        body: formData,
    })
    if(!res.ok) throw new Error(await readErrorMessage(res));
    return res.json();
}

export async function updateProduct(id, formData){
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'PUT',
        body: formData,
    })
    if(!res.ok) throw new Error(await readErrorMessage(res));
    return res.json();
}

export async function deleteProduct(id){
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
    })
    if(!res.ok && res.status !== 204) throw new Error(await readErrorMessage(res));
}