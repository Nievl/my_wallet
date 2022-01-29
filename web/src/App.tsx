import { useEffect, useState } from 'react';
import { TransactionsList } from './Transactions/TransactionsList';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Options } from './Options/Options';
import { ErrorsFeed } from './ErrorsFeed/ErrorsFeed';
import { viewState } from './states/view';
import { PaycheckList } from './Paychecks/PaycheckList';
import { CompanyList } from './Company/CompanyList';
import { SalaryList } from './Salary/SalaryList';

const tabs = [
  {
    key: 'transactions',
    name: 'Операции',
    component: <TransactionsList />,
  },
  {
    key: 'paychecks',
    name: 'Платежки',
    component: <PaycheckList />,
  },
  {
    key: 'company',
    name: 'Компании',
    component: <CompanyList />,
  },
  {
    key: 'salary',
    name: 'Зарплаты',
    component: <SalaryList />,
  },
  {
    key: 'options',
    name: 'Настройки',
    component: <Options />,
  },
];

const App = () => {
  const [key, setKey] = useState('transactions');
  useEffect(() => {
    viewState.initialReq();
  }, []);
  return (
    <Row style={{ maxWidth: '100vw' }}>
      <Col sm="10">
        <Nav tabs>
          {tabs.map((tab) => (
            <NavItem>
              <NavLink onClick={() => setKey(tab.key)}>{tab.name}</NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={key}>
          {tabs.map((tab) => (
            <TabPane tabId={tab.key}>
              <Row>
                <Col sm="12" className="m-3">
                  {tab.component}
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </Col>
      <Col sm="2">
        <ErrorsFeed />
      </Col>
    </Row>
  );
};

export default App;
