import { useState } from 'react';
import { useTheme } from '../../hooks/use-theme';

import { Footer } from '../../layouts/footer';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddUser = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        passsword: '',
        role: '',
        nama_lengkap: '',
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
                'http://localhost:9000/api/v1/users',
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
                <h1 className='title'>Add User</h1>
            </div>
            <div className='card'>
                <div className='card-body p-0'>
                    <form action='' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label
                                htmlFor='username'
                                className='mb-2 block font-medium text-white'
                            >
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
                                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='password'
                                className='mb-2 block font-medium text-white'
                            >
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
                                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='tgl_akhir_project'
                                className='mb-2 block font-medium text-white'
                            >
                                Role
                            </label>
                            <select
                                name='role'
                                id='role'
                                value={formData.role}
                                onChange={handleChange}
                                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
                            >
                                <option value=''>Pilih</option>
                                <option value='peserta'>Peserta</option>
                                <option value='pendamping_lapangan'>Pendamping Lapangan</option>
                                <option value='pendamping_kampus'>Pendamping Kampus</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='nama_lengkap'
                                className='mb-2 block font-medium text-white'
                            >
                                Nama Lengkap
                            </label>
                            <input
                                type='text'
                                id='nama_lengkap'
                                name='nama_lengkap'
                                placeholder='nama_lengkap'
                                value={formData.nama_lengkap}
                                onChange={handleChange}
                                required
                                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
                            />
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
            <Footer />
        </div>
    );
};

export default AddUser;
