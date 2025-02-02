import { ReactNode } from 'react';
import { ElementsType } from '../../types/form';
import { TableCell } from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';

const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
  let node: ReactNode = value;
  switch (type) {
    case 'DateField': {
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyy')}</Badge>;
      break;
    }
    case 'CheckboxField': {
      const checked = value === 'true';
      node = <Checkbox checked={checked} disabled />;
    }
  }
  return <TableCell>{node}</TableCell>;
};

export default RowCell;
