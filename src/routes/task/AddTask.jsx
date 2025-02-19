import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/use-theme';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_task: '',
    id_project: '',
    id_user: '',
    tgl_mulai_task: '',
    tgl_akhir_task: '',
    status_task: 'on going',
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.project.data); // Pastikan API mereturn data array
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Gagal mengambil data pengguna.');
    }
  }, [token]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.project.data); // Pastikan API mereturn data array
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
      const res = await axios.put(
        `http://localhost:9000/api/v1/tasks/edit/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMessage('Task successfully created!');
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Failed to create task');
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
              <label
                htmlFor='nama_task'
                className='mb-2 block font-medium text-white'
              >
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
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='id_project'
                className='mb-2 block font-medium text-white'
              >
                Nama Project
              </label>
              <select
                name='id_project'
                id='id_project'
                value={formData.nama_project}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    id_project: e.target.value,
                  }))
                }
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              >
                <option disabled>-- Pilih Project --</option>
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
              <label
                htmlFor='id_user'
                className='mb-2 block font-medium text-white'
              >
                Nama Lengkap
              </label>
              <select
                name='id_user'
                id='id_user'
                value={formData.nama_lengkap}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    id_user: e.target.value,
                  }))
                }
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              >
                <option disabled>-- Pilih User --</option>
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
              <label
                htmlFor='tgl_mulai_task'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Mulai
              </label>
              <input
                type='date'
                id='tgl_mulai_task'
                name='tgl_mulai_task'
                value={formData.tgl_mulai_task}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_task'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Selesai
              </label>
              <input
                type='date'
                id='tgl_akhir_task'
                name='tgl_akhir_task'
                value={formData.tgl_akhir_task}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='status_task'
                className='mb-2 block font-medium text-white'
              >
                Status
              </label>
              <select
                name='status_task'
                id='status_task'
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
              {loading ? 'Submitting...' : 'Tambah Tugas'}
            </button>
            {message && <p className='mt-2 text-center'>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
