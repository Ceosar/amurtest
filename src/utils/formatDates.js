/**
 * Форманирование даты из ГГГГММДД в ДД.ММ.ГГГГ
 * @param {*} dateString - `ГГГГММДД`
 * @returns `ДД.ММ.ГГГГ`
 */
export const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${day}.${month}.${year}`;
};