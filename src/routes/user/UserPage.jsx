import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { useTheme } from '../../hooks/use-theme';
import { PencilLine, SquarePlus } from 'lucide-react';

const UserPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Tambahkan useNavigate()

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.project.data);
        console.log(res.data.project.data);
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

  const handleEdit = (event, userId) => {
    event.preventDefault(); // Mencegah navigasi otomatis

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan mengubah data proyek ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Edit",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`edit/${userId}`); // Pindah ke halaman edit jika dikonfirmasi
      }
    });
  };

  const role = localStorage.getItem('role');

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>User</h1>
        {role === 'pendamping_lapangan' && (
          <Link
            to='add'
            className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
          >
            <SquarePlus /> Add User
          </Link>
        )}
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <div className='relative max-h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]'>
            <table className='table'>
              <thead className='table-header'>
                <tr className='table-row'>
                  <th className='table-head'>#</th>
                  <th className='table-head'>Username</th>
                  <th className='table-head'>Role</th>
                  <th className='table-head'>Nama Lengkap</th>
                  <th className='table-head'>Actions</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {data && data.length > 0 ? (
                  data.map((user, index) => (
                    <tr
                      key={user.id || `user-${index}`}
                      className='table-row'
                    >
                      <td className='table-cell'>{index + 1}</td>
                      <td className='table-cell'>
                        <div className='flex w-max gap-x-4'>
                          <p>{user.username}</p>
                        </div>
                      </td>
                      <td className='table-cell'>
                        <div className='flex w-max gap-x-4'>
                          <p>{user.role}</p>
                        </div>
                      </td>
                      <td className='table-cell'>
                        <div className='flex w-max gap-x-4'>
                          <p>{user.nama_lengkap}</p>
                        </div>
                      </td>
                      
                      <td className='table-cell'>
                        <div className='flex items-center'>
                          <Link
                            to={`edit/${user.id_user}`}
                            onClick={(event) => handleEdit(event, user.id_user)}
                            className='flex items-center gap-x-2 text-blue-500 dark:text-white'
                          >
                            <PencilLine size={20} />
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='py-4 text-center'>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
