import useDesigner from '@/hooks/useDesigner';
import { FormElements } from './FormElements';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { X } from 'lucide-react';

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-foreground font-medium'>
          Element Properties
        </p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
