import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NotebookTabs, Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const LogPengerjaanPage = () => {
  const navigate = useNavigate();
  const { id, taskId } = useParams();
  const [data, setData] = useState([]);
  const [namaTask, setNamaTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/pengerjaans/log_pengerjaan/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else if (res.data.data && typeof res.data.data === 'object') {
          setData([res.data.data]);
        } else {
          console.error('Data yang diterima tidak sesuai format:', res.data);
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
  }, [id, token]);

  useEffect(() => {
    const fetchNamaTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(taskId);
        console.log(res.data.data.nama_task);
        setNamaTask(res.data.data.nama_task);
      } catch (error) {}
    };

    fetchNamaTask();
  }, [id, token]);

  const filteredData = data.filter((item) =>
    item.nama_task?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      selector: (_, index) => index + 1,
      width: '60px',
      center: 'true',
    },
    {
      name: 'Tanggal Pengerjaan',
      selector: (row) => row.tgl_pengerjaan || '-',
      sortable: 'true',
    },
    {
      name: 'Catatan',
      selector: (row) => row.catatan || '-',
      sortable: 'true',
    },
    {
      name: 'Status',
      selector: (row) => row.jenis_catatan,
      sortable: 'true',
      center: 'true',
      width: '200px',
      cell: (row) => (
        <div
          className={`rounded-full px-3 py-2 font-medium capitalize text-white ${
            row.jenis_catatan === 'acc'
              ? 'bg-green-500'
              : row.jenis_catatan === 'revisi'
                ? 'bg-amber-500'
                : 'bg-gray-400'
          }`}
        >
          {row.jenis_catatan || 'Unknown'}
        </div>
      ),
    },
  ];

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Log Pengerjaan</h1>
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
          <DataTable
            columns={columns}
            data={data}
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

export default LogPengerjaanPage;
