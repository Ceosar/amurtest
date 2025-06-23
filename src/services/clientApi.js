import axios from 'axios';

/**
 * Базовый экземпляр запросов
 */
const clientApi= axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/** Перехватчик запросов для добавления токена в заголовок */
clientApi.interceptors.request.use(config => {
    const token = localStorage.getItem('extToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/**
 * Функция для обращения к API
 * @param {*} url - эндпоинт
 * @param {*} payload - тело
 * @param {*} method -метод
 * @returns ответ сервера
 */
export const requestFun = async (url, payload, method = 'post') => {
    try {
        const response = await clientApi({
            method,
            url,
            data: payload
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message || "Ошибка сети";
        console.warn(errorMessage);
    }
};

export default clientApi;