import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../useAuth/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const reqInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });


    const resInterceptor = instance.interceptors.response.use(
      (response) =>{
        return response;
      },
      async (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          await signOutUser();
          toast('You have been signed out.');
          navigate('/authLayout');
        }

        return Promise.reject(error);
      }
    );


    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user?.accessToken, navigate, signOutUser]);

  return instance;
};

export default useAxiosSecure;
