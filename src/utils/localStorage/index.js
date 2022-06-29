export const getLocalStorage = (key) => {
    const getLocalStorage = localStorage.getItem(key);

    const newLocalStorage = getLocalStorage !== null ? JSON.parse(getLocalStorage) : null;

    return newLocalStorage;
}

export const createLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const updateLocalStorage = (key, newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
}

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}