import { useTheme } from '../../hooks/use-theme';

import { taskList } from '../../constants';

import { Footer } from '../../layouts/footer';

import { PencilLine, SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate('/task/add');
  };

  const handleEditTask = () => {
    navigate('/task/edit');
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Task</h1>
        <button
          className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
          onClick={handleAddTask}
        >
          <SquarePlus /> Add Task
        </button>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <div className='relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]'>
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
                  <th className='table-head'>Actions</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {taskList.map((tasks, index) => (
                  <tr key={tasks.number} className='table-row'>
                    <td className='table-cell'>{index + 1}</td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{tasks.nameTask}</p>
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{tasks.nameProject}</p>
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{tasks.username}</p>
                      </div>
                    </td>
                    <td className='table-cell'>{tasks.startDate}</td>
                    <td className='table-cell'>{tasks.endDate}</td>
                    <td className='table-cell'>
                      <div
                        className={`flex w-fit items-center justify-center rounded-full px-3 py-1 ${
                          tasks.status === 'On Going'
                            ? 'bg-blue-500'
                            : tasks.status === 'Done'
                              ? 'bg-green-500'
                                : ''
                        }`}
                      >
                        {tasks.status}
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex items-center'>
                        <button
                          className='flex items-center gap-x-2 text-blue-500 dark:text-blue-600'
                          onClick={handleEditTask}
                        >
                          <PencilLine size={20} />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskPage;
