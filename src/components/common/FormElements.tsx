import { ParagraphFieldFormElement } from '@/fields/ParagraphField';
import { SubTitleFieldFormElement } from '@/fields/SubTitleField';
import { TextFieldFormElement } from '@/fields/TextField';
import { TitleFieldFormElement } from '@/fields/TitleField';
import { ElementsType, FormElement } from '@/types/form';

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
};
