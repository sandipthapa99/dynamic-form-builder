export type FormResponseType = {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  published: boolean;
  content: FormElementInstance[];
  shareURL: string;
  visits: number;
  submissions: number;
};
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
};
export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type ElementsType = 'TextField';
