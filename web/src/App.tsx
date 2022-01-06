import { useEffect, useState } from 'react';
import { TransactionsList } from './Transactions/TransactionsList';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Options } from './Options/Options';
import { ErrorsFeed } from './ErrorsFeed/ErrorsFeed';
import { viewState } from './states/view';

const App = () => {
  const [key, setKey] = useState('transactions');
  useEffect(() => {
    viewState.initialReq();
  }, []);
  return (
    <Row style={{ maxWidth: '100vw' }}>
      <Col sm="10">
        <Nav tabs>
          <NavItem>
            <NavLink onClick={() => setKey('transactions')}>Операции</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => setKey('options')}>Настройки</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={key}>
          <TabPane tabId="transactions">
            <Row>
              <Col sm="12" className="m-3">
                <TransactionsList />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="options">
            <Row>
              <Col sm="12" className="m-3">
                <Options />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
      <Col sm="2">
        <ErrorsFeed />
      </Col>
    </Row>
  );
};

export default App;
