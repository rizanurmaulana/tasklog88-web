import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const LogPengerjaan = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [data, setData] = useState([]);
  const [namaTask, setNamaTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const token = localStorage.getItem('token');
  const id_user = localStorage.getItem('id_user');
  const role = localStorage.getItem('role'); // ✅ TAMBAH INI
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/pengerjaans/log/user/${id_user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const logData = res.data?.data;
        if (Array.isArray(logData)) {
          setData(logData);
        } else if (logData && typeof logData === 'object') {
          setData([logData]);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error mengambil data:', error);
        setError(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, id_user]);

  useEffect(() => {
    const fetchNamaTask = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNamaTask(res.data?.data?.nama_task || '');
      } catch (error) {
        console.error('Gagal mengambil nama task:', error);
        setNamaTask('');
      }
    };

    if (taskId) fetchNamaTask();
  }, [taskId, token]);

  const filteredData = data.filter((item) =>
    item.nama_project?.toLowerCase().includes(filterText.toLocaleLowerCase()) ||
    item.nama_task?.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'No',
      selector: (_, index) => index + 1,
      width: '60px',
      center: true,
    },
    {
      name: 'Project',
      selector: (row) => row.nama_project || '-',
      sortable: true,
    },
    {
      name: 'Task',
      selector: (row) => row.nama_task || '-',
      sortable: true,
    },
    {
      name: 'Mulai Tugas',
      selector: (row) => row.tgl_mulai_task || '-',
      sortable: true,
    },
    {
      name: 'Akhir Tugas',
      selector: (row) => row.tgl_akhir_task || '-',
      sortable: true,
    },
    {
      name: 'Tanggal Pengerjaan',
      selector: (row) => row.tgl_pengerjaan || '-',
      sortable: true,
    },
    {
      name: 'Catatan',
      selector: (row) => row.catatan || '-',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.jenis_catatan,
      sortable: true,
      center: true,
      width: '180px',
      cell: (row) => (
        <div
          className={`rounded-full px-3 py-2 font-medium uppercase text-white ${
            row.jenis_catatan === 'acc'
              ? 'bg-green-500'
              : row.jenis_catatan === 'revisi'
              ? 'bg-amber-500'
              : 'bg-red-400'
          }`}
        >
          {row.jenis_catatan || 'Pending'}
        </div>
      ),
    },
  ];

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Log Pengerjaan {namaTask && `- ${namaTask}`}</h1>
        <div className='flex gap-x-4'>
          <div className='input'>
            <Search size={20} className='text-slate-300' />
            <input
              type='text'
              placeholder='Search...'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className='w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300'
            />
          </div>
          {role === 'pendamping_lapangan' && (
            <Link
              to='add'
              className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 text-white'
            >
              <SquarePlus /> Add Log
            </Link>
          )}
        </div>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          {error && <div className='p-4 text-red-500 font-medium'>{error}</div>}
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default LogPengerjaan;
