import { useTheme } from '../../hooks/use-theme';
import { NotebookTabs, PencilLine, Search, SquarePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

const TaskPage = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [filterText, setFilterText] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const filteredData = useMemo(() => {
    return data?.filter(
      (task) =>
        task.nama_task.toLowerCase().includes(filterText.toLowerCase()) ||
        task.nama_project.toLowerCase().includes(filterText.toLowerCase()) ||
        task.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [filterText, data]);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: 'false',
      width: '60px',
      center: 'true',
      cell: (row, index) => <div className='table-cell'>{index + 1}</div>,
    },
    {
      name: 'Nama Tugas',
      selector: (row) => row.nama_task,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_task}</div>,
    },
    {
      name: 'Nama Project',
      selector: (row) => row.nama_project,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_project}</div>,
    },
    {
      name: 'Nama Peserta',
      selector: (row) => row.nama_lengkap,
      sortable: 'true',
      width: '130px',
      cell: (row) => <div className='table-cell'>{row.nama_lengkap}</div>,
    },
    {
      name: 'Tanggal Mulai',
      selector: (row) => formatDate(row.tgl_mulai_task),
      sortable: 'true',
      center: 'true',
      width: '130px',
      cell: (row) => (
        <div className='table-cell'>{formatDate(row.tgl_mulai_task)}</div>
      ),
    },
    {
      name: 'Tanggal Selesai',
      selector: (row) => formatDate(row.tgl_akhir_task),
      sortable: 'true',
      center: 'true',
      width: '130px',
      cell: (row) => (
        <div className='table-cell'>{formatDate(row.tgl_akhir_task)}</div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status_task,
      sortable: 'true',
      center: 'true',
      width: '130px',
      cell: (row) => (
        <div
          className={`rounded-full px-3 py-2 text-center font-medium capitalize text-white ${
            row.status_task === 'on going'
              ? 'bg-amber-500'
              : row.status_task === 'done'
                ? 'bg-green-500'
                : 'bg-gray-400'
          }`}
        >
          {row.status_task || 'Unknown'}
        </div>
      ),
    },
  ];

  columns.push({
    name: 'Actions',
    center: true,
    width: '200px',
    cell: (row) => (
      <div className='flex gap-2'>
        <Link
          to={`${row.id_task}`}
          className='flex items-center gap-x-2 rounded-lg bg-teal-500 px-3 py-2 font-medium text-white hover:bg-teal-600'
        >
          <NotebookTabs size={16} />
          Detail
        </Link>

        {(role === 'pendamping_lapangan' || role === 'peserta') && (
          <button
            onClick={(event) => handleEdit(event, row.id_task)}
            className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600'
          >
            <PencilLine size={16} />
            Edit
          </button>
        )}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });

  const handleEdit = (event, taskId) => {
    event.preventDefault(); // Mencegah navigasi otomatis

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah data tugas ini!', // Mengubah teks agar lebih sesuai
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Batal',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        navigate(`edit/${taskId}`); // Pindah ke halaman edit jika dikonfirmasi
      }
    });
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Tasks</h1>
        <div className='flex gap-x-4'>
          <div className='input'>
            <Search size={20} className='text-slate-300' />
            <input
              type='text'
              name='search'
              id='search'
              placeholder='Search...'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className='w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300'
            />
          </div>
          {role === 'pendamping_lapangan' && (
            <Link
              to='add'
              className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            >
              <SquarePlus /> Add Task
            </Link>
          )}
        </div>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
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

export default TaskPage;
