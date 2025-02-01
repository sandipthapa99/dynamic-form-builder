import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/common/FormLinkShare';
import StatsCard from '@/components/common/StatsCard';
import SubmissionTable from '@/components/common/SubmissionTable';
import VisitBtn from '@/components/common/VisitBtn';
import { FormResponseType } from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { FaWpforms } from 'react-icons/fa';
import { LuView } from 'react-icons/lu';
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
    <>
      <div className='py-10 border-t border-b border-muted'>
        <div className='flex justify-between container mx-auto'>
          <h1 className='text-4xl font-bold truncate'>{formData?.name}</h1>
          <VisitBtn shareUrl={formData?.id} />
        </div>
      </div>
      <div className='py-4 border-b border-muted'>
        <div className='container px-common flex gap-2 items-center justify-between'>
          <div className='flex container gap-2 items-center justify-between'>
            <FormLinkShare shareUrl={formData?.id} />
          </div>
        </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container px-common'>
        <StatsCard
          title={'Total visits'}
          icon={<LuView className='text-blue-600' />}
          helperText={'All time form Visits'}
          value={formData?.visits?.toLocaleString() ?? '0'}
          loading={false}
          className='shadow-md shadow-blue-600'
        />
        <StatsCard
          title={'Total submissions'}
          icon={<FaWpforms className='text-yellow-600' />}
          helperText={'All time form submissions'}
          value={formData?.submissions?.toLocaleString() ?? '0'}
          loading={false}
          className='shadow-md shadow-yellow-600'
        />
        <StatsCard
          title={'Submission rate'}
          icon={<LuView className='text-green-600' />}
          helperText={'Visits that result in form submission'}
          value={submissionRate.toLocaleString() + '%' || '0'}
          loading={false}
          className='shadow-md shadow-green-600'
        />
        <StatsCard
          title={'Bounce rate'}
          icon={<LuView className='text-red-600' />}
          helperText={'Visits that leave without form interaction'}
          value={bounceRate.toLocaleString() + '%' || '0'}
          loading={false}
          className='shadow-md shadow-red-600'
        />
      </div>

      <div className='container pt-10'>
        <SubmissionTable id={id} />
      </div>
    </>
  );
};

export default FormDetailPage;
