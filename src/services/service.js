import { requestFun } from "./clientApi"

/**
 * ЗАпрос Авторизации
 * @param {*} username - имя пользователя
 * @param {*} password  - пароль
 * @returns {}
 */
export const requestLogin = async (username, password) => {
    return requestFun('/Ext/LogOnExt', {Username: username, Password: password});
}

/**
 * Запрос списка ЛС
 * @param {*} token - токен пользователя
 * @returns subs
 */
export const requestSubs = async (token) => {
    return requestFun('/Ext/GetSubscrsExt', {ExtToken: token})
}

/**
 *
 * @param {*} token - Токен
 * @param {*} periodBegin - начальный период
 * @param {*} perionEnd - конечный период
 * @returns
 */
export const requestCharges = async (token, periodBegin, perionEnd) => {
    return requestFun('/Ext/GetChargesExt', {ExtToken: token, PeriodBegin: periodBegin, PeriodEnd: perionEnd})
}

/**
 *
 * @param {*} token Токен
 * @param {*} subscrId - выбранный ID лицевого счета
 * @param {*} periodBegin - начальный период
 * @param {*} perionEnd  - конечный периолд
 * @returns
 */
export const requestPayments = async (token, subscrId, periodBegin, perionEnd) => {
    return requestFun('/Ext/GetPaymentsExt', {ExtToken: token, subscrId: subscrId, PeriodBegin: periodBegin, PeriodEnd: perionEnd})
}

