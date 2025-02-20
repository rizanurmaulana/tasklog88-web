import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/login`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.data.role);

      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: 'success',
        title: 'Login berhasil!!!',
      });

      if (res.data.data.role === 'peserta') navigate('/peserta/dashboard');
      else if (res.data.data.role === 'pendamping_lapangan')
        navigate('/pendamping_lapangan/dashboard');
      else if (res.data.data.role === 'pendamping_kampus')
        navigate('/pendamping_kampus/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');

      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: err.response?.data?.message || 'Login gagal! Coba lagi.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='card w-96'>
        <div className='card-body p-0'>
          <h2 className='mb-4 text-center text-2xl font-semibold text-slate-800'>
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='mb-2 block font-medium text-slate-800'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
                className='mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='mb-2 block font-medium text-slate-800'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='********'
                className='mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              type='submit'
              className='mt-4 w-full rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
