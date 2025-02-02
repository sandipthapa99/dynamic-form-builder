import { Button } from '@/components/ui/button';
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
import { FaSpinner } from 'react-icons/fa';
import { useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { PublishForm } from '@/actions/form';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

const PublishBtn = ({ id }: { id: string | undefined }) => {
  const [loading, startTransition] = useTransition();
  const navigate = useNavigate();

  const publishForm = async () => {
    try {
      await PublishForm(id!);
      toast({
        title: 'Success',
        description: 'Your form is now available to the public',
        variant: 'success',
      });
      navigate(0);
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
        <Button
          className='gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-500'
          disabled
        >
          <Upload className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing the form you will not
            be able to edit this form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                publishForm();
              });
            }}
          >
            Proceed {loading && <FaSpinner className='animate-spin' />}{' '}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishBtn;
