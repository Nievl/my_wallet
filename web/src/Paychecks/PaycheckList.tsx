import { Column } from 'react-table';
import { observer } from 'mobx-react-lite';
import { Button, Col, Row } from 'reactstrap';
import { viewState } from '../states/view';
import { IPaycheck } from '../../dto/Paycheck';
import { PaycheckState } from '../states/paycheck.state';
import { List } from '../CommonComponents/List';

const columns: Column<IPaycheck>[] = [
  {
    Header: 'date',
    accessor: (originalRow) => new Date(originalRow.date).toISOString(),
  },
  {
    Header: 'category',
    accessor: 'type',
  },
  {
    Header: 'amount',
    accessor: 'amount',
  },
  {
    Header: 'currency',
    accessor: 'salary',
  },
  {
    Header: 'description',
    accessor: 'description',
  },
];

export const PaycheckList = observer(() => {
  const data = PaycheckState.list;

  return (
    <>
      <h4>Операции</h4>
      <Row className="m-3">
        <Col xs={6}>
          <Button color="primary" onClick={() => viewState.showAddTransaction(true)}>
            Добавить
          </Button>
        </Col>
      </Row>
      <List columns={columns} data={data} pagination />
    </>
  );
});
