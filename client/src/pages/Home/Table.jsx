import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

export default function LensTable({ lenses }) {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table
        sx={{ maxWidth: 1000, margin: "0 auto", marginTop: 3 }}
        aria-label="top lenses table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Lens Theme</TableCell>
            <TableCell align="left">Creator</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lenses.map((row) => (
            <TableRow
              onClick={() => navigate(`/lens/${row.id}`)}
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.creator}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
