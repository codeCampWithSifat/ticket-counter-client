import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
