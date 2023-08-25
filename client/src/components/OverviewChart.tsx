import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "../state/api";



const OverviewChart: React.FC<IOverviewChartProps> = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery(1);
    const [ salesMin, setSalesMin] = useState<number>(Number.MAX_VALUE);
    const [ unitsMin, setUnitsMin] = useState<number>(Number.MAX_VALUE);
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [[], []];

        const { monthlyData } = data;
        const totalSalesLine: ITotalDataLine = {
            id: "totalSales",
            color: 'red',
            data: []
        };
        const totalUnitsLine: ITotalDataLine = {
            id: "totalUnits",
            color: theme.palette.secondary.main,
            data: []
        };
        var salesMin = Number.MAX_VALUE;
        var unitsMin = Number.MAX_VALUE;
        Object.values(monthlyData as IMonthly).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                salesMin = Math.min(salesMin, curSales)
                unitsMin = Math.min(unitsMin, curUnits)
                totalSalesLine.data.push({ x: month, y: curSales });
                totalUnitsLine.data.push({ x: month, y: curUnits });

                return { sales: curSales, units: curUnits };
            },
            { sales: 0, units: 0 }
        );
        setSalesMin(salesMin);
        setUnitsMin(unitsMin);
        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]);
    if (!data || isLoading) return <>Loading...</>;

    return (
        <ResponsiveLine
            data={view === 'sales' ? totalSalesLine : totalUnitsLine}
            margin={isDashboard ? 
                { top: 20, right: 50, bottom: 50, left: 70 } :
                { top: 20, right: 110, bottom: 50, left: 70 }}
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
            enableArea={true}
            areaOpacity={0.2}
            enableGridX={false}
            enableGridY={false}
            areaBaselineValue={view === 'sales'? salesMin : unitsMin}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: isDashboard ? -90 : 0,
                legend: 'Months',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: isDashboard ? 5 : 10,
                legend: isDashboard ? '' : `Total ${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            curve={isDashboard ? 'linear' : 'cardinal'}
            colors={{ scheme: 'dark2' }}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={5}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={10}
            useMesh={true}
            legends={
                !isDashboard ? 
                [
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        itemTextColor: theme.palette.secondary.light,
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
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
                ] : undefined
            } />
    );
};

export default OverviewChart;


interface IOverviewChartProps {
    view?: string;
    isDashboard?: boolean;
}
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
    month: string;
    totalSales: number;
    totalUnits: number;
}