import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const FormLinkShare = ({ shareUrl }: { shareUrl: string | undefined }) => {
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Button
        variant={'outline'}
        className='w-[120px]'
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: 'Success',
            description: 'Link copied to clipboard',
          });
        }}
      >
        Copy
        <Copy className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default FormLinkShare;
