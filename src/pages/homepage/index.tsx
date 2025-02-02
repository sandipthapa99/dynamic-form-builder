import { Separator } from '@radix-ui/react-dropdown-menu';
import { Suspense, useEffect, useState } from 'react';

import FormCards from './_sections/FormCards';
import FormCardSkeleton from '@/skeleton/FormCardSkeleton';
import CreateFormBtn from './_sections/CreateFormBtn';
import { useUser } from '@clerk/clerk-react';
import { FormResponseType } from '@/types/form';
import { GetForms } from '@/actions/form';

const Homepage = () => {
  const { user } = useUser();
  const [formsData, setFormsData] = useState<FormResponseType[]>([]);

  useEffect(() => {
    const getForms = async () => {
      if (!user?.id) return;
      const forms = await GetForms(user?.id);
      setFormsData(forms ?? []);
    };
    getForms();
  }, [user?.id]);
  return (
    <div className='container pt-8 mx-auto px-common relative'>
      <Separator className='my-6' />
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards formsData={formsData ?? []} />
        </Suspense>
      </div>
    </div>
  );
};

export default Homepage;
