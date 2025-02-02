import { GetFormById } from '@/actions/form';
import { FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormBuilder from './_sections/FormBuilder';

const Builder = () => {
  const { id } = useParams();

  const { user } = useUser();
  const [formData, setFormData] = useState<FormResponseType>();

  useEffect(() => {
    const getSingleForm = async () => {
      if (!user?.id) return;
      const form = await GetFormById(id);
      if (!form) throw new Error('Form not found');
      setFormData(form);
    };
    if (id) {
      getSingleForm();
    }
  }, [user?.id, id]);
  return <FormBuilder form={formData} />;
};

export default Builder;
