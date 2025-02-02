import { cn } from '@/lib/utils';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import useDesigner from '@/hooks/useDesigner';

import { useState } from 'react';
import { FormElements } from '@/components/common/FormElements';
import { generateId } from '@/lib/generateId';
import { ElementsType, FormElementInstance } from '@/types/form';
import { Button } from '@/components/ui/button';
import DesignerSidebar from './DesignerSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, Trash } from 'lucide-react';

const Designer = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const isDroppingElementOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;
      //first case
      if (isDroppingElementOverDesignerDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );
        addElement(elements.length, newElement);
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingElementOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      //second case
      if (droppingElementOverDesignerElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );
        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
      }

      //Third case
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const draggingElementOverAnotherElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;
      if (draggingElementOverAnotherElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over?.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (item) => item.id === activeId
        );
        const overElementIndex = elements.findIndex(
          (item) => item.id === overId
        );

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });
  return (
    <div className='flex w-full h-full'>
      <div
        className='py-4 pr-4 w-full container'
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={'bg-background h-full rounded-xl flex flex-col flex-grow'}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className=' flex flex-col flex-grow items-center justify-center h-full text-muted-foreground'>
              <Layers className='h-12 w-12 mb-6' />
              <p className='text-2xl font-semibold text-center px-1'>
                Drag & Drop elements here
              </p>
            </div>
          )}
          <ScrollArea
            className={cn(
              'max-w-[990px] flex items-center justify-center flex-1 overflow-y-auto  scrollbar-none',
              droppable.isOver && 'ring-4 ring-inset ring-primary/20'
            )}
          >
            {droppable.isOver && elements.length === 0 && (
              <div className='p-4 w-full'>
                <div className='h-[120px] rounded-md bg-secondary' />
              </div>
            )}
            {elements.length > 0 && (
              <div className='flex flex-col w-full gap-2 p-4'>
                {elements.map((element) => (
                  <DesignerElementWrapper key={element.id} element={element} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({
  element,
}: Readonly<{ element: FormElementInstance }>) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute  w-full h-1/2 rounded-t-md'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute bottom-0 w-full h-1/2 rounded-b-md'
      />
      {mouseIsOver && (
        <>
          <div className='absolute right-0 h-full z-10'>
            <Button
              variant={'outline'}
              className='flex justify-center h-full border rounded-md rounded-l-none bg-red-600 hover:bg-red-600'
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash className='h-6 w-6 text-white' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <p className='text-muted-foreground text-sm'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md h-[4px] bg-primary/70 rounded-b-none' />
      )}
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-md h-[4px] bg-primary/70 rounded-t-none' />
      )}
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/50 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
