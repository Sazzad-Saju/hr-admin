import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockTransactions } from "../../data/mocData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { Bar } from "@nivo/bar";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ m: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
            </Box>

            {/* Dashboard Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "140px", gap: "20px" }}>
                {/* Row 1 */}
                <Box sx={{ gridColumn: "span 3", backgroundColor: colors.primary[400], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StatBox
                        title="12,361"
                        subtitle="Emails Sent"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box sx={{ gridColumn: "span 3", backgroundColor: colors.primary[400], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.5"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box sx={{ gridColumn: "span 3", backgroundColor: colors.primary[400], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StatBox
                        title="32,441"
                        subtitle="New Clients"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box sx={{ gridColumn: "span 3", backgroundColor: colors.primary[400], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Inbound"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>


                {/* ROW 2 */}
                <Box
                    sx={{
                        gridColumn: "span 8",
                        gridRow: "span 2",
                        backgroundColor: colors.primary[400],
                        minWidth: 0,
                    }}
                >
                    <Box sx={{
                        mt: "25px",
                        px: "30px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                Revenue Generated
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" sx={{ color: colors.greenAccent[500]}}>
                                $59,342,32
                            </Typography>
                        </Box>
                        <IconButton>
                            <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ height: "250px", mt: "-20px" }}>
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                {/* Transactions */}
                <Box sx={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], overflow: "auto", minWidth: 0, }}>
                    <Box sx={{
                        borderBottom: `4px solid ${colors.primary[500]}`,
                        p: "15px",
                    }}>
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction, i) => (
                        <Box key={`${transaction.txId}-${i}`} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `4px solid ${colors.primary[500]}`, p: "15px", gap: "10px", }}>
                            <Box>
                                <Typography sx={{ color: colors.greenAccent[500]}} variant="h5" fontWeight="600">
                                    {transaction.txId}
                                </Typography>
                                <Typography sx={{ color: colors.grey[100]}}>
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: colors.grey[100] }}>
                                {transaction.date}
                            </Typography>
                            <Box sx={{ backgroundColor: colors.greenAccent[500], p: "5px 10px", borderRadius: "4px" }}>
                                ${transaction.cost}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* row 3 */}
                <Box sx={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], p: "30px" }}>
                    <Typography variant="h5" fontWeight="600">
                        Campaign
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "25px" }}>
                        <ProgressCircle progress="0.75" size="125" />
                        <Typography variant="h5" sx={{ color: colors.greenAccent[500], mt: "15px" }}>
                            $48,352 revenue generated
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            Includes extra misc expenditures and costs
                        </Typography>
                    </Box> 
                </Box>

                {/* final */}
                <Box sx={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400] }}>
                    <Typography variant="h5" fontWeight="600" sx={{ p: "30px 30px 0 30px" }}>
                        Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px" sx={{ height: "250px", mt: "-20px" }}>
                        <BarChart isDashboard={true} />
                    </Box> 
                </Box>

                <Box sx={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], p: "30px" }}>
                    <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
                        Geography Based Traffic
                    </Typography>
                    <Box sx={{ height: "200px" }}>
                        <GeographyChart isDashboard={true} />
                    </Box> 
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;