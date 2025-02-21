import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const PengerjaanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]); // Tetap pakai array agar DataTable bisa berfungsi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/pengerjaans/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Data dari API:', res.data.data); // Debugging

        // Jika API mengembalikan objek, ubah menjadi array agar bisa masuk ke DataTable
        if (res.data.data && typeof res.data.data === 'object') {
          setData([res.data.data]); // Bungkus objek ke dalam array
        } else {
          console.error('Error: Data yang diterima bukan objek!', res.data.data);
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

    if (token) {
      fetchData();
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, [token, id]);

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
      selector: (row) => row.nama_task || '-',
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_task || '-'}</div>,
    },
    {
      name: 'File Github',
      selector: (row) => row.file_github || '-',
      sortable: 'true',
      center: 'true',
      cell: (row) => (
        <div className='table-cell'>
          <a href={row.file_github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {row.file_github || '-'}
          </a>
        </div>
      ),
    },
    {
      name: 'File SS',
      selector: (row) => row.file_ss || '-',
      sortable: 'true',
      center: 'true',
      cell: (row) => (
        <div className='table-cell'>
          <a href={row.file_ss} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {row.file_ss || '-'}
          </a>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status_task || 'Unknown',
      sortable: 'true',
      center: 'true',
      width: '200px',
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

  const handleEdit = (event, projectId) => {
    event.preventDefault();

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengubah data proyek ini!',
      icon: 'warning',
      showCancelButton: 'true',
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
              <SquarePlus /> Add Pengerjaan
            </Link>
          )}
        </div>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <DataTable
            columns={columns}
            data={data} // Pastikan data dalam bentuk array
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
