import { Column } from 'react-table';
import { observer } from 'mobx-react-lite';
import { TransactionState } from '../states/transaction.state';
import { Button, Col, Row } from 'reactstrap';
import { viewState } from '../states/view';
import { AddTransaction } from './AddTransaction';
import { IinOutCome } from '../../dto/Transaction';
import { List } from '../CommonComponents/List';

const columns: Column<IinOutCome>[] = [
  {
    Header: 'date',
    accessor: (originalRow) => new Date(originalRow.UTIME).toISOString(),
  },
  {
    Header: 'category',
    accessor: 'NAME',
  },
  {
    Header: 'amount',
    accessor: 'AMOUNT_ACCOUNT',
  },
  {
    Header: 'currency',
    accessor: 'currencyUid',
  },
  {
    Header: 'description',
    accessor: 'ZCONTENT',
  },
];

export const TransactionsList = observer(() => {
  const data = TransactionState.list;

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

      <AddTransaction />
    </>
  );
});
