import { FormElementInstance } from '@/types/form';
import { FormElements } from './FormElements';
import { Button } from '../ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { useCallback, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FormSubmitComponent = ({
  formId,
  content,
}: {
  formId: string | undefined;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };
  const submitForm = () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: 'Error',
        description: 'Please check the form for errors',
        variant: 'destructive',
      });
      return;
    }
  };
  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'
      >
        {content.map((item) => {
          const FormElement = FormElements[item.type].formComponent;
          return (
            <FormElement
              key={item.id}
              elementInstance={item}
              submitValue={submitValue}
              isInvalid={formErrors.current[item.id]}
              defaultValue={formValues.current[item.id]}
            />
          );
        })}
        <Button
          className='mt-8'
          onClick={() => {
            submitForm();
          }}
        >
          <HiCursorClick className='mr-2' />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
