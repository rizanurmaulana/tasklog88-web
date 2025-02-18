import { forwardRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import taskLogo from '../assets/logo-tasklog88.png';
import { cn } from '../utils/cn';

import PropTypes from 'prop-types';
import { Home, LogOut, NotepadText, Package, Users } from 'lucide-react';

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
          path: `/${baseRoute}/dashboard`, // Tambahkan baseRoute di path
        },
        {
          label: 'Projects',
          icon: Package,
          path: `/${baseRoute}/projects`, // Tambahkan baseRoute di path
        },
        {
          label: 'Task',
          icon: NotepadText,
          path: `/${baseRoute}/task`, // Tambahkan baseRoute di path
        },
        ...(baseRoute === 'pendamping_lapangan' ||
        baseRoute === 'pendamping_kampus'
          ? [
              {
                label: 'Users',
                icon: Users,
                path: `/${baseRoute}/users`,
              },
            ]
          : []),
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/');
  };

  return (
    <aside
      ref={ref}
      className={cn(
        'fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900',
        collapsed ? 'md:w-[70px] md:items-center' : 'md:w-[240px]',
        collapsed ? 'max-md:-left-full' : 'max-md:left-0',
      )}
    >
      <div className='flex gap-x-3 p-3'>
        <img src={logoLight} alt='Logoipsum' className='dark:hidden' />
        {/* <img src={logoDark} alt='Logoipsum' className='hidden dark:block' /> */}
        <img src={taskLogo} alt="Logoipsum" className="hidden dark:block w-6 h-6" />

        
        {!collapsed && (
          <p className='text-lg font-medium text-slate-900 transition-colors dark:text-slate-50'>
            Tasklog88
          </p>
        )}
      </div>
      <div className='flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]'>
        {navbarLinks.map((navbarLink) => (
          <nav
            key={navbarLink.title}
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
          className='flex w-full items-center gap-x-3 rounded-lg p-3 text-red-600 hover:text-white hover:bg-red-100 dark:hover:bg-red-800'
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
