export const storeUser = {
  set(token) {
    localStorage.setItem("token", token);
  },
  get() {
    return localStorage.getItem("token");
  },
  remove() {
    localStorage.removeItem("token");
  },
};
