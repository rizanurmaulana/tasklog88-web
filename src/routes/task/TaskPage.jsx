import { useTheme } from '../../hooks/use-theme';

import { PencilLine, SquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskPage = () => {
  const { theme } = useTheme();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/v1/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.data.data);
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

  const role = localStorage.getItem('role');

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Tasks</h1>
        {role === 'pendamping_lapangan' && (
          <Link
            to='add'
            className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
            onClick={0}
          >
            <SquarePlus /> Add Task
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
                  <th className='table-head'>Nama Task</th>
                  <th className='table-head'>Nama Project</th>
                  <th className='table-head'>Nama User</th>
                  <th className='table-head'>Tanggal Mulai</th>
                  <th className='table-head'>Tanggal Selesai</th>
                  <th className='table-head'>Status</th>
                  {role === 'pendamping_lapangan' || role === 'peserta' ? (
                    <th className='table-head'>Actions</th>
                  ) : null}
                </tr>
              </thead>
              <tbody className='table-body'>
                {data.map((task, index) => (
                  <tr key={task.id} className='table-row'>
                    <td className='table-cell'>{index + 1}</td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{task.nama_task}</p>
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{task.nama_project}</p>
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{task.nama_lengkap}</p>
                      </div>
                    </td>
                    <td className='table-cell'>{task.tgl_mulai_task}</td>
                    <td className='table-cell'>{task.tgl_akhir_task}</td>
                    <td className='table-cell'>
                      <div
                        className={`flex w-fit items-center justify-center rounded-full px-3 py-1 ${
                          task.status_task === 'on going'
                            ? 'bg-blue-500'
                            : task.status_task === 'done'
                              ? 'bg-green-500'
                              : ''
                        }`}
                      >
                        {task.status_task || 'unknow'}
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex items-center'>
                        {(role === 'pendamping_lapangan' ||
                          role === 'peserta') && (
                          <Link
                            to={`edit/${task.id_task}`}
                            className='flex items-center gap-x-2 text-blue-500 dark:text-white'
                          >
                            <PencilLine size={20} />
                            Edit
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
