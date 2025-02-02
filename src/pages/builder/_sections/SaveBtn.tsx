import useDesigner from '@/hooks/useDesigner';
import { useTransition } from 'react';
import { UpdateFormContent } from '@/actions/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const SaveBtn = ({ id }: { id: string | undefined }) => {
  const [loading, startTransition] = useTransition();

  const { elements } = useDesigner();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify({ content: Object.values(elements) });
      await UpdateFormContent(id!, jsonElements);
      toast({
        title: 'Success',
        description: 'Your form has been saved',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error: ${error}`,
        variant: 'destructive',
      });
    }
  };
  return (
    <Button
      variant={'outline'}
      className='gap-2'
      disabled={loading}
      onClick={() => {
        startTransition(() => {
          updateFormContent();
        });
      }}
    >
      <Save className='h-4 w-4' />
      Save
    </Button>
  );
};

export default SaveBtn;
