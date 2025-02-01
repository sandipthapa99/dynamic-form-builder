import { ImShare } from 'react-icons/im';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Input value={shareLink} readOnly />
      <Button
        className='w-[250px]'
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: 'Success',
            description: 'Link copied to clipboard',
          });
        }}
      >
        <ImShare className='mr-2 h-4 w-4' />
      </Button>
    </div>
  );
};

export default FormLinkShare;
