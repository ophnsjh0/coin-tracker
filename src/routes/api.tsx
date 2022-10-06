const BASE_URL = 'https://api.coinpaprika.com/v1';
const BASE_URL2 = 'https://ohlcv-api.nomadcoders.workers.dev?coinId=';

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}


export function fetchCoinHistory(coinId: string) {
    // const endTime = Math.floor(Date.now() / 1000);
    // const startTime = endTime * 60 * 60 * 12 * 7;
    // return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startTime}&end=${endTime}`).then((response) => response.json());
    return fetch(`${BASE_URL2}${coinId}`).then((response) => response.json());
}