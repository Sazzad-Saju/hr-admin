import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";

const DepartmentPieChart = ({ data = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalEmployees = data.reduce(
    (total, department) => total + Number(department.value || 0),
    0
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <ResponsivePie
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 75,
          left: 20,
        }}
        innerRadius={0.64}
        padAngle={1.5}
        cornerRadius={4}
        activeOuterRadiusOffset={7}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={12}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2.5]],
        }}
        valueFormat={(value) => `${value} employees`}
        theme={{
          tooltip: {
            container: {
              background: colors.primary[400],
              color: colors.grey[100],
              fontSize: "13px",
              borderRadius: "4px",
            },
          },
          legends: {
            text: {
              fill: colors.grey[200],
              fontSize: 11,
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 65,
            itemsSpacing: 4,
            itemWidth: 95,
            itemHeight: 18,
            itemTextColor: colors.grey[200],
            itemDirection: "left-to-right",
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
      />

      <Box
        sx={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="700"
          color={colors.grey[100]}
        >
          {totalEmployees}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colors.grey[300],
          }}
        >
          Employees
        </Typography>
      </Box>
    </Box>
  );
};

export default DepartmentPieChart;