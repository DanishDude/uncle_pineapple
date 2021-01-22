export function emailFormat(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(String(email).toLowerCase());
}

// function maxLength(max, value) {
//     return value && value.length > max ? `Maximum ${max} caractères` : undefined;
// }

// export function maxLength22(value) {
//     return maxLength(22, value);
// }

// export function required(value) {
//     return value ? undefined : 'Obligatoire';
// }
