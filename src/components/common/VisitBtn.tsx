import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const VisitBtn = ({ shareUrl }: { shareUrl: string | undefined }) => {
  const shareLink = `${window.location.origin}/dashboard/submit/${shareUrl}`;
  return (
    <Button
      className='w-[120px]'
      onClick={() => {
        window.open(shareLink, '_blank');
      }}
    >
      View
      <ExternalLink className='h-4 w-4' />
    </Button>
  );
};

export default VisitBtn;
