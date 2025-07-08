import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPengerjaan = () => {
  const { id } = useParams();                   // id task dari URL
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');   // peserta | pendamping_lapangan | admin
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [formData, setFormData] = useState({
    id_task: '',
    nama_task: '',
    file_github: null,
    file_ss: null,
    catatan: '',
    jenis_catatan: '',
    tgl_pengerjaan: new Date().toISOString().split('T')[0], // hari ini
  });

  /* ======================================================
     Ambil detail task → preload form
  ====================================================== */
  useEffect(() => {
    const fetchTask = async () => {
      if (!token) { setError('Token tidak ditemukan'); return; }

      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const task = res.data?.data;
        if (!task) { setError('Task tidak ditemukan'); return; }

        setFormData(prev => ({
          ...prev,
          id_task:   task.id          ?? task.id_task ?? '',
          nama_task: task.nama_task   ?? '',
          // kolom khusus mentor / pendamping
          catatan:        role !== 'peserta' ? task.catatan        ?? '' : '',
          jenis_catatan:  role !== 'peserta' ? task.jenis_catatan  ?? '' : '',
        }));
      } catch (err) {
        setError('Gagal mengambil data task');
      } finally { setLoading(false); }
    };

    if (id) fetchTask();
  }, [id, token, role]);

  /* ======================================================
     Handle perubahan input
  ====================================================== */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file && file.size > 1024 * 1024) {       // > 1 MB
        Swal.fire({
          icon: 'error',
          title: 'Ukuran File Terlalu Besar!',
          text: 'Maksimal ukuran file adalah 1 MB.',
        });
        return;
      }
      setFormData(prev => ({ ...prev, [name]: file }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ======================================================
     Submit
  ====================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData();
    fd.append('id_task',        formData.id_task);
    fd.append('tgl_pengerjaan', formData.tgl_pengerjaan);

    if (formData.file_github) fd.append('file_github', formData.file_github);
    if (formData.file_ss)     fd.append('file_ss',     formData.file_ss);

    if (role !== 'peserta') {
      fd.append('catatan',       formData.catatan);
      fd.append('jenis_catatan', formData.jenis_catatan);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/v1/pengerjaans`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengerjaan berhasil disimpan.',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menyimpan data';
      setError(msg);
      Swal.fire({ icon: 'error', title: 'Gagal!', text: msg });
    } finally { setLoading(false); }
  };

  /* ======================================================
     Render
  ====================================================== */
  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='title'>Add Pengerjaan</h1>

      <div className='card'>
        <div className='card-body p-0'>
          {error && <p className='p-4 text-red-500 font-medium'>{error}</p>}

          <form onSubmit={handleSubmit} className='p-6 space-y-4'>

            {/* Nama task (read‑only) */}
            <div>
              <label className='mb-1 block font-medium'>Nama Task</label>
              <input
                type='text'
                name='nama_task'
                value={formData.nama_task}
                disabled
                className='w-full rounded-lg border border-slate-300 px-3 py-2'
              />
            </div>

            {/* File Github */}
            <div>
              <label className='mb-1 block font-medium'>File Github (max 1 MB)</label>
              <input
                type='file'
                name='file_github'
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2'
              />
            </div>

            {/* File Screenshot */}
            <div>
              <label className='mb-1 block font-medium'>File Screenshot (max 1 MB)</label>
              <input
                type='file'
                name='file_ss'
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2'
              />
            </div>

            {/* Catatan & jenis catatan → hanya mentor / pendamping */}
            {role !== 'peserta' && (
              <>
                <div>
                  <label className='mb-1 block font-medium'>Catatan</label>
                  <input
                    type='text'
                    name='catatan'
                    value={formData.catatan}
                    onChange={handleChange}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2'
                  />
                </div>

                <div>
                  <label className='mb-1 block font-medium'>Jenis Catatan</label>
                  <select
                    name='jenis_catatan'
                    value={formData.jenis_catatan}
                    onChange={handleChange}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2'
                  >
                    <option value='' disabled>Pilih Jenis Catatan</option>
                    <option value='acc'>Accept</option>
                    <option value='revisi'>Revisi</option>
                    <option value='pending'>Pending</option>
                  </select>
                </div>
              </>
            )}

            {/* Tanggal pengerjaan (read‑only) */}
            <div>
              <label className='mb-1 block font-medium'>Tanggal Pengerjaan</label>
              <input
                type='date'
                name='tgl_pengerjaan'
                value={formData.tgl_pengerjaan}
                disabled
                className='w-full rounded-lg border border-slate-300 px-3 py-2'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='rounded-lg bg-blue-500 px-4 py-2 font-medium text-white disabled:opacity-60'
            >
              {loading ? 'Loading…' : 'Simpan Pengerjaan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPengerjaan;
