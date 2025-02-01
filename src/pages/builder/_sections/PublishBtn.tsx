import { Button } from '@/components/ui/button';
import { MdOutlinePublish } from 'react-icons/md';

const PublishBtn = () => {
  return (
    <Button className='gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-500'>
      <MdOutlinePublish className='h-4 w-4' />
      Publish
    </Button>
  );
};

export default PublishBtn;
