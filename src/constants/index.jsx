import {
  ChartColumn,
  Home,
  NotepadText,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';

import ProfileImage from '../assets/profile-image.jpg';
import ProductImage from '../assets/product-image.jpg';

export const navbarLinks = [
  {
    links: [
      {
        label: 'Dashboard',
        icon: Home,
        path: '/',
      },
      {
        label: 'Projects',
        icon: Package,
        path: '/projects',
      },
      {
        label: 'Task',
        icon: NotepadText,
        path: '/tasks',
      },
      {
        label: 'Users',
        icon: Users,
        path: '/users',
      },
    ],
  },
];

export const overviewData = [
  {
    name: 'Jan',
    total: 1500,
  },
  {
    name: 'Feb',
    total: 2000,
  },
  {
    name: 'Mar',
    total: 1000,
  },
  {
    name: 'Apr',
    total: 5000,
  },
  {
    name: 'May',
    total: 2000,
  },
  {
    name: 'Jun',
    total: 5900,
  },
  {
    name: 'Jul',
    total: 2000,
  },
  {
    name: 'Aug',
    total: 5500,
  },
  {
    name: 'Sep',
    total: 2000,
  },
  {
    name: 'Oct',
    total: 4000,
  },
  {
    name: 'Nov',
    total: 1500,
  },
  {
    name: 'Dec',
    total: 2500,
  },
];

export const recentSalesData = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    image: ProfileImage,
    total: 1500,
  },
  {
    id: 2,
    name: 'James Smith',
    email: 'james.smith@email.com',
    image: ProfileImage,
    total: 2000,
  },
  {
    id: 3,
    name: 'Sophia Brown',
    email: 'sophia.brown@email.com',
    image: ProfileImage,
    total: 4000,
  },
  {
    id: 4,
    name: 'Noah Wilson',
    email: 'noah.wilson@email.com',
    image: ProfileImage,
    total: 3000,
  },
  {
    id: 5,
    name: 'Emma Jones',
    email: 'emma.jones@email.com',
    image: ProfileImage,
    total: 2500,
  },
  {
    id: 6,
    name: 'William Taylor',
    email: 'william.taylor@email.com',
    image: ProfileImage,
    total: 4500,
  },
  {
    id: 7,
    name: 'Isabella Johnson',
    email: 'isabella.johnson@email.com',
    image: ProfileImage,
    total: 5300,
  },
];

export const topProducts = [
  {
    number: 1,
    name: 'Wireless Headphones',
    image: ProductImage,
    description: 'High-quality noise-canceling wireless headphones.',
    price: 99.99,
    status: 'In Stock',
    rating: 4.5,
  },
  {
    number: 2,
    name: 'Smartphone',
    image: ProductImage,
    description: 'Latest 5G smartphone with excellent camera features.',
    price: 799.99,
    status: 'In Stock',
    rating: 4.7,
  },
  {
    number: 3,
    name: 'Gaming Laptop',
    image: ProductImage,
    description: 'Powerful gaming laptop with high-end graphics.',
    price: 1299.99,
    status: 'In Stock',
    rating: 4.8,
  },
  {
    number: 4,
    name: 'Smartwatch',
    image: ProductImage,
    description: 'Stylish smartwatch with fitness tracking features.',
    price: 199.99,
    status: 'Out of Stock',
    rating: 4.4,
  },
  {
    number: 5,
    name: 'Bluetooth Speaker',
    image: ProductImage,
    description: 'Portable Bluetooth speaker with deep bass sound.',
    price: 59.99,
    status: 'In Stock',
    rating: 4.3,
  },
  {
    number: 6,
    name: '4K Monitor',
    image: ProductImage,
    description: 'Ultra HD 4K monitor with stunning color accuracy.',
    price: 399.99,
    status: 'In Stock',
    rating: 4.6,
  },
  {
    number: 7,
    name: 'Mechanical Keyboard',
    image: ProductImage,
    description: 'Mechanical keyboard with customizable RGB lighting.',
    price: 89.99,
    status: 'In Stock',
    rating: 4.7,
  },
  {
    number: 8,
    name: 'Wireless Mouse',
    image: ProductImage,
    description: 'Ergonomic wireless mouse with precision tracking.',
    price: 49.99,
    status: 'In Stock',
    rating: 4.5,
  },
  {
    number: 9,
    name: 'Action Camera',
    image: ProductImage,
    description: 'Waterproof action camera with 4K video recording.',
    price: 249.99,
    status: 'In Stock',
    rating: 4.8,
  },
  {
    number: 10,
    name: 'External Hard Drive',
    image: ProductImage,
    description: 'Portable 2TB external hard drive for data storage.',
    price: 79.99,
    status: 'Out of Stock',
    rating: 4.5,
  },
];

export const projectList = [
  {
    id: 1,
    name: 'Website Portfolio',
    startDate: '2024-01-10',
    endDate: '2024-02-15',
    status: 'Completed',
    actions: 'View Details',
  },
  {
    id: 2,
    name: 'E-Commerce App',
    startDate: '2024-02-20',
    endDate: '2024-04-30',
    status: 'In Progress',
    actions: 'Edit',
  },
  {
    id: 3,
    name: 'Company Landing Page',
    startDate: '2024-03-05',
    endDate: '2024-03-25',
    status: 'Not Started',
    actions: 'Start Project',
  },
  {
    id: 4,
    name: 'Mobile Banking App',
    startDate: '2023-12-01',
    endDate: '2024-06-30',
    status: 'In Progress',
    actions: 'Edit',
  },
  {
    id: 5,
    name: 'Social Media Dashboard',
    startDate: '2024-02-10',
    endDate: '2024-05-20',
    status: 'In Progress',
    actions: 'Edit',
  },
  {
    id: 6,
    name: 'CRM System',
    startDate: '2024-04-01',
    endDate: '2024-07-15',
    status: 'Not Started',
    actions: 'Start Project',
  },
  {
    id: 7,
    name: 'Task Management App',
    startDate: '2023-11-15',
    endDate: '2024-03-10',
    status: 'Completed',
    actions: 'View Details',
  },
  {
    id: 8,
    name: 'Event Booking Platform',
    startDate: '2024-03-20',
    endDate: '2024-06-01',
    status: 'Not Started',
    actions: 'Start Project',
  },
  {
    id: 9,
    name: 'Online Learning Portal',
    startDate: '2024-01-25',
    endDate: '2024-05-10',
    status: 'In Progress',
    actions: 'Edit',
  },
  {
    id: 10,
    name: 'AI Chatbot Integration',
    startDate: '2024-05-05',
    endDate: '2024-08-15',
    status: 'Not Started',
    actions: 'Start Project',
  },
];
