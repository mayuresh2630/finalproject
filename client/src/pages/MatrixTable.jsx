import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default function MatrixTable({ tableData }) {
  return (
    <div>
      <Container maxWidth="">
        <Typography
          style={{
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
         
          <table>
            <tr>
              <th>Sr No</th>
              <th>Joining Date</th>
              <th>Employee Name</th>
              <th>Emp Code</th>
              <th>Qualification</th>
              <th>Company</th>
            </tr>
            {tableData &&
              tableData.map((data,$index) => (
                <tr>
                  <td>{[$index + 1]}</td>
                  <td>{data.DOJ}</td>
                  <td>{data["EMPLOYEE NAME"]}</td>
                  <td>{data["EMP CODE"]}</td>
                  <td>{data["EDUCATION"]}</td>
                  <td>{data["CONTRACTOR"]}</td>
                </tr>
              ))}
          </table>
        </Typography>
      </Container>
    </div>
  );
}