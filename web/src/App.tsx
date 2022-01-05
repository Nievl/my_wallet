import { useState } from 'react';
import { uploadCsv } from './controllers/upload';
import { IresultWithData } from '../dto/result';
import { ITransaction } from '../dto/Transaction';
import { TransactionsList } from './Transactions/TransactionsList';
import {
  Button,
  Card,
  CardBody,
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
import { Options } from './Options/Options';

const App = () => {
  const [key, setKey] = useState('upload');
  const [data, setData] = useState<ITransaction[]>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const csv = ((e.target as HTMLFormElement)[0] as HTMLInputElement).files?.[0];
    if (csv) {
      let formData = new FormData();

      formData.append('file', csv);
      uploadCsv(formData).then((res: IresultWithData<ITransaction[]>) => setData(res.data));
    }
  };

  return (
    <Row style={{ maxWidth: '100vw' }}>
      <Col sm="10">
        <Nav tabs>
          <NavItem>
            <NavLink className="active" onClick={() => setKey('upload')}>
              Загрузка
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="" onClick={() => setKey('transactions')}>
              Операции
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="" onClick={() => setKey('options')}>
              Настройки
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={key}>
          <TabPane tabId="upload">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Загрузка CSV</CardTitle>
                  <CardBody>
                    <form onSubmit={onSubmit}>
                      <input type="file" id="input"></input>
                      <Button variant="primary" type="submit">
                        Загрузить csv
                      </Button>
                    </form>
                  </CardBody>
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
          <TabPane tabId="options">
            <Row>
              <Col sm="12">
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
