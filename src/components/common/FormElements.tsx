import { TextFieldFormElement } from '@/fields/TextField';
import { ElementsType, FormElement } from '@/types/form';

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
