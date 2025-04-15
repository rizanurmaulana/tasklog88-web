import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: '',
    passsword: '',
    role: '',
    nama_lengkap: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/users`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data berhasil dimasukkan!',
        timer: 2000,
        showConfirmButton: false,
      });

      console.log(res.data);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project');

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal membuat proyek',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Add User</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nama_lengkap' className='mb-2 block font-medium'>
                Nama Lengkap
              </label>
              <input
                type='text'
                id='nama_lengkap'
                name='nama_lengkap'
                placeholder='Nama Lengkap'
                value={formData.nama_lengkap}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='username' className='mb-2 block font-medium'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='mb-2 block font-medium'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_project'
                className='mb-2 block font-medium'
              >
                Role
              </label>
              <select
                name='role'
                id='role'
                value={formData.role}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option disabled value=''>-- Pilih Role --</option>
                <option value='peserta'>Peserta</option>
                <option value='pendamping_lapangan'>Pendamping Lapangan</option>
                <option value='pendamping_kampus'>Pendamping Kampus</option>
              </select>
            </div>
            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            >
              {loading ? 'Submitting...' : 'Tambah User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
