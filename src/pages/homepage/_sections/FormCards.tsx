import FormCard from '@/components/cards/FormCard';
import { FormResponseType } from '@/types/form';

const FormCards = ({ formsData }: { formsData: FormResponseType[] }) => {
  return (
    <>
      {formsData?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
export default FormCards;
