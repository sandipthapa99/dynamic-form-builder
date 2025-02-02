import { CheckboxFieldFormElement } from '@/fields/CheckboxField';
import { DateFieldFormElement } from '@/fields/DateField';
import { NumberFieldFormElement } from '@/fields/NumberField';
import { ParagraphFieldFormElement } from '@/fields/ParagraphField';
import { SelectFieldFormElement } from '@/fields/SelectField';
import { SeparatorFieldFormElement } from '@/fields/SeparatorField';
import { SpacerFieldFormElement } from '@/fields/SpacerField';
import { SubTitleFieldFormElement } from '@/fields/SubTitleField';
import { TextAreaFieldFormElement } from '@/fields/TextAreaField';
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
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
