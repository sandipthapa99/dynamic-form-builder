import { formSchema, formSchemaType } from '@/schemas/form';
import { FormResponseType } from '@/types/form';

export const GetForms = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error();
  }

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_KEY
      }/forms?userId=${userId}&_sort=createdAt&_order=desc`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forms');
    }

    const forms: FormResponseType[] = await response.json();
    return forms;
  } catch (error) {
    console.error('Error fetching user forms:', error);
  }
};

export async function CreateForm(
  data: formSchemaType,
  userId: string | undefined
) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Form not valid');
  }
  const { name, description } = data;
  if (!userId) {
    throw new Error();
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        createdAt: new Date().toISOString(),
        published: false,
        name,
        description,
        content: [],
        visits: 0,
        submissions: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create form');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating form:', error);
  }
}

export const GetFormById = async (
  userId: string | undefined,
  formId: string | undefined
): Promise<FormResponseType | undefined> => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!formId) {
    throw new Error('Form ID is required');
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/forms/${formId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch form');
    }

    const form: FormResponseType = await response.json();
    return form;
  } catch (error) {
    console.error('Error fetching form:', error);
    return undefined;
  }
};

export const UpdateFormContent = async (id: number, jsonContent: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/forms/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonContent,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update form content');
    }

    const updatedForm = await response.json();
    return updatedForm;
  } catch (error) {
    console.error('Error updating form:', error);
    return undefined;
  }
};

export const PublishForm = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/forms/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: true }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to publish form');
    }

    const updatedForm = await response.json();
    return updatedForm;
  } catch (error) {
    console.error('Error publishing form:', error);
    return undefined;
  }
};

export const GetFormStats = async (userId: string | undefined) => {
  try {
    // Fetch all forms for the given userId from JSON Server
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/forms?userId=${userId}`
    );
    const forms = await response.json();

    // Sum up the visits and submissions for all the forms
    let visits = 0;
    let submissions = 0;

    forms.forEach((form: FormResponseType) => {
      visits += form.visits || 0;
      submissions += form.submissions || 0;
    });

    let submissionRate = 0;
    if (visits > 0) {
      submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    };
  } catch (error) {
    console.error('Error fetching form stats:', error);
    return {
      visits: 0,
      submissions: 0,
      submissionRate: 0,
      bounceRate: 0,
    };
  }
};
