import axios from "axios";

const apiIP = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiIP,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authJson = localStorage.getItem("auth");
    const parsedAuth = authJson ? JSON.parse(authJson) : null;
    const token = parsedAuth?.accessToken;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 and refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const authJson = localStorage.getItem("auth");
        const parsedAuth = authJson ? JSON.parse(authJson) : {};
        const refreshToken = parsedAuth?.refreshToken;

        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(`${apiIP}auth/refresh`, { refreshToken });

        parsedAuth.accessToken = res.data.accessToken;
        parsedAuth.refreshToken = res.data.refreshToken;

        localStorage.setItem("auth", JSON.stringify(parsedAuth));

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        processQueue(null, res.data.accessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
