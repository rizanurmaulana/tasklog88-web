import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPengerjaan = () => {
    const { id } = useParams(); // ID dari URL params
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token'); // Ambil token dari localStorage

    const [formData, setFormData] = useState({
        nama_task: '',
        file_github: '',
        file_ss: '',
        status_task: '',
    });

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                console.log('Fetching data for ID:', id);
                const res = await axios.get(
                    `http://localhost:9000/api/v1/tasks/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log('Response dari API:', res.data);

                if (!res.data || !res.data.data) {
                    console.error('Data tidak ditemukan dalam response API.');
                    setError('Task tidak ditemukan');
                    return;
                }

                const responseData = res.data.data;

                let pengerjaanData;
                if (Array.isArray(responseData)) {
                    pengerjaanData = responseData.find((p) => String(p.id_task) === String(id));
                } else {
                    pengerjaanData = responseData; // Jika responseData adalah objek langsung
                }

                if (!pengerjaanData) {
                    console.error('Task tidak ditemukan dalam response API.');
                    setError('Task tidak ditemukan');
                    return;
                }

                setFormData({
                    nama_task: pengerjaanData.nama_task || '',
                    file_github: pengerjaanData.file_github || '',
                    file_ss: pengerjaanData.file_ss || '',
                    status_task: pengerjaanData.status_task || '',
                });

            } catch (err) {
                console.error('Error fetching project:', err.response?.data || err);
                setError('Gagal mengambil data pengerjaan');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProject();
    }, [id, token]);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0], // Simpan file yang dipilih
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('nama_task', formData.nama_task);
        formDataToSend.append('file_github', formData.file_github);
        formDataToSend.append('file_ss', formData.file_ss);
        formDataToSend.append('status_task', formData.status_task);

        try {
            console.log('Mengirim data:', formDataToSend);
            const res = await axios.put(
                `http://localhost:9000/api/v1/pengerjaans`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
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
            console.error('Error updating project:', err.response?.data || err);
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
                                placeholder='Nama Task'
                                value={formData.nama_task}
                                disabled
                                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none bg-gray-200 cursor-not-allowed'
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="file_github" className="mb-2 block font-medium">
                                File Github
                            </label>
                            <input
                                type="file"
                                id="file_github"
                                name="file_github"
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="file_ss" className="mb-2 block font-medium">
                                File Screenshot
                            </label>
                            <input
                                type="file"
                                id="file_ss"
                                name="file_ss"
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
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
                                disabled
                                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none bg-gray-200 cursor-not-allowed'
                            >
                                <option value='on going'>On Going</option>
                                <option value='done'>Done</option>
                            </select>
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
