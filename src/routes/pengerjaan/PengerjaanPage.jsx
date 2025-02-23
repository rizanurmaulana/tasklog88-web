import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NotebookTabs, Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const PengerjaanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
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
          `http://localhost:9000/api/v1/pengerjaans/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log('Response dari API:', res.data);

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

  const filteredData = data.filter((item) =>
    item.nama_task?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      selector: (_, index) => index + 1,
      width: '60px',
      center: true,
    },
    {
      name: 'Nama Tugas',
      selector: (row) => row.nama_task || '-',
      sortable: true,
    },
    {
      name: 'File Github',
      selector: (row) => row.file_github || '-',
      center: true,
      cell: (row) =>
        row.file_github ? (
          <a
            href={row.file_github}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500'
          >
            {row.file_github}
          </a>
        ) : (
          '-'
        ),
    },
    {
      name: 'File SS',
      selector: (row) => row.file_ss || '-',
      center: true,
      cell: (row) =>
        row.file_ss ? (
          <a
            href={row.file_ss}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500'
          >
            {row.file_ss}
          </a>
        ) : (
          '-'
        ),
    },
    {
      name: 'Status',
      selector: (row) => row.status_task || 'Unknown',
      center: true,
      cell: (row) => (
        <div
          className={`rounded-full px-3 py-2 font-medium capitalize text-white ${row.status_task === 'on going' ? 'bg-amber-500' : row.status_task === 'done' ? 'bg-green-500' : 'bg-gray-400'}`}
        >
          {row.status_task || 'Unknown'}
        </div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => row.status_task || 'Unknown',
      center: true,
      cell: (row) => (
        <Link
          to={`${row.id_pengerjaan}`}
          className='flex items-center gap-x-2 rounded-lg bg-teal-500 px-3 py-2 font-medium text-white hover:bg-teal-600'
        >
          <NotebookTabs size={16} />
          Log Pengerjaan
        </Link>
      ),
    },
  ];

  const handleEdit = (event, projectId) => {
    event.preventDefault();
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah data proyek ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`edit/${projectId}`);
      }
    });
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Pengerjaan</h1>
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
          {(role === 'pendamping_lapangan' || role === 'peserta') && (
            <Link
              to='add'
              className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 text-white'
            >
              <SquarePlus /> Add Pengerjaan
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

export default PengerjaanPage;
