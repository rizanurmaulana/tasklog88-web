import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      localStorage.setItem('token', res.data.token); // Simpan token
      localStorage.setItem('role', res.data.data.role); // Simpan role

      // Redirect berdasarkan role
      if (res.data.data.role === 'peserta') navigate('/peserta/dashboard');
      else if (res.data.data.role === 'pendamping_lapangan')
        navigate('/pendamping_lapangan/dashboard');
      else if (res.data.data.role === 'pendamping_kampus')
        navigate('/pendamping_kampus/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 transition-colors'>
      <div className='card w-96'>
        <div className='card-body p-0'>
          <h2 className='mb-4 text-center text-2xl font-semibold text-white'>
            Login
          </h2>
          {error && (
            <p className='w-full rounded-lg border border-red-800 bg-red-800/30 px-3 py-2 text-center text-red-500'>
              {error}
            </p>
          )}
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='mb-2 block font-medium text-white'
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
                className='mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='mb-2 block font-medium text-white'
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
                className='mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
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
