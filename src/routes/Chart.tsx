import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import CandleChart from "react-apexcharts";
import LineChart from "react-apexcharts";
import { useState } from "react";

const Loder = styled.span`
    text-align: center;
    display: block;
`;

const ChartTab = styled.div` 
`;

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProp {
    coinId: string;
}


function Chart({ coinId }: ChartProp) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );
    // console.log(data);
    const [line, setLine] = useState(true);
    const toggleChart = () => {
        setLine((current) => !current);

    }
    const isDark = useRecoilValue(isDarkAtom);
    const exceptData = data ?? [];
    const chartData = exceptData?.map((price) => {
        return {
            x: price.time_close,
            y: [price.open, price.high, price.low, price.close],
        };
    }) as any;
    return (
        <div>
            {isLoading ? (<Loder>Loading .....</Loder>
            ) : (
                <ChartTab>
                    <button onClick={toggleChart}>{line ? "Line Chart" : "Candle Chart"} </button>
                    {line ? (
                        <CandleChart
                            type="candlestick"
                            // series={[
                            //     {
                            //         name: "price",
                            //         data: data?.map((price) => [new Date(price.time_close).getTime(), price.open, price.high, price.low, price.close,]) as any,
                            //     },
                            // ]}
                            series={[
                                {
                                    name: "price",
                                    data: chartData,
                                },
                            ]}
                            options={{
                                theme: {
                                    mode: isDark ? "dark" : "light",
                                },
                                chart: {
                                    width: 500,
                                    height: 500,
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent",
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width: 1,
                                },
                                grid: {
                                    show: false,
                                },
                                yaxis: {
                                    show: false,
                                },
                                xaxis: {
                                    axisTicks: {
                                        show: false,
                                    },
                                    axisBorder: {
                                        show: false,
                                    },
                                    labels: {
                                        show: false,
                                    },
                                    type: "datetime",
                                    categories: data?.map((price) => new Date(price.time_close).getTime()),
                                },
                                tooltip: {
                                    y: {
                                        formatter: (value) => `$${value.toFixed(4)}`
                                    }
                                }
                            }}
                        />
                    ) : (
                        <LineChart
                            type="line"
                            series={[
                                {
                                    name: "price",
                                    data: data?.map((price) => price.close) as number[],
                                },
                            ]}
                            options={{
                                theme: {
                                    mode: isDark ? "dark" : "light",
                                },
                                chart: {
                                    width: 500,
                                    height: 500,
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent",
                                },
                                stroke: {
                                    curve: 'smooth',
                                    width: 4,
                                },
                                grid: {
                                    show: false,
                                },
                                yaxis: {
                                    show: false,
                                },
                                xaxis: {
                                    axisTicks: {
                                        show: false,
                                    },
                                    axisBorder: {
                                        show: false,
                                    },
                                    labels: {
                                        show: false,
                                    },
                                    type: "datetime",
                                    categories: data?.map((price) => price.time_close),
                                },
                                fill: {
                                    type: "gradient",
                                    gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                                },
                                colors: ["#0fbcf9"],
                                tooltip: {
                                    y: {
                                        formatter: (value) => `$${value.toFixed(4)}`
                                    }
                                }
                            }}
                        />
                    )}
                </ChartTab>
            )}
        </div>
    );
}

export default Chart;