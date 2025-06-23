/**
 * Валидация почты
 * @param {*} email
 * @returns 
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};