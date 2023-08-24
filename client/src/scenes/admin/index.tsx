import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAdminsQuery } from "../../state/api";

const Admin: React.FC = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetAdminsQuery(1);

    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
            },
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="CUSTOMERS" subTitle="List of Customers" />
            {data ?
                <Box
                    mt="40px"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.secondary.light,
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.secondary.light,
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary.main} !important`,
                        },
                    }}
                >
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={data || []}
                        columns={columns}
                    />
                </Box>
                : <>Loading...</>
            }
        </Box>
    );
};

export default Admin;