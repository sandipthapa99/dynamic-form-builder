import useDesigner from '@/hooks/useDesigner';
import FormElementsSidebar from '../../../components/common/FormElementsSidebar';
import PropertiesFormSidebar from '@/components/common/PropertiesFormSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <ScrollArea className='w-[420px] max-w-[420px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto max-h-full mt-4 rounded-xl '>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </ScrollArea>
  );
};

export default DesignerSidebar;
