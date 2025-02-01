import { GetFormById } from '@/actions/form';
import FormSubmitComponent from '@/components/common/FormSubmitComponent';
import { FormElementInstance, FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubmitPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [formData, setFormData] = useState<FormResponseType>();

  useEffect(() => {
    const getSingleForm = async () => {
      if (!user?.id) return;
      const form = await GetFormById(user?.id, id);
      if (!form) throw new Error('Form not found');
      setFormData(form);
    };
    if (id) {
      getSingleForm();
    }
  }, [user?.id, id]);

  const formContent = (formData?.content as FormElementInstance[]) ?? [];

  return (
    <div className='flex flex-col h-[calc(100vh-60px)]'>
      <FormSubmitComponent formId={formData?.id} content={formContent} />
    </div>
  );
};

export default SubmitPage;
