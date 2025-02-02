import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='container mx-auto flex justify-between items-center border-border h-[60px] px-common py-2'>
      <Link to={'/'} className='font-bold text-3xl '>
        Form Builder
      </Link>
      <SignedIn>
        <div className='flex gap-4'>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Link
          to='sign-in'
          className='relative flex h-9 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
        >
          <span className='relative text-base font-medium text-primary'>
            Sign In
          </span>
        </Link>
      </SignedOut>
    </header>
  );
};

export default Header;
