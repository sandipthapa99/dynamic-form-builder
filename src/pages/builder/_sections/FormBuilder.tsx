import useDesigner from '@/hooks/useDesigner';
import { FormResponseType } from '@/types/form';
import { useEffect } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import PreviewBtn from './PreviewBtn';
import SaveBtn from './SaveBtn';
import PublishBtn from './PublishBtn';
import Designer from './Designer';
import DragOverlayWrapper from '@/components/common/DragOverlayWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const FormBuilder = ({ form }: { form: FormResponseType | undefined }) => {
  console.log('🚀 ~ FormBuilder ~ form:', form);
  const { setElements } = useDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = form?.content;
    setElements(elements || []);
  }, [form, setElements]);

  const shareUrl = `${window.location.origin}/submit/${form?.id}`;

  if (form?.published) {
    return (
      <div className='flex flex-col flex-grow items-center justify-center h-full w-full'>
        <div className='max-w-md'>
          <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
            Form Published
          </h1>
          <h2 className='text-2xl'>Share this form</h2>
          <h3 className='text-xl text-muted-foreground border-b pb-10'>
            Anyone with the link can view and submit the form
          </h3>
          <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
            <Input className='w-full' readOnly value={shareUrl} />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: 'Success',
                  description: 'Link copied to clipboard',
                  variant: 'success',
                });
              }}
              className='mt-2 w-full'
            >
              Copy link
            </Button>
          </div>
          <div className='flex justify-between'>
            <Button asChild variant={'link'}>
              <Link to='/dashboard'>
                <BsArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button asChild variant={'link'}>
              <Link to={`/dashboard/forms/${form.id}`}>
                Form details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full flex-grow'>
        <nav className='container mx-auto flex justify-between  p-4 gap-3 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form?.name}
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewBtn />
            {!form?.published && (
              <>
                <SaveBtn id={form?.id} />
                <PublishBtn id={form?.id} />
              </>
            )}
          </div>
        </nav>
        <div className='flex flex-grow w-full h-[200px] items-center justify-center relative overflow-y-auto bg-accent bg-[url(/bg.svg)] dark:bg-[url(/bg-dark.svg)]'>
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
