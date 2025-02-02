import { Suspense, lazy } from 'react';
import { FormResponseType } from '@/types/form';
import FormCardSkeleton from '@/skeleton/FormCardSkeleton';

const LazyFormCard = lazy(() => import('@/components/cards/FormCard'));

const FormCards = ({ formsData }: { formsData: FormResponseType[] }) => {
  const reversedFormsData = formsData.slice().reverse();

  return (
    <Suspense fallback={<FormCardSkeleton />}>
      {reversedFormsData?.map((form) => (
        <LazyFormCard key={form.id} form={form} />
      ))}
    </Suspense>
  );
};

export default FormCards;
