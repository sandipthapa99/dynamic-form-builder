import { FormElementInstance } from '@/types/form';
import { FormElements } from './FormElements';
import { Button } from '../ui/button';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { SubmitForm } from '@/actions/form';
import { LoaderCircle, MousePointerClick } from 'lucide-react';

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
      <div className='flex justify-center items-center w-full h-full p-8 relative'>
        <div
          aria-hidden='true'
          className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
        >
          <div className='blur-[150px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
          <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
        </div>
        <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background rounded-xl w-full p-8 overflow-y-auto border z-10 items-center text-center'>
          <h1 className='text-2xl font-bold capitalize bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent'>
            Form Submitted Successfully!
          </h1>
          <p className='text-muted-foreground'>
            Thank you for your response. You can close this page now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8 relative'>
      <div
        aria-hidden='true'
        className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-30 dark:opacity-20'
      >
        <div className='blur-[150px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
        <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
      </div>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background/50 w-full p-8 overflow-y-auto border rounded-xl z-10'
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
              <MousePointerClick className='mr-2' />
              Submit
            </>
          ) : (
            <LoaderCircle className='animate-spin' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
