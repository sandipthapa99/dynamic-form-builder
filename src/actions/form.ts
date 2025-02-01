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
