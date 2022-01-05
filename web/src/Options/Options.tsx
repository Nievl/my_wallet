import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { categorysState } from '../states/category';
import { currencysState } from '../states/currensy';
import { modalsState } from '../states/modals';
import { AddOption } from './AddOption';

export const Options = observer(() => {
  const _loadCategory = () => {
    currencysState.getAll();
    categorysState.getAll();
  };

  return (
    <div>
      <Col xs={4}>
        <ButtonGroup className="m-3">
          <Button color="primary" onClick={_loadCategory}>
            Запросить
          </Button>
          <Button color="primary" onClick={() => modalsState.showAddOption(true)}>
            Добавить
          </Button>
        </ButtonGroup>
      </Col>
      <Row>
        <Col xs="4">
          <h4>Category</h4>
          <Table bordered hover className="m-3">
            <thead>
              <tr>
                <th>id</th>
                <th>Имя</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {categorysState.category.map((c) => (
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
              {categorysState.category.length === 0 && (
                <tr>
                  <td colSpan={4}>нет данных</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col xs="4">
          <h4>Currensy</h4>
          <Table bordered hover className="m-3">
            <thead>
              <tr>
                <td>id</td>
                <th>Имя</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              {currencysState.currency.map((c) => (
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
              {currencysState.currency.length === 0 && (
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
