import { useState } from 'react';
import { useTheme } from '../../hooks/use-theme';

import { Footer } from '../../layouts/footer';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddProject = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_project: '',
    tgl_mulai_project: '',
    tgl_akhir_project: '',
    status_project: 'on going',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

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
        'http://localhost:9000/api/v1/projects',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        <h1 className='title'>Add Projects</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='nama_project'
                className='mb-2 block font-medium text-white'
              >
                Nama Project
              </label>
              <input
                type='text'
                id='nama_project'
                name='nama_project'
                placeholder='Nama Project'
                value={formData.nama_project}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_mulai_project'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Mulai
              </label>
              <input
                type='date'
                id='tgl_mulai_project'
                name='tgl_mulai_project'
                value={formData.tgl_mulai_project}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_project'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Selesai
              </label>
              <input
                type='date'
                id='tgl_akhir_project'
                name='tgl_akhir_project'
                value={formData.tgl_akhir_project}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_project'
                className='mb-2 block font-medium text-white'
              >
                Status
              </label>
              <select
                name='status_project'
                id='status_project'
                value={formData.status_project}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              >
                <option value='on going'>On Going</option>
                <option value='done'>Done</option>
              </select>
            </div>
            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            >
              {loading ? 'Submitting...' : 'Tambah Projects'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProject;
