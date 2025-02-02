import { GetFormById } from '@/actions/form';
import FormSubmitComponent from '@/components/common/FormSubmitComponent';
import { FormElementInstance, FormResponseType } from '@/types/form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubmitPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormResponseType>();

  useEffect(() => {
    const getSingleForm = async () => {
      const form = await GetFormById(id);
      if (!form) throw new Error('Form not found');
      setFormData(form);
    };
    if (id) {
      getSingleForm();
    }
  }, [id]);

  const formContent = (formData?.content as FormElementInstance[]) ?? [];

  return (
    <div className='flex flex-col h-[calc(100vh-90px)]'>
      <FormSubmitComponent formId={formData?.id} content={formContent} />
    </div>
  );
};

export default SubmitPage;
