import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-[90px] border-b border-muted flex items-center'>
      <div className='container flex justify-between items-center px-common py-2'>
        <Link
          to={'/'}
          className='font-bold text-lg sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent'
        >
          Dynamic Form Builder
        </Link>
        <SignedIn>
          <div className='flex gap-4'>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <Link
            to='sign-in'
            className='relative flex h-9 w-[120px] md:w-[200px] items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
          >
            <span className='relative text-base font-medium text-primary'>
              Sign In
            </span>
          </Link>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
