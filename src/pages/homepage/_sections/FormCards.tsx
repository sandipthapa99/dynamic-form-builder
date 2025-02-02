import { Suspense, lazy } from 'react';
import { FormResponseType } from '@/types/form';
import FormCardSkeleton from '@/skeleton/FormCardSkeleton';

const LazyFormCard = lazy(() => import('@/components/cards/FormCard'));

const FormCards = ({ formsData }: { formsData: FormResponseType[] }) => {
  return (
    <Suspense fallback={<FormCardSkeleton />}>
      {formsData?.map((form) => (
        <LazyFormCard key={form.id} form={form} />
      ))}
    </Suspense>
  );
};

export default FormCards;
