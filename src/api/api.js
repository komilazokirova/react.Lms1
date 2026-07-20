import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    timeout: 5000,
});

// ---- Request interceptor: har bir so'rovga access tokenni qo'shadi ----
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ---- 401 kelganda bir vaqtda bir nechta refresh so'rovi ketmasligi uchun ----
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// ---- Response interceptor: 401 kelsa, refresh token orqali yangi access token oladi ----
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Tarmoq xatosi yoki response umuman bo'lmasa
        if (!error.response) {
            return Promise.reject(error);
        }

        const status = error.response.status;

        // Login yoki refresh so'rovining o'zi 401 qaytarsa-qayta urinmaymiz
        const isAuthRoute =
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/refresh-token");

        if (status === 401 && !originalRequest._retry && !isAuthRoute) {
            if (isRefreshing) {
                // Boshqa so'rov allaqachon refresh qilyapti — navbatda kutamiz
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                isRefreshing = false;
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }

            try {
                const { data } = await axios.post(
                    "https://api.escuelajs.co/api/v1/auth/refresh-token",
                    { refreshToken }
                );

                localStorage.setItem("token", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);

                api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

                processQueue(null, data.access_token);

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                // Foydalanuvchini login sahifasiga yo'naltirish shu yerda qilinadi
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);