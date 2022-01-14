import { usePagination, useSortBy, useTable } from 'react-table';
import { observer } from 'mobx-react-lite';
import { transactionState } from '../states/transaction';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap';
import { viewState } from '../states/view';
import { AddTransaction } from './AddTransaction';

interface Props {}

const columns = [
  {
    Header: 'date',
    accessor: 'dateCreate',
  },
  {
    Header: 'category',
    accessor: 'category.name',
  },
  {
    Header: 'amount',
    accessor: 'amount',
  },
  {
    Header: 'currency',
    accessor: 'currency.name',
  },
  {
    Header: 'description',
    accessor: 'description',
  },
];

export const TransactionsList = observer(({}: Props) => {
  const transactions = transactionState.transactions;
  const tableInstance = useTable(
    // @ts-ignore
    { columns, data: transactions, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const csv = ((e.target as HTMLFormElement)[0] as HTMLInputElement).files?.[0];
    const doubles = (e.target as HTMLFormElement).doubles.checked;
    if (csv) {
      let formData = new FormData();
      formData.append('file', csv);
      transactionState.upload(formData, doubles);
    }
  };
  return (
    <>
      <h4>Операции</h4>
      <Row className="m-3">
        <Col xs={6}>
          <Card body>
            <CardTitle>Загрузка CSV</CardTitle>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <InputGroup>
                  <Input type="file" id="input"></Input>
                  <Button color="primary" type="submit">
                    Загрузить csv
                  </Button>
                </InputGroup>
                <InputGroup className="mt-3">
                  <Input type="checkbox" id="doubles" className="mr-2"></Input>
                  <Label for="doubles" className="ml-2">
                    поиск дубля
                  </Label>
                </InputGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xs={6}>
          <Button color="primary" onClick={() => viewState.showAddTransaction(true)}>
            Добавить
          </Button>
        </Col>
      </Row>
      <table {...getTableProps()} className="table table-striped table-bordered ">
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <AddTransaction />
    </>
  );
});
