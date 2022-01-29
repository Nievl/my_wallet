import { Col, Table } from 'reactstrap';
import { ICurrency } from '../../dto/Currency';

interface Props {
  list: ICurrency[];
}

export const CurrencyList = ({ list }: Props) => (
  <Col xs="4">
    <h4>Currency</h4>
    <Table bordered hover>
      <thead>
        <tr>
          <td>id</td>
          <th>Имя</th>
        </tr>
      </thead>
      <tbody>
        {list.map((c) => (
          <tr key={c.uid}>
            <th>{c.uid}</th>
            <td>{c.NAME}</td>
          </tr>
        ))}
        {list.length === 0 && (
          <tr>
            <td colSpan={4}>нет данных</td>
          </tr>
        )}
      </tbody>
    </Table>
  </Col>
);
