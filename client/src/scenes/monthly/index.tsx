import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../state/api";

const Monthly: React.FC = () => {
    const { data } = useGetSalesQuery(1);
    const theme = useTheme();

    const [formattedData] = useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine: ITotalDataLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: ITotalDataLine = {
            id: "totalUnits",
            color: theme.palette.secondary.dark,
            data: [],
        };

        Object.values(monthlyData as IMonthly).forEach(({ month, totalSales, totalUnits }) => {
            totalSalesLine.data.push({ x: month, y: totalSales });
            totalUnitsLine.data.push({ x: month, y: totalUnits });
        });

        const formattedData = [[totalSalesLine, totalUnitsLine]];
        return formattedData;
    }, [data]);
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Monthly SALES" subTitle="Chart of monthly sales" />
            <Box height="75vh">
                {data ? (
                    <ResponsiveLine
                        data={formattedData}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
                                    fill: theme.palette.primary.light,
                                },
                            },
                            tooltip: {
                                container: {
                                    color: theme.palette.common.black,
                                },
                            },
                        }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: "Month",
                            legendOffset: 60,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Total",
                            legendOffset: -50,
                            legendPosition: "middle",
                        }}
                        curve={'cardinal'}
                        colors={{ scheme: 'dark2' }}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: "top-right",
                                direction: "column",
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: "left-to-right",
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: "circle",
                                itemTextColor: theme.palette.secondary.light,
                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1,
                                            itemTextColor: theme.palette.secondary.main,
                                        }
                                    }
                                ]
                            }
                        ]} />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

export default Monthly;

interface ITotalDataLine {
    id: string;
    color: string;
    data: DataPoint[];
}

interface DataPoint {
    x: string;
    y: number;
}
interface IMonthly {
    date: string;
    totalSales: number;
    totalUnits: number;
}