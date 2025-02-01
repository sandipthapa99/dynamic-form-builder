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

const FormBuilder = ({ form }: { form: FormResponseType | undefined }) => {
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
                <PublishBtn />
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
