import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../state/api";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

const Daily = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [startDate, setStartDate] = useState<Value>(new Date("2021-02-01"));
    const [endDate, setEndDate] = useState<Value>(new Date("2021-03-01"));
    const { data } = useGetSalesQuery(1);
    const theme = useTheme();

    const [formattedData] = useMemo(() => {
        if (!data) return [];

        const { dailyData } = data;
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

        Object.values(dailyData as IDaily).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date);
            if (!startDate || !endDate || (dateFormatted >= startDate && dateFormatted <= endDate)) {
                const splitDate = date.substring(date.indexOf("-") + 1);

                totalSalesLine.data.push({ x: splitDate, y: totalSales });
                totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
            }
        });

        const formattedData = [[totalSalesLine, totalUnitsLine]];
        return formattedData;
    }, [data, startDate, endDate]);
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="DAILY SALES" subTitle="Chart of daily sales" />
            <Box height="75vh">
                <Box display="flex" justifyContent="flex-end">
                    <Box>
                        <DatePicker
                            onChange={setStartDate}
                            value={startDate}
                        />
                    </Box>
                    <Box>
                        <DatePicker
                            onChange={setEndDate}
                            value={endDate}
                        />
                    </Box>
                </Box>

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
                            stacked: true,
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
                            legend: 'Months',
                            legendOffset: 60,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Total',
                            legendOffset: -50,
                            legendPosition: 'middle'
                        }}
                        curve={'cardinal'}
                        colors={{ scheme: 'dark2' }}
                        pointSize={4}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={5}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={10}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 0.2,
                                            itemTextColor: theme.palette.secondary.light,
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

export default Daily;

interface ITotalDataLine {
    id: string;
    color: string;
    data: DataPoint[];
}

interface DataPoint {
    x: string;
    y: number;
}
interface IDaily {
    date: string;
    totalSales: number;
    totalUnits: number;
}