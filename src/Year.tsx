import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { _year } from "./variables";
import { Month } from "./Month";

type Iprops = {};

export const Year = ({}: Iprops) => {
  return (
    <>
      
      <TableContainer component={Paper} style={{ height: "100%" }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Month</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">Worked Days</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(_year).map((month) => (
              <Month key={month.id} row={month} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
