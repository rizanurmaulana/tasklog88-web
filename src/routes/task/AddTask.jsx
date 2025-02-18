import { useTheme } from '../../hooks/use-theme';

import { Footer } from '../../layouts/footer';

import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/task');
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Add Task</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form action=''>
            <div className='mb-4'>
              <label
                htmlFor='tasks-nameTask'
                className='mb-2 block font-medium text-white'
              >
                Nama Task
              </label>
              <input
                type='text'
                id='tasks-nameTask'
                name='tasks-nameTask'
                placeholder='Nama Task'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tasks-nameProject'
                className='mb-2 block font-medium text-white'
              >
                Nama Project
              </label>
              <input
                type='text'
                id='tasks-nameProject'
                name='tasks-nameProject'
                placeholder='Nama Project'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tasks-username'
                className='mb-2 block font-medium text-white'
              >
                Username
              </label>
              <input
                type='text'
                id='tasks-username'
                name='tasks-username'
                placeholder='Username'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tasks-started'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Mulai
              </label>
              <input
                type='date'
                id='tasks-started'
                name='tasks-started'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tasks-finished'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Selesai
              </label>
              <input
                type='date'
                id='tasks-finished'
                name='tasks-finished'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tasks-finished'
                className='mb-2 block font-medium text-white'
              >
                Status
              </label>
              <select
                name='tasks-status'
                id='tasks-status'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              >
                <option value=''>pilih</option>
                <option value='On Going'>On Going</option>
                <option value='Done'>Done</option>
              </select>
            </div>
            <button
              className='rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTask;
