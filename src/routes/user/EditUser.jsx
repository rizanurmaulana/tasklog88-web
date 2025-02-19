import { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/use-theme';

import { Footer } from '../../layouts/footer';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SquarePlus } from 'lucide-react';

const AddUser = () => {
    const { id } = useParams();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        nama_project: '',
        tgl_mulai_project: '',
        tgl_akhir_project: '',
        status_project: 'on going',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:9000/api/v1/users/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                const userData = res.data.data;
                console.log(res.data.data);
                setFormData({
                    username: userData.username || '',
                    role: userData.role || '',
                    nama_lengkap: userData.nama_lengkap || '',
                });
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Failed to load project data');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
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
                `http://localhost:9000/api/v1/users/${id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
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


    // return (
    //     <div className='flex flex-col gap-y-4'>
    //         <div className='flex items-center justify-between'>
    //             <h1 className='title'>Edit User</h1>
    //         </div>
    //         <div className='card'>
    //             <div className='card-body p-0'>
    //                 <form onSubmit={handleSubmit}>
    //                     <div className='mb-4'>
    //                         <label
    //                             htmlFor='nama_project'
    //                             className='mb-2 block font-medium text-white'
    //                         >
    //                             Nama Project
    //                         </label>
    //                         <input
    //                             type='text'
    //                             id='nama_project'
    //                             name='nama_project'
    //                             placeholder='Nama Project'
    //                             value={formData.nama_project}
    //                             onChange={handleChange}
    //                             className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
    //                         />
    //                     </div>
    //                     <div className='mb-4'>
    //                         <label
    //                             htmlFor='tgl_mulai_project'
    //                             className='mb-2 block font-medium text-white'
    //                         >
    //                             Tanggal Mulai
    //                         </label>
    //                         <input
    //                             type='date'
    //                             id='tgl_mulai_project'
    //                             name='tgl_mulai_project'
    //                             value={formData.tgl_mulai_project}
    //                             onChange={handleChange}
    //                             required
    //                             className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
    //                         />
    //                     </div>
    //                     <div className='mb-4'>
    //                         <label
    //                             htmlFor='tgl_akhir_project'
    //                             className='mb-2 block font-medium text-white'
    //                         >
    //                             Tanggal Selesai
    //                         </label>
    //                         <input
    //                             type='date'
    //                             id='tgl_akhir_project'
    //                             name='tgl_akhir_project'
    //                             value={formData.tgl_akhir_project}
    //                             onChange={handleChange}
    //                             required
    //                             className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
    //                         />
    //                     </div>
    //                     <div className='mb-4'>
    //                         <label
    //                             htmlFor='status_project'
    //                             className='mb-2 block font-medium text-white'
    //                         >
    //                             Status
    //                         </label>
    //                         <select
    //                             name='status_project'
    //                             id='status_project'
    //                             value={formData.status_project}
    //                             onChange={handleChange}
    //                             className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
    //                         >
    //                             <option value='on going'>On Going</option>
    //                             <option value='done'>Done</option>
    //                         </select>
    //                     </div>
    //                     <button
    //                         type='submit'
    //                         className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
    //                     >
    //                         {loading ? 'Editing...' : 'Edit Projek'}
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //         <Footer />
    //     </div>
    // );
    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='title'>Edit User</h1>
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
                        <div className='flex gap-2'>
                            <button
                                type='submit'
                                className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
                            >
                                {loading ? 'Submitting...' : 'Simpan'}
                            </button>
                            <Link
                                to='ubah'
                                className='rounded-lg bg-yellow-500 px-3 py-2 font-medium text-white'
                            >
                                Rubah Password
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddUser;
