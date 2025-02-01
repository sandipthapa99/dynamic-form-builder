export type FormResponseType = {
  id: number;
  userId: string;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  published: boolean;
  content: FormElementInstance[];
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type ElementsType = 'TextField';
