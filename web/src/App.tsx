import { useState } from 'react';
import { TransactionsList } from './Transactions/TransactionsList';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Options } from './Options/Options';

const App = () => {
  const [key, setKey] = useState('transactions');

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
        <Toast>
          <ToastHeader toggle={function noRefCheck() {}}>Toast title</ToastHeader>
          <ToastBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </ToastBody>
        </Toast>
      </Col>
    </Row>
  );
};

export default App;
