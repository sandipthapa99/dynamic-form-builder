import { Button } from '../ui/button';

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  const shareLink = `${window.location.origin}/dashboard/submit/${shareUrl}`;
  return (
    <Button
      className='w-[200px]'
      onClick={() => {
        window.open(shareLink, '_blank');
      }}
    >
      Visit
    </Button>
  );
};

export default VisitBtn;
