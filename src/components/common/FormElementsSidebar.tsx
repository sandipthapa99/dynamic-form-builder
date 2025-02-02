import { FormElements } from '@/components/common/FormElements';
import SidebarBtnElement from '@/components/common/SidebarBtnElement';
import { Separator } from '@radix-ui/react-separator';

const FormElementsSidebar = () => {
  return (
    <div>
      <p className='text-sm text-foreground/70'>Drag and drop elements</p>
      <Separator className='my-2' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Layout elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />

        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Form elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
