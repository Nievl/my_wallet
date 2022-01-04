import { useState } from 'react';
import { uploadCsv } from './controllers/upload';
import { result } from '../dto/result';
import { Transaction } from '../dto/transaction';
import { TransactionsList } from './Table/TransactionsList';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';

const App = () => {
  const [key, setKey] = useState('upload');
  const [data, setData] = useState<Transaction[]>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const csv = ((e.target as HTMLFormElement)[0] as HTMLInputElement).files?.[0];
    if (csv) {
      let formData = new FormData();

      formData.append('file', csv);
      uploadCsv(formData).then((res: result<Transaction[]>) => setData(res.data));
    }
  };

  return (
    <Row>
      <Col sm="10">
        <Nav tabs>
          <NavItem>
            <NavLink className="active" onClick={() => setKey('upload')}>
              Загрузка
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="" onClick={() => setKey('transactions')}>
              More Tabs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={key}>
          <TabPane tabId="upload">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Загрузка CSV</CardTitle>
                  <CardText>
                    <form onSubmit={onSubmit}>
                      <input type="file" id="input"></input>
                      <Button variant="primary" type="submit">
                        Загрузить csv
                      </Button>
                    </form>
                  </CardText>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="transactions">
            <Row>
              <Col sm="12">
                <h4>Операции</h4>
                <TransactionsList transactions={data} />
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
