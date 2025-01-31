import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
