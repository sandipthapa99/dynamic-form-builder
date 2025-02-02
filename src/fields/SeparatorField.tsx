import { ElementsType, FormElement } from '@/types/form';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus } from 'lucide-react';

const type: ElementsType = 'SeparatorField';

const DesignerComponent = () => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Separator field</Label>
      <Separator />
    </div>
  );
};

const FormComponent = () => {
  return <Separator />;
};

const PropertiesComponent = () => {
  return <p>No properties for this element</p>;
};

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: Minus,
    label: 'Seaparator Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};
