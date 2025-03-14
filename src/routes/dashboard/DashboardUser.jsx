import axios from 'axios';
import { ListCheck, NotepadText, Package, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const DashboardUser = () => {
  const token = localStorage.getItem('token');
  const [totalProject, setTotalProject] = useState(0);
  const [totalTask, setTotalTask] = useState(0);
  const [totalPengerjaan, setTotalPengerjaan] = useState(0);
  const id_user = localStorage.getItem('id_user');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTotalProject = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/projects/total/${id_user}`,
          {
            headers: {
              Authorization: `Bearer: ${token}`,
            },
          },
        );
        setTotalProject(res.data.data.total);
      } catch (error) {
        console.error('Error fetching total project:', error);
      }
    };

    fetchTotalProject();
  }, []);

  useEffect(() => {
    const fetchTotalTask = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/v1/tasks/user`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      setTotalTask(res.data.total);
    };

    fetchTotalTask();
  }, []);

  useEffect(() => {
    const fetchTotalPengerjaan = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/api/v1/pengerjaans/total/${id_user}`,
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        },
      );
      setTotalPengerjaan(res.data.data.total);
    };

    fetchTotalPengerjaan();
  }, []);

  const statsData = [
    {
      label: 'Total Project',
      value: totalProject,
      icon: <Package size={26} />,
    },
    {
      label: 'Total Tugas',
      value: totalTask,
      icon: <NotepadText size={26} />,
    },
    {
      label: 'Total Pengerjaan',
      value: totalPengerjaan,
      icon: <ListCheck size={26} />,
    },
  ];

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='title'>Dashboard</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {statsData.map(({ label, value, icon }, index) => (
          <div key={index} className='card'>
            <div className='card-header'>
              <div className='w-fit rounded-lg bg-blue-500 p-2 text-white transition-colors'>
                {icon}
              </div>
              <p className='card-title'>{label}</p>
            </div>
            <div className='card-body transition-colors'>
              <p className='text-3xl font-bold text-slate-900 transition-colors'>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;
