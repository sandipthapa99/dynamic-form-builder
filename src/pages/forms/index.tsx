import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/common/FormLinkShare';
import StatsCard from '@/components/common/StatsCard';
import SubmissionTable from '@/components/common/SubmissionTable';
import VisitBtn from '@/components/common/VisitBtn';
import { FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { MousePointerClick, ReceiptText, Undo2, View } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormDetailPage = () => {
  const { id } = useParams();

  const { user } = useUser();
  const [formData, setFormData] = useState<FormResponseType>();
  let submissionRate = 0;
  if (formData) {
    if (formData.visits > 0) {
      submissionRate = (formData.submissions / formData.visits) * 100;
    }
  }
  const bounceRate = 100 - submissionRate;

  useEffect(() => {
    const getSingleForm = async () => {
      if (!user?.id) return;
      const form = await GetFormById(user?.id, id);
      if (!form) throw new Error('Form not found');
      setFormData(form);
    };
    if (id) {
      getSingleForm();
    }
  }, [user?.id, id]);
  return (
    <div className='container px-common'>
      <div className='py-4 sm:py-10 '>
        <div className='flex justify-between items-center flex-wrap'>
          <h1 className='text-3xl lg:text-4xl font-semibold truncate text-foreground/80'>
            {formData?.name}
          </h1>
          <div className='flex items-center gap-4'>
            <div className='py-4'>
              <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center justify-between'>
                  <FormLinkShare shareUrl={formData?.id} />
                </div>
              </div>
            </div>

            <VisitBtn shareUrl={formData?.id} />
          </div>
        </div>
      </div>

      <div className='w-full pt-4 md:pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title={'Total visits'}
          icon={<View className='text-blue-600 h-4 w-4' />}
          helperText={'All time form Visits'}
          value={formData?.visits?.toLocaleString() ?? '0'}
          loading={false}
          className='text-blue-600'
        />
        <StatsCard
          title={'Total submissions'}
          icon={<ReceiptText className='text-orange-600 h-4 w-4' />}
          helperText={'All time form submissions'}
          value={formData?.submissions?.toLocaleString() ?? '0'}
          loading={false}
          className='text-orange-500'
        />
        <StatsCard
          title={'Submission rate'}
          icon={<MousePointerClick className='text-green-600 h-4 w-4' />}
          helperText={'Visits that result in form submission'}
          value={submissionRate.toLocaleString() + '%' || '0'}
          loading={false}
          className='text-green-600'
        />
        <StatsCard
          title={'Bounce rate'}
          icon={<Undo2 className='text-red-600 h-4 w-4' />}
          helperText={'Visits that leave without form interaction'}
          value={bounceRate.toLocaleString() + '%' || '0'}
          loading={false}
          className='text-red-600'
        />
      </div>

      <div className='pt-10'>
        <SubmissionTable id={id} />
      </div>
    </div>
  );
};

export default FormDetailPage;
