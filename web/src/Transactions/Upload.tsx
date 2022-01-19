import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { uploadOptions } from '../../dto/Transaction';
import { transactionState } from '../states/transaction';

export const Upload = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const csv = ((e.target as HTMLFormElement)[0] as HTMLInputElement).files?.[0];
    const doubles: uploadOptions = (e.target as HTMLFormElement).doubles.value;
    if (csv) {
      let formData = new FormData();
      formData.append('file', csv);
      transactionState.upload(formData, doubles);
    }
  };
  return (
    <Col xs={6}>
      <Card body>
        <CardTitle>Загрузка CSV</CardTitle>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Input type="file" id="input" accept=".csv" />
              <Button color="primary" type="submit">
                Загрузить csv
              </Button>
            </InputGroup>
            поиск дубля
            <FormGroup check>
              <Label for="base" className="ml-2">
                запись в БД
                <Input type="radio" name="doubles" className="mr-2" value="base" id="base" />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="doubles" className="ml-2" defaultChecked>
                поиск дублей
                <Input type="radio" name="doubles" className="mr-2" value="doubles" id="doubles" />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="save" className="ml-2">
                сохранить на диск
                <Input type="radio" name="doubles" className="mr-2" value="save" id="save" />
              </Label>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};
