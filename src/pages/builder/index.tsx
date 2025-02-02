import { GetFormById } from '@/actions/form';
import { FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormBuilder from './_sections/FormBuilder';
import { toast } from '@/hooks/use-toast';
import NotFound from '@/components/common/NotFound';

const Builder = () => {
  const { id } = useParams();

  const { user } = useUser();
  const [formData, setFormData] = useState<FormResponseType>();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(() => {
    const getSingleForm = async () => {
      if (!user?.id) return;
      const form = await GetFormById(id);
      if (!form) {
        toast({
          title: 'An error occured',
          description: 'Form not found',
          variant: 'destructive',
        });
        setIsNotFound(true);
      }
      setFormData(form);
    };
    if (id) {
      getSingleForm();
    }
  }, [user?.id, id]);

  if (isNotFound) {
    return <NotFound />;
  }
  return <FormBuilder form={formData} />;
};

export default Builder;
