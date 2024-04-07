const BASE_URL = 'http://localhost:3000/';
const API_URL = `${BASE_URL}api/`;
const AVATAR_URL = `${BASE_URL}uploads/avatar/`;

const QR_GENERATE = (amount, addInfo, accountName) => `https://img.vietqr.io/image/MB-1601061999-print.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`
export { API_URL, BASE_URL , AVATAR_URL, QR_GENERATE };
