import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddTask = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    nama_task: '',
    id_project: '',
    id_user: '',
    tgl_mulai_task: '',
    tgl_akhir_task: '',
    status_task: 'on going',
  });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Gagal mengambil data pengguna.');
    }
  }, [token]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Gagal mengambil data proyek.');
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, [fetchUsers, fetchProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validasi manual
    if (
      !formData.nama_task ||
      !formData.id_project ||
      !formData.id_user ||
      !formData.tgl_mulai_task ||
      !formData.tgl_akhir_task
    ) {
      setError('Semua field wajib diisi.');
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Semua field wajib diisi!',
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data berhasil dimasukkan!',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Gagal membuat tugas');
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal membuat tugas',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Add Task</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nama_task' className='mb-2 block font-medium'>
                Nama Task
              </label>
              <input
                type='text'
                id='nama_task'
                name='nama_task'
                placeholder='Nama Task'
                value={formData.nama_task}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='id_project' className='mb-2 block font-medium'>
                Nama Project
              </label>
              <select
                name='id_project'
                id='id_project'
                value={formData.id_project}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option value='' disabled>
                  -- Pilih Project --
                </option>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <option key={project.id_project} value={project.id_project}>
                      {project.nama_project}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor='id_user' className='mb-2 block font-medium'>
                Nama Lengkap
              </label>
              <select
                name='id_user'
                id='id_user'
                value={formData.id_user}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option value='' disabled>
                  -- Pilih User --
                </option>
                {users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.id_user} value={user.id_user}>
                      {user.nama_lengkap}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor='tgl_mulai_task' className='mb-2 block font-medium'>
                Tanggal Mulai
              </label>
              <input
                type='date'
                id='tgl_mulai_task'
                name='tgl_mulai_task'
                value={formData.tgl_mulai_task}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='tgl_akhir_task' className='mb-2 block font-medium'>
                Tanggal Selesai
              </label>
              <input
                type='date'
                id='tgl_akhir_task'
                name='tgl_akhir_task'
                value={formData.tgl_akhir_task}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='status_task' className='mb-2 block font-medium'>
                Status
              </label>
              <select
                name='status_task'
                id='status_task'
                value={formData.status_task}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option value='on going'>On Going</option>
                <option value='done'>Done</option>
              </select>
            </div>
            <button
              type='submit'
              disabled={loading}
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600 transition'
            >
              {loading ? 'Submitting...' : 'Tambah Tugas'}
            </button>
            {error && <p className='mt-2 text-red-500'>{error}</p>}
            {message && <p className='mt-2 text-green-500'>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
