import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { DeleteForm, PublishForm } from '@/actions/form';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle, Trash } from 'lucide-react';

const DeleteFormBtn = ({ id }: { id: string | undefined }) => {
  const [loading, startTransition] = useTransition();
  const navigate = useNavigate();

  const deleteForm = async () => {
    try {
      await DeleteForm(id).then(async () => {
        await PublishForm(id!).then(() => {
          toast({
            title: 'Success',
            description: 'Form deleted successfully',
            variant: 'success',
          });
          navigate(0);
        });
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
        variant: 'destructive',
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='bg-red-200 p-1 rounded h-6 w-6 flex items-center justify-center'>
          <Trash className='h-6 w-6 cursor-pointer text-red-500' />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. If the form has submissions, it will
            also be lost permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-600'
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                deleteForm();
              });
            }}
          >
            Delete {loading && <LoaderCircle className='animate-spin' />}{' '}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFormBtn;
