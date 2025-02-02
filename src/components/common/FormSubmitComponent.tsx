import { FormElementInstance } from '@/types/form';
import { FormElements } from './FormElements';
import { Button } from '../ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { SubmitForm } from '@/actions/form';

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
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  // Increment visits count on mount
  useEffect(() => {
    const updateVisits = async () => {
      if (!formId) return;

      try {
        // Fetch current form data
        const response = await fetch(
          `${import.meta.env.VITE_API_KEY}/forms/${formId}`
        );
        if (!response.ok) throw new Error('Failed to fetch form data');

        const formData = await response.json();
        const updatedVisits = (formData.visits || 0) + 1;

        // Update visits count
        await fetch(`${import.meta.env.VITE_API_KEY}/forms/${formId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visits: updatedVisits }),
        });
      } catch (error) {
        console.error('Error updating visits count:', error);
      }
    };

    updateVisits();
  }, [formId]);

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
  const submitForm = async () => {
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
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formId, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
        variant: 'destructive',
      });
    }
  };

  if (submitted) {
    return (
      <div className='flex justify-center items-center w-full h-full p-8'>
        <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
          <h1 className='text-2xl font-bold '>Form Submitted</h1>
          <p className='text-muted-foreground'>
            Thank you for your response. You can close this page now
          </p>
        </div>
      </div>
    );
  }

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
            startTransition(() => {
              submitForm();
            });
          }}
          disabled={pending}
        >
          {!pending ? (
            <>
              <HiCursorClick className='mr-2' />
              Submit
            </>
          ) : (
            <ImSpinner2 className='animate-spin' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
