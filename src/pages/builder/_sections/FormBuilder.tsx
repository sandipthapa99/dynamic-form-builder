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
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FormBuilder = ({ form }: { form: FormResponseType | undefined }) => {
  const { setElements, setSelectedElement } = useDesigner();
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
    setSelectedElement(null);
  }, [form, setElements, setSelectedElement]);

  const shareUrl = `${window.location.origin}/dashboard/submit/${form?.id}`;

  if (form?.published) {
    return (
      <div className='flex flex-col flex-grow items-center justify-center h-full w-full relative container px-common'>
        <div
          aria-hidden='true'
          className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
        >
          <div className='blur-[150px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
          <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
        </div>
        <div className=''>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-center text-3xl md:text-5xl font-semibold pb-2 mb-10 bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent'>
              Form Published Sucessfully!
            </h1>

            <h2 className='text-lg md:text-2xl font-medium'>Share this form</h2>
            <h3 className='text-md md:text-lg text-muted-foreground pb-10'>
              Anyone with the link can view and submit the form
            </h3>
          </div>
          <div className='my-2 flex flex-col gap-2 items-center w-full pb-0'>
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
            <Button asChild variant={'link'} className='px-0'>
              <Link to='/dashboard'>
                <ArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button asChild variant={'link'} className='px-0'>
              <Link to={`/dashboard/forms/${form.id}`}>
                Form details
                <ArrowRight />
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
        <nav className=' flex justify-between gap-3 items-center container px-common py-4'>
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
          <div className='container flex w-full h-full px-common'>
            <Designer />
          </div>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
