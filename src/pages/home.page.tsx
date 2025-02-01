import { Separator } from '@radix-ui/react-dropdown-menu';
import { Suspense } from 'react';

import FormCards from './_sections/FormCards';
import FormCardSkeleton from '@/skeleton/FormCardSkeleton';
import CreateFormBtn from './_sections/CreateFormBtn';

const Homepage = () => {
  return (
    <div className='container pt-4 mx-auto px-common'>
      <h2 className='text-2xl font-bold col-span-2'> Your Forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default Homepage;
