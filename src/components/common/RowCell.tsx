import { ReactNode } from 'react';
import { ElementsType } from '../../types/form';
import { TableCell } from '@/components/ui/table';

const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
  const node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
};

export default RowCell;
