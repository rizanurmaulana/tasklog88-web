import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditTask = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const taskData = res.data.data;
        console.log(taskData);
        setFormData({
          nama_task: taskData.nama_task || '',
          nama_project: taskData.nama_project || '',
          nama_lengkap: taskData.nama_lengkap || '',
          id_project: taskData.id_project || '',
          id_user: taskData.id_user || '',
          tgl_mulai_task: taskData.tgl_mulai_task || '',
          tgl_akhir_task: taskData.tgl_akhir_task || '',
          status_task: taskData.status_task || 'done',
        });
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id, token]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data); // Pastikan API mereturn data array
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
      setProjects(res.data.data); // Pastikan API mereturn data array
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
        `${API_BASE_URL}/api/v1/tasks/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Project berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false,
      });

      console.log(res.data);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.response?.data?.message || 'Gagal memperbarui project');
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal memperbarui project',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Edit Task</h1>
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
              <label htmlFor='nama_project' className='mb-2 block font-medium'>
                Nama Project
              </label>
              <select
                name='id_project'
                id='id_project'
                value={formData.id_project}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option disabled value=''>
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
              <label
                htmlFor='tasks-username'
                className='mb-2 block font-medium'
              >
                Nama Lengkap
              </label>
              <select
                name='id_user'
                id='id_user'
                value={formData.nama_lengkap}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option disabled value=''>
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
              <label
                htmlFor='tgl_mulai_task'
                className='mb-2 block font-medium'
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
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_task'
                className='mb-2 block font-medium'
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
                required
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              >
                <option value='on going'>On Going</option>
                <option value='done'>Done</option>
              </select>
            </div>
            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            >
              Edit Tugas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
