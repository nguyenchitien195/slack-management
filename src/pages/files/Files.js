import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  LinearProgress,
  TableRow,
  TableCell,
  Card,
  CardMedia,
  CardContent,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import { getFileFirstTime } from "../../redux/fileSlice";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Tables() {
  const classes = useStyles();

  const { token, isLoadedFirstTime, files } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoadedFirstTime: state.files.isLoadedFirstTime,
      files: state.files.files,
    };
  });
  const [rowsSelected, setRowsSelected] = useState([0,1,2,3,4]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadedFirstTime && token) {
      dispatch(getFileFirstTime(token));
    }
  }, []);

  return (
    <>
      <PageTitle title="Tables" />
      <LinearProgress variant="determinate" value={100} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={files}
            columns={[
              {
                name: "name",
                label: "Full Name",
              },
              {
                name: "filetype",
                label: "Type",
              },
              {
                name: "size",
                label: "Size",
              },
            ]}
            options={{
              filterType: "checkbox",
              rowsPerPage: 2,
              rowsPerPageOptions: [1, 2, 3],
              rowsSelected: rowsSelected,
              customRowRender: (data, dataIndex, rowIndex) => {
                return (
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox />
                    </TableCell>
                    <TableCell align="left">{files[dataIndex].name}</TableCell>
                    <TableCell align="left">{files[dataIndex].filetype}</TableCell>
                    <TableCell align="left">{files[dataIndex].size}</TableCell>
                  </TableRow>
                );
              },
              selectableRows: "multiple",
              selectableRowsOnClick: true,
              // customToolbarSelect: (
              //   selectedRows,
              //   displayData,
              //   setSelectedRows,
              // ) => {
              //   console.log(
              //     "-------",
              //     selectedRows,
              //     displayData,
              //   );
              // },
              isRowSelectable: (dataIndex, selectedRows) => {
                // console.log("---", dataIndex, selectedRows);
                //prevents selection of any additional row after the third
                // if (selectedRows.data.length > 2 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
                //prevents selection of row with title "Attorney"
                return files[dataIndex].name !== "girl2.jpg";
              },
              onRowSelectionChange: (
                rowsSelectedData,
                allRows,
                rowsSelected,
              ) => {
                console.log(rowsSelectedData, allRows, rowsSelected);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
