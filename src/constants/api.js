export const mainUrl = 'http://localhost:5000/api/';

export const productTypes = `${mainUrl}producttypes`;

export const products = `${mainUrl}products`;

export function setHeaders(){
    return {
      'Content-Type': 'application/json',
    }
}