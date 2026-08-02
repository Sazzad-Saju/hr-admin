import { Box }  from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
    return (
        <Box sx={{ m: "20px" }}>
            <Header title="PIE CHART" subtitle="Simple Pie Chart" />
            <Box sx={{ height: "75vh" }}>
                <PieChart />
            </Box>
        </Box>
    );
}

export default Pie;