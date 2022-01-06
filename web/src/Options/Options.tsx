import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { categorysState } from '../states/category';
import { currencysState } from '../states/currensy';
import { viewState } from '../states/view';
import { AddOption } from './AddOption';

export const Options = observer(() => {
  const _loadCategory = () => {
    currencysState.getAll();
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
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {categorysState.list.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Button color="danger" onClick={() => categorysState.remove(c.id)}>
                      x
                    </Button>
                  </td>
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
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {currencysState.list.map((c) => (
                <tr key={c.id}>
                  <th>{c.id}</th>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Button color="danger" onClick={() => currencysState.remove(c.id)}>
                      x
                    </Button>
                  </td>
                </tr>
              ))}
              {currencysState.list.length === 0 && (
                <tr>
                  <td colSpan={4}>нет данных</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <AddOption />
      </Row>
    </div>
  );
});
