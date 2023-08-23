import {styled} from "@mui/material/styles";
import { Box} from "@mui/material";
import React from "react";
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}) as typeof Box;

export default FlexBetween