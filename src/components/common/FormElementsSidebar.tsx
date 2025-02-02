import { FormElements } from '@/components/common/FormElements';
import SidebarBtnElement from '@/components/common/SidebarBtnElement';
import { Separator } from '@radix-ui/react-separator';

const FormElementsSidebar = () => {
  return (
    <div>
      <Separator className='my-2' />
      <p className='text-sm text-foreground font-semibold col-span-1 md:col-span-2 my-2 place-self-start'>
        Layout elements
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center mb-4'>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
      </div>

      <p className='text-sm text-foreground font-semibold col-span-1 md:col-span-2 my-2 place-self-start'>
        Form elements
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
