import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "../../state/api";
import Header from "../../components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../state/geoData";

const Geography = () => {
    const theme = useTheme();
    const { data } = useGetGeographyQuery(1);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subTitle="Find where your users are located." />
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary.main}`}
                borderRadius="4px"
                position={'relative'}
            >
                {data ? (
                    <>
                        <ResponsiveChoropleth
                            data={data}
                            theme={{
                                axis: {
                                    domain: {
                                        line: {
                                            stroke: theme.palette.secondary.main,
                                        },
                                    },
                                    legend: {
                                        text: {
                                            fill: theme.palette.secondary.main,
                                        },
                                    },
                                    ticks: {
                                        line: {
                                            stroke: theme.palette.secondary.main,
                                            strokeWidth: 1,
                                        },
                                        text: {
                                            fill: theme.palette.secondary.main,
                                        },
                                    },
                                },
                                legends: {
                                    text: {
                                        fill: theme.palette.secondary.main,
                                    },
                                },
                                tooltip: {
                                    container: {
                                        color: theme.palette.primary.main,
                                    },
                                },
                            }}
                            features={geoData.features}
                            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                            domain={[0, 60]}
                            unknownColor="#666666"
                            label="properties.name"
                            valueFormat=".2s"
                            projectionScale={150}
                            projectionTranslation={[0.45, 0.6]}
                            projectionRotation={[0, 0, 0]}
                            borderWidth={1.3}
                            borderColor="#ffffff"
                            legends={[
                                {
                                    anchor: "bottom-right",
                                    direction: "column",
                                    justify: true,
                                    translateX: 0,
                                    translateY: -125,
                                    itemsSpacing: 0,
                                    itemWidth: 94,
                                    itemHeight: 18,
                                    itemDirection: "left-to-right",
                                    itemTextColor: theme.palette.secondary.main,
                                    itemOpacity: 0.85,
                                    symbolSize: 18,
                                    effects: [
                                        {
                                            on: "hover",
                                            style: {
                                                itemTextColor: theme.palette.background.paper,
                                                itemOpacity: 1,
                                            },
                                        },
                                    ],
                                },
                            ]}
                        />
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: -1,
                                content: "''",
                                background: theme.palette.background.paper,
                                filter: 'brightness(70%)',
                            }}
                        /></>
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

export default Geography;