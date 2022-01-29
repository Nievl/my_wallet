import { observer } from 'mobx-react-lite';
import { Column } from 'react-table';
import { Button, Col, Row } from 'reactstrap';
import { ICompany } from '../../dto/Company';
import { List } from '../CommonComponents/List';
import { CompanyState } from '../states/company.state';
import { viewState } from '../states/view';

const columns: Column<ICompany>[] = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'Имя',
    accessor: 'name',
  },
  {
    Header: 'Должность',
    accessor: 'position',
  },
  {
    Header: 'description',
    accessor: 'description',
  },
];

export const CompanyList = observer(() => {
  const data = CompanyState.list;
  return (
    <>
      <h4>Company</h4>
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
