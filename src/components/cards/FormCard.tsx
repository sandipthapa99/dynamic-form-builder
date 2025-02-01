import { formatDistance } from 'date-fns';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { LuView } from 'react-icons/lu';
import { FaEdit, FaWpforms } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FormResponseType } from '@/types/form';

const FormCard = ({ form }: { form: FormResponseType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className='flex items-center gap-2'>
              <LuView className='text-muted-foreground' />
              <span>4</span>
              <FaWpforms className='text-muted-foreground' />
              <span>5</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button
            asChild
            variant={'default'}
            className='w-full mt-2 text-md gap-4'
          >
            <Link to={`forms/${form.id}`}>
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={'secondary'}
            className='w-full mt-2 text-md gap-4'
          >
            <Link to={`builder/${form.id}`}>
              Edit Form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
