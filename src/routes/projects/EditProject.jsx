import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    nama_project: '',
    tgl_mulai_project: '',
    tgl_akhir_project: '',
    status_project: 'on going',
  });

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const projectData = res.data.data.find((p) => p.id_project == id);
        setFormData({
          nama_project: projectData.nama_project || '',
          tgl_mulai_project: projectData.tgl_mulai_project || '',
          tgl_akhir_project: projectData.tgl_akhir_project || '',
          status_project: projectData.status_project || 'on going',
        });
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, token]);

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
        `${API_BASE_URL}/api/v1/projects/${id}`,
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
        <h1 className='title'>Edit Project</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nama_project' className='mb-2 block font-medium'>
                Nama Project
              </label>
              <input
                type='text'
                id='nama_project'
                name='nama_project'
                placeholder='Nama Project'
                value={formData.nama_project}
                onChange={handleChange}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_mulai_project'
                className='mb-2 block font-medium'
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
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tgl_akhir_project'
                className='mb-2 block font-medium'
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
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='status_project'
                className='mb-2 block font-medium'
              >
                Status
              </label>
              <select
                name='status_project'
                id='status_project'
                value={formData.status_project}
                onChange={handleChange}
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
              {loading ? 'Editing...' : 'Edit Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
