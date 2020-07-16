function Storage(storage) {
  return {
    get length() {
      return storage.length;
    },
    key(index) {
      return storage.key(index);
    },
    getItem(key) {
      let valueString = storage.getItem(key);
      if (!valueString) return null;
      try {
        return JSON.parse(valueString);
      } catch (e) {
        return null;
      }
    },
    setItem(key, data) {
      if (data === undefined) {
        // => null
        data = null;
      }
      storage.setItem(key, JSON.stringify(data));
    },
    removeItem(key) {
      return storage.removeItem(key);
    },
    clear() {
      storage.clear();
    }
  };
}

export default Storage(localStorage);
// export default Storage(sessionStorage);
