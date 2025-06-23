/**
 * Инициализация пользователя
 * @param {*} store 
 */
export const initAuth = (store) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        store.dispatch({ type: 'auth/setToken', payload: token });
    }
};
