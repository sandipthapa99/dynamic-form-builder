import { FormElements } from '@/components/common/FormElements';
import SidebarBtnElement from '@/components/common/SidebarBtnElement';

const FormElementsSidebar = () => {
  return (
    <div>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
