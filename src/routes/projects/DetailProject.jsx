import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PencilLine, Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const DetailProject = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [filterText, setFilterText] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/tasks/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(res.data.data);
      } catch (error) {
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
    return data?.filter((project) =>
      project.nama_project.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [filterText, data]);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: 'false',
      width: '80px',
      center: 'true',
      cell: (row, index) => <div className='table-cell'>{index + 1}</div>,
    },
    {
      name: 'Nama Project',
      selector: (row) => row.nama_project,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_project}</div>,
    },
    {
      name: 'Task',
      selector: (row) => row.nama_task,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_task}</div>,
    },
    {
      name: 'Tanggal Mulai',
      selector: (row) => formatDate(row.tgl_mulai_task),
      sortable: 'true',
      center: 'true',
      width: '200px',
      cell: (row) => (
        <div className='table-cell'>{formatDate(row.tgl_mulai_task)}</div>
      ),
    },
    {
      name: 'Tanggal Selesai',
      selector: (row) => formatDate(row.tgl_akhir_task),
      sortable: 'true',
      center: 'true',
      width: '200px',
      cell: (row) => (
        <div className='table-cell'>{formatDate(row.tgl_akhir_task)}</div>
      ),
    },
    {
      name: 'Status Task',
      selector: (row) => row.status_task,
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

  // const handleEdit = (event, projectId) => {
  //   event.preventDefault(); // Mencegah navigasi otomatis

  //   Swal.fire({
  //     title: 'Apakah Anda yakin?',
  //     text: 'Anda akan mengubah data proyek ini!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Edit',
  //     cancelButtonText: 'Batal',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate(`edit/${projectId}`); // Pindah ke halaman edit jika dikonfirmasi
  //     }
  //   });
  // };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Projects</h1>
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

export default DetailProject;
