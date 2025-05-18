import { forwardRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import taskLogo from '../assets/logo-tasklog88.png';
import { cn } from '../utils/cn';
import PropTypes from 'prop-types';
import { Home, LogOut, Logs, NotepadText, Package, Users } from 'lucide-react';

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  const location = useLocation();
  const baseRoute = location.pathname.split('/')[1];

  const navigate = useNavigate();

  // Tentukan navbarLinks berdasarkan role (baseRoute)
  const navbarLinks = [
    {
      links: [
        {
          label: 'Dashboard',
          icon: Home,
          path: `/${baseRoute}/dashboard`,
        },
        {
          label: 'Projects',
          icon: Package,
          path: `/${baseRoute}/projects`,
        },
        {
          label: 'Task',
          icon: NotepadText,
          path: `/${baseRoute}/task`,
        },
        ...(baseRoute === 'peserta'
          ? [
              {
                label: 'Log',
                icon: Logs,
                path: `/${baseRoute}/logs`,
              },
            ]
          : []),
        ...(baseRoute === 'pendamping_lapangan' ||
        baseRoute === 'pendamping_kampus'
          ? [
              {
                label: 'User',
                icon: Users,
                path: `/${baseRoute}/user`,
              },
            ]
          : []),
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('id_user');
    localStorage.removeItem('nama_lengkap');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/');
  };

  return (
    <aside
      ref={ref}
      className={cn(
        'fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)]',
        collapsed ? 'md:w-[70px] md:items-center' : 'md:w-[240px]',
        collapsed ? 'max-md:-left-full' : 'max-md:left-0',
      )}
    >
      <div className='flex gap-x-3 p-3'>
        <img src={taskLogo} alt='Logoipsum' className='h-6 w-6' />

        {!collapsed && (
          <p className='text-lg font-bold text-sky-400 transition-colors'>
            Tasklog88
          </p>
        )}
      </div>
      <div className='flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]'>
        {navbarLinks.map((navbarLink, index) => (
          <nav
            key={index}
            className={cn('sidebar-group', collapsed && 'md:items-center')}
          >
            {navbarLink.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={cn('sidebar-item', collapsed && 'md:w-[45px]')}
              >
                <link.icon size={22} className='flex-shrink-0' />
                {!collapsed && (
                  <p className='whitespace-nowrap'>{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
      <div className='mt-auto p-3'>
        <button
          onClick={handleLogout}
          className='flex w-full items-center gap-x-3 rounded-lg bg-red-50 p-3 text-red-600 hover:bg-red-600 hover:text-white'
        >
          <LogOut size={22} />
          {!collapsed && <p>Logout</p>}
        </button>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
