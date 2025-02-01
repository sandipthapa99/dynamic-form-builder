import { Button } from '@/components/ui/button';
import { MdOutlinePublish } from 'react-icons/md';
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
import { FaIcons } from 'react-icons/fa';
import { useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { PublishForm } from '@/actions/form';
import { useNavigate } from 'react-router-dom';

const PublishBtn = ({ id }: { id: number | undefined }) => {
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
        <Button className='gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-500'>
          <MdOutlinePublish className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className='font-medium'>
              By publishing this form will make it available to the public and
              you will be able to collect submissions.
            </span>
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
            Proceed {loading && <FaIcons className='animate-spin' />}{' '}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishBtn;
