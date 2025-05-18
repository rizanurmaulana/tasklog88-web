import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddLogPengerjaan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    catatan: '',
    jenis_catatan: '',
    tgl_pengerjaan: '',
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
        `${API_BASE_URL}/api/v1/log_pengerjaans/${id}`,
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
        <h1 className='title'>Add Log Pengerjaan</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='catatan' className='mb-2 block font-medium'>
                Catatan
              </label>
              <input
                type='text'
                id='catatan'
                name='catatan'
                placeholder='Catatan'
                value={formData.catatan}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='jenis_catatan' className='mb-2 block font-medium'>
                Jenis Catatan
              </label>
              <select
                name='jenis_catatan'
                id='jenis_catatan'
                value={formData.jenis_catatan}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option disabled value=''>
                  -- Pilih Jenis Catatan --
                </option>
                <option value='revisi'>Revisi</option>
                <option value='acc'>Accept</option>
                <option value='pending'>Pending</option>
              </select>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_pengerjaan'
                className='mb-2 block font-medium'
              >
                Tanggal Pengerjaan
              </label>
              <input
                type='date'
                id='tgl_pengerjaan'
                name='tgl_pengerjaan'
                placeholder='Tanggal Pengerjaan'
                value={formData.tgl_pengerjaan}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            >
              {loading ? 'Submitting...' : 'Tambah Log'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLogPengerjaan;
