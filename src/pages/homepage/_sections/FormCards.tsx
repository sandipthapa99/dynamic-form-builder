import { GetForms } from '@/actions/form';
import FormCard from '@/components/cards/FormCard';
import { FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

const FormCards = () => {
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
    <>
      {formsData?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
export default FormCards;
