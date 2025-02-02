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
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { FormResponseType } from '@/types/form';
import { ArrowRight, Pencil, ReceiptText, View } from 'lucide-react';
import DeleteFormBtn from '../common/DeleteFormBtn';

const FormCard = ({ form }: { form: FormResponseType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>
          <div className='flex items-center gap-2'>
            <DeleteFormBtn id={form.id} />
            {form.published ? (
              <Badge className='bg-green-200 hover:bg-green-200 h-6 text-green-700 shadow-none'>
                Published
              </Badge>
            ) : (
              <Badge className='bg-orange-200 hover:bg-orange-200 text-orange-500 h-6 shadow-none'>
                Draft
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className='flex gap-2'>
              <View className='text-muted-foreground h-4 w-4' />
              <span>{form?.visits}</span>
              <ReceiptText className='text-muted-foreground h-4 w-4' />
              <span>{form?.submissions}</span>
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
            <Link to={`forms/${form.id}`} className=''>
              View Submissions <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={'secondary'}
            className='w-full mt-2 text-md gap-4'
          >
            <Link to={`builder/${form.id}`}>
              Edit Form <Pencil className='h-4 w-4' />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
