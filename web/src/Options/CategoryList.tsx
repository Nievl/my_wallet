import { Col, Table } from 'reactstrap';
import { ICategory } from '../../dto/Category';

interface Props {
  list: ICategory[];
}

export const CategoryList = ({ list }: Props) => {
  return (
    <Col xs="4">
      <h4>Category</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Имя</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.uid}>
              <td>{c.uid}</td>
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
};
