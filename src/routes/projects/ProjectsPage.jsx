import { useTheme } from '../../hooks/use-theme';

import { projectList } from '../../constants';

import { Footer } from '../../layouts/footer';

import { PencilLine, SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleAddProject = () => {
    navigate('/projects/add');
  };

  const handleEditProject = () => {
    navigate('/projects/edit');
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Projects</h1>
        <button
          className='flex items-center gap-x-2 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white'
          onClick={handleAddProject}
        >
          <SquarePlus /> Add Project
        </button>
      </div>
      <div className='card'>
        <div className='card-body p-0'>
          <div className='relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]'>
            <table className='table'>
              <thead className='table-header'>
                <tr className='table-row'>
                  <th className='table-head'>#</th>
                  <th className='table-head'>Nama Project</th>
                  <th className='table-head'>Tanggal Mulai</th>
                  <th className='table-head'>Tanggal Selesai</th>
                  <th className='table-head'>Status</th>
                  <th className='table-head'>Actions</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {projectList.map((project, index) => (
                  <tr key={project.number} className='table-row'>
                    <td className='table-cell'>{index + 1}</td>
                    <td className='table-cell'>
                      <div className='flex w-max gap-x-4'>
                        <p>{project.name}</p>
                      </div>
                    </td>
                    <td className='table-cell'>${project.startDate}</td>
                    <td className='table-cell'>{project.endDate}</td>
                    <td className='table-cell'>
                      <div
                        className={`flex w-fit items-center justify-center rounded-full px-3 py-1 ${
                          project.status === 'In Progress'
                            ? 'bg-blue-500'
                            : project.status === 'Completed'
                              ? 'bg-green-500'
                              : project.status === 'Not Started'
                                ? 'bg-orange-500'
                                : ''
                        }`}
                      >
                        {project.status}
                      </div>
                    </td>
                    <td className='table-cell'>
                      <div className='flex items-center'>
                        <button
                          className='flex items-center gap-x-2 text-blue-500 dark:text-blue-600'
                          onClick={handleEditProject}
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

export default ProjectsPage;
