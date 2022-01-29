import { Col, ListGroup, ListGroupItem } from 'reactstrap';
import { IPaycheckType } from '../../dto/Paycheck';

interface Props {
  list: IPaycheckType[];
}

export const PaycheckTypesList = ({ list }: Props) => (
  <Col xs="4">
    <h4>Paycheck Types</h4>
    <ListGroup numbered>
      {list.map((c) => (
        <ListGroupItem key={c.id}>{c.name}</ListGroupItem>
      ))}
      {list.length === 0 && <ListGroupItem>нет данных</ListGroupItem>}
    </ListGroup>
  </Col>
);
