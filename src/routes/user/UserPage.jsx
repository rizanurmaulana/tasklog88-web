import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PencilLine, Search, SquarePlus } from 'lucide-react';
import DataTable from 'react-data-table-component';

const UserPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [filterText, setFilterText] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        user.username.toLowerCase().includes(filterText.toLowerCase()) ||
        user.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()) ||
        user.role.toLowerCase().includes(filterText.toLowerCase()),
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
      name: 'Username',
      selector: (row) => row.username,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.username}</div>,
    },
    {
      name: 'Nama Lengkap',
      selector: (row) => row.nama_lengkap,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.nama_lengkap}</div>,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: 'true',
      cell: (row) => <div className='table-cell'>{row.role}</div>,
    },
  ];

  if (role === 'pendamping_lapangan' || role === 'peserta') {
    columns.push({
      name: 'Actions',
      cell: (row) => (
        <Link
          to={`edit/${row.id_user}`}
          onClick={(event) => handleEdit(event, row.id_user)} // Perbaikan disini
          className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600'
        >
          <PencilLine size={20} /> Edit
        </Link>
      ),
      ignoreRowClick: 'true',
      allowoverflow: 'true',
      button: 'true',
    });
  }
  
  const handleEdit = (event, projectId) => { // Mengganti userId menjadi projectId
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
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        navigate(`edit/${projectId}`); // Menggunakan projectId yang benar
      }
    });
  };
  

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>User</h1>
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
              <SquarePlus /> Add User
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

export default UserPage;
