import { SignedIn, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='container mx-auto flex justify-between items-center border-border h-[60px] px-4 py-2'>
      <Link to={'/'} className='font-bold text-3xl '>
        Form Builder
      </Link>
      <SignedIn>
        <div className='flex gap-4'>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
