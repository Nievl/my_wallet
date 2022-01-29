import { Column } from 'react-table';
import { Button, Col, Row } from 'reactstrap';
import { List } from '../CommonComponents/List';
import { viewState } from '../states/view';
import { SalaryState } from '../states/salary.state';
import { ISalary } from '../../dto/Salary';

const columns: Column<ISalary>[] = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'Имя',
    accessor: 'company',
  },
  {
    Header: 'Gross',
    accessor: 'gross',
  },
  {
    Header: 'Net',
    accessor: 'net',
  },
  {
    Header: 'description',
    accessor: 'description',
  },
];

export const SalaryList = () => {
  const data = SalaryState.list;
  return (
    <>
      <h4>Salary</h4>
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
};
