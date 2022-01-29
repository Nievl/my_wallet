import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';
import { CategorysState } from '../states/category.state';
import { CurrenciesState } from '../states/currency.state';
import { viewState } from '../states/view';
import { CategoryList } from './CategoryList';
import { CurrencyList } from './CurrencyList';

export const Options = observer(() => {
  const _loadCategory = () => {
    viewState.initialReq();
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
        <CategoryList list={CategorysState.list} />
        <CurrencyList list={CurrenciesState.list} />
      </Row>
    </div>
  );
});
