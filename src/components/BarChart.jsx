import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData } from "../data/mocData";


const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = mockBarData;


    return (
        <Box sx={{ width: "100%", height: "500px" }}>
            <ResponsiveBar
                data={mockBarData}
                keys={["hot dog", "burger", "kebab", "donut"]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
                padding={0.3}
                enableLabel={false}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                }}
                axisBottom={{
                    legend: isDashboard ? undefined : "country",
                    legendPosition: "middle",
                    legendOffset: 40,
                }}
                axisLeft={{
                    legend: isDashboard ? undefined : "food",
                    legendPosition: "middle",
                    legendOffset: -45,
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        translateX: 120,
                        itemsSpacing: 3,
                        itemWidth: 100,
                        itemHeight: 16,
                    },
                ]}
            />
        </Box>
    )
}

export default BarChart;