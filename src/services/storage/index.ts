interface IStorage {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

const storage: IStorage = {
  get: (key: string) => {
    return (localStorage && localStorage.getItem(key)) || null;
  },
  set: (key: string, value: string) => {
    if (value) {
      localStorage.setItem(key, value);
    }
  },
  remove: (key) => {
    window.localStorage.removeItem(key);
  },
};

export default storage;
