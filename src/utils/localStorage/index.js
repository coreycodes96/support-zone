export const getLocalStorage = (key) => {
    const storage = localStorage.getItem(key);

    return storage;
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