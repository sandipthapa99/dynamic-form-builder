import { GetFormWithSubmissions } from '@/actions/form';
import {
  ElementsType,
  FormElementInstance,
  FormResponseType,
} from '@/types/form';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { formatDistance } from 'date-fns';
import RowCell from './RowCell';

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const SubmissionTable = ({ id }: { id: string | undefined }) => {
  const { user } = useUser();
  const [formsData, setFormsData] = useState<
    {
      FormSubmissions: {
        id: string;
        createdAt: string;
        formId: number;
        content: string;
      }[];
    } & FormResponseType
  >();

  useEffect(() => {
    const getForms = async () => {
      if (!user?.id) return;
      const form = await GetFormWithSubmissions(id);
      setFormsData(form);
    };
    getForms();
  }, [user?.id, id]);

  const formElements = (formsData?.content as FormElementInstance[]) ?? [];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  formsData?.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });
  return (
    <>
      <h1 className='text-2xl font-bold my-4'>Submissions</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.id} className='uppercase'>
                  {col.label}
                </TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right uppercase'>
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <RowCell key={col.id} type={col.type} value={row[col.id]} />
                ))}
                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubmissionTable;
