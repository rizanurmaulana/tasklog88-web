import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPengerjaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    id_task: '',
    nama_task: '',
    file_github: '',
    file_ss: '',
    catatan: '',
    jenis_catatan: '',
    tgl_pengerjaan: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.data || !res.data.data) {
          setError('Task tidak ditemukan');
          return;
        }

        const pengerjaanData = Array.isArray(res.data.data)
          ? res.data.data.find((p) => String(p.id_task) === String(id))
          : res.data.data;

        if (!pengerjaanData) {
          setError('Task tidak ditemukan');
          return;
        }

        setFormData({
          id_task: pengerjaanData.id_task || '',
          nama_task: pengerjaanData.nama_task || '',
          file_github: null,
          file_ss: null,
          status_task: pengerjaanData.status_task || '',
          status_task: pengerjaanData.status_task || '',
          catatan: pengerjaanData.catatan || '',
          jenis_catatan: pengerjaanData.jenis_catatan || '',
          tgl_pengerjaan: pengerjaanData.tgl_pengerjaan || '',
        });
      } catch (err) {
        setError('Gagal mengambil data pengerjaan');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('id_task', formData.id_task);

    if (formData.file_github) {
      formDataToSend.append(
        'file_github',
        formData.file_github,
        formData.file_github.name.replace(/\\/g, '/'),
      );
    }
    if (formData.file_ss) {
      formDataToSend.append(
        'file_ss',
        formData.file_ss,
        formData.file_ss.name.replace(/\\/g, '/'),
      );
    }
    formDataToSend.append('catatan', formData.catatan);
    formDataToSend.append('jenis_catatan', formData.jenis_catatan);
    formDataToSend.append('tgl_pengerjaan', formData.tgl_pengerjaan);

    try {
      await axios.post(
        `http://localhost:9000/api/v1/pengerjaans`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengerjaan Berhasil Disimpan!',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal Menyimpan Data');
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal Menyimpan Data',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Add Pengerjaan</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          {error && <p className='text-red-500'>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nama_task' className='mb-2 block font-medium'>
                Nama Task
              </label>
              <input
                type='text'
                id='nama_task'
                name='nama_task'
                value={formData.nama_task}
                disabled
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='file_github' className='mb-2 block font-medium'>
                File Github
              </label>
              <input
                type='file'
                id='file_github'
                name='file_github'
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='file_ss' className='mb-2 block font-medium'>
                File Screenshot
              </label>
              <input
                type='file'
                id='file_ss'
                name='file_ss'
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='catatan' className='mb-2 block font-medium'>
                Catatan
              </label>
              <input
                type='text'
                id='catatan'
                name='catatan'
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
              <input
                type='text'
                id='jenis_catatan'
                name='jenis_catatan'
                value={formData.jenis_catatan}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
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
                value={formData.tgl_pengerjaan}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>

            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Simpan Pengerjaan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPengerjaan;
