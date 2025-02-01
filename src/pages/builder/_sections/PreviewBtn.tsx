import { FormElements } from '@/components/common/FormElements';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useDesigner from '@/hooks/useDesigner';
import { MdPreview } from 'react-icons/md';

const PreviewBtn = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='gap-2'>
          <MdPreview className='h-6 w-6' />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <p className='text-lg font-semibold text-accent-foreground'>
            Form Preview
          </p>
          <p className='text-sm text-muted-foreground'>
            This is how the form will look like
          </p>
        </div>
        <div className='flex flex-col flex-grow items-center bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto p-4'>
          <div className='max-w-[620px] flex flex-grow flex-col gap-4 bg-background h-full w-full rounded-2xl p-8 overflow-y-auto '>
            {elements.map((element) => {
              const FormElement = FormElements[element.type].formComponent;
              return <FormElement key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewBtn;
