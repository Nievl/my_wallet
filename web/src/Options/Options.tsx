import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { categorysState } from '../states/category';
import { currenciesState } from '../states/currency';
import { viewState } from '../states/view';

export const Options = observer(() => {
  const _loadCategory = () => {
    currenciesState.getAll();
    categorysState.getAll();
  };

  return (
    <div>
      <Col xs={4} className="m-3">
        <ButtonGroup>
          <Button color="primary" onClick={_loadCategory}>
            Запросить
          </Button>
          <Button color="primary" onClick={() => viewState.showAddOption(true)}>
            Добавить
          </Button>
        </ButtonGroup>
      </Col>
      <Row>
        <Col xs="4">
          <h4>Category</h4>
          <Table bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Имя</th>
              </tr>
            </thead>
            <tbody>
              {categorysState.list.map((c) => (
                <tr key={c.uid}>
                  <td>{c.uid}</td>
                  <td>{c.NAME}</td>
                </tr>
              ))}
              {categorysState.list.length === 0 && (
                <tr>
                  <td colSpan={4}>нет данных</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col xs="4">
          <h4>Currensy</h4>
          <Table bordered hover>
            <thead>
              <tr>
                <td>id</td>
                <th>Имя</th>
              </tr>
            </thead>
            <tbody>
              {currenciesState.list.map((c) => (
                <tr key={c.uid}>
                  <th>{c.uid}</th>
                  <td>{c.NAME}</td>
                </tr>
              ))}
              {currenciesState.list.length === 0 && (
                <tr>
                  <td colSpan={4}>нет данных</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
});
