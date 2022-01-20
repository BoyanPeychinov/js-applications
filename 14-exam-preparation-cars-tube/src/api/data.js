import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllCars() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function getCarById(carId) {
    return api.get('/data/cars/' + carId);
}

export async function getCarsByUserId(userId) {
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function carDetails(carId) {
    return api.get('/data/cars/' + carId);
}

export async function createCar(data) {
    return api.post('/data/cars', data);
}

export async function editCar(carId, data) {
    return api.put('/data/cars/' + carId, data);
}

export async function deleteCar(carId) {
    return api.del('/data/cars/' + carId);
}

export async function searchCars(query) {
    return api.get('/data/cars?where=year%3D' + `${encodeURIComponent(query)}`);
}