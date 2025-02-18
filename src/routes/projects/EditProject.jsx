import { useTheme } from '../../hooks/use-theme';

import { Footer } from '../../layouts/footer';

import { useNavigate } from 'react-router-dom';

const EditProject = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/projects');
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Edit Projects</h1>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <form action=''>
            <div className='mb-4'>
              <label
                htmlFor='project-name'
                className='mb-2 block font-medium text-white'
              >
                Nama Project
              </label>
              <input
                type='text'
                id='project-name'
                name='project-name'
                placeholder='Nama Project'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='project-started'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Mulai
              </label>
              <input
                type='date'
                id='project-started'
                name='project-started'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='project-finished'
                className='mb-2 block font-medium text-white'
              >
                Tanggal Selesai
              </label>
              <input
                type='date'
                id='project-finished'
                name='project-finished'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='project-finished'
                className='mb-2 block font-medium text-white'
              >
                Status
              </label>
              <select
                name='project-status'
                id='project-status'
                className='w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-white outline-none dark:border-slate-700'
              >
                <option value=''>Not Started</option>
                <option value=''>In Progress</option>
                <option value=''>Completed</option>
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

export default EditProject;
