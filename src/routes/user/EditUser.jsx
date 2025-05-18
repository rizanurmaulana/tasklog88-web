import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: '',
    role: '',
    nama_lengkap: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.data) {
          setFormData({
            username: res.data.data.username || '',
            role: res.data.data.role || '',
            nama_lengkap: res.data.data.nama_lengkap || '',
          });
        } else {
          setError('User data not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal mengambil data user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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
      await axios.put(`${API_BASE_URL}/api/v1/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'User berhasil diperbarui!',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui user');
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal memperbarui user',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      Swal.fire('Gagal!', 'Password tidak boleh kosong', 'error');
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/users/password/${id}`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Password berhasil diubah!',
        timer: 2000,
        showConfirmButton: false,
      });

      setIsModalOpen(false);
      setNewPassword('');
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Gagal mengganti password',
      });
    }
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='title'>Edit User</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='card'>
        <div className='card-body p-0'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='mb-2 block font-medium'>Username</label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                className='w-full border px-3 py-2 rounded-lg outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='mb-2 block font-medium'>Role</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='w-full border px-3 py-2 rounded-lg outline-none'
              >
                <option value='' disabled>-- Pilih --</option>
                <option value='peserta'>Peserta</option>
                <option value='pendamping_lapangan'>Pendamping Lapangan</option>
                <option value='pendamping_kampus'>Pendamping Kampus</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='mb-2 block font-medium'>Nama Lengkap</label>
              <input
                type='text'
                name='nama_lengkap'
                value={formData.nama_lengkap}
                onChange={handleChange}
                required
                className='w-full border px-3 py-2 rounded-lg outline-none'
              />
            </div>

            <div className='flex gap-2'>
              <button type='submit' className='bg-blue-500 text-white px-3 py-2 rounded-lg' disabled={loading}>
                {loading ? 'Memproses...' : 'Simpan'}
              </button>
              <button
                type='button'
                className='bg-orange-500 text-white px-3 py-2 rounded-lg'
                onClick={() => setIsModalOpen(true)}
              >
                Ganti Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-lg w-96'>
            <h2 className='text-xl mb-4'>Ganti Password</h2>
            <input
              type='password'
              placeholder='Masukkan password baru'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full border px-3 py-2 rounded-lg outline-none mb-3'
            />
            <div className='flex justify-end gap-2'>
              <button className='bg-red-500 text-white px-3 py-2 rounded-lg' onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={handleChangePassword}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
