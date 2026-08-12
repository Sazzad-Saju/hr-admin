import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import DepartmentPieChart from "../../components/DepartmentPieChart";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const contacts = [
  {
    id: 1,
    name: "Sazzad Hossain Saju",
    designation: "Web Developer",
    department: "IT",
    phone: "01766601932",
    email: "saju.cse.hstu@gmail.com",
    initials: "SH",
  },
  {
    id: 2,
    name: "Farhana Rahman",
    designation: "Sales Manager",
    department: "Sales & Marketing",
    phone: "01711000001",
    email: "farhana@company.com",
    initials: "FR",
  },
  {
    id: 3,
    name: "Imran Ahmed",
    designation: "Corporate Sales Head",
    department: "Corporate Sales",
    phone: "01711000002",
    email: "imran@company.com",
    initials: "IA",
  },
  {
    id: 4,
    name: "Tanvir Islam",
    designation: "Supply Chain Manager",
    department: "Supply Chain",
    phone: "01711000003",
    email: "tanvir@company.com",
    initials: "TI",
  },
];

const teams = [
  {
    id: 1,
    name: "Sales & Marketing",
    head: "Farhana Rahman",
    members: 20,
  },
  {
    id: 2,
    name: "Corporate Sales",
    head: "Imran Ahmed",
    members: 14,
  },
  {
    id: 3,
    name: "Supply Chain",
    head: "Tanvir Islam",
    members: 12,
  },
  {
    id: 4,
    name: "Information Technology",
    head: "Mahmud Hasan",
    members: 10,
  },
];

const SummaryCard = ({
  title,
  value,
  note,
  icon,
  colors,
  noteColor,
}) => {
  return (
    <Box
      sx={{
        gridColumn: {
          xs: "span 12",
          sm: "span 6",
          lg: "span 3",
        },
        minHeight: "145px",
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
        p: "22px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "15px",
        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
            color: colors.grey[300],
            mb: "8px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h2"
          fontWeight="700"
          sx={{
            color: colors.grey[100],
            mb: "9px",
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: noteColor || colors.grey[300],
            fontWeight: "600",
          }}
        >
          {note}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "48px",
          height: "48px",
          flexShrink: 0,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.blueAccent[700],
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTime, setCurrentTime] = useState(new Date());

  const leaveRequests = [
    {
      id: 1,
      employee: "H/O-303 · Sazzad",
      department: "IT",
      leaveType: "Casual Leave",
      days: 2,
      headStatus: "Approved",
      hrStatus: "Pending",
    },
    {
      id: 2,
      employee: "H/O-291 · Nusrat",
      department: "Accounts",
      leaveType: "Sick Leave",
      days: 1,
      headStatus: "Pending",
      hrStatus: "Waiting",
    },
    {
      id: 3,
      employee: "H/O-278 · Farhan",
      department: "Sales",
      leaveType: "Earned Leave",
      days: 3,
      headStatus: "Approved",
      hrStatus: "Approved",
    },
    {
      id: 4,
      employee: "H/O-312 · Rafiq",
      department: "Supply Chain",
      leaveType: "Emergency Leave",
      days: 1,
      headStatus: "Pending",
      hrStatus: "Pending",
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const monthName = currentTime.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const departmentData = [
    {
      id: "Sales",
      label: "Sales",
      value: 20,
      color: colors.greenAccent[500],
    },
    {
      id: "Corporate",
      label: "Corporate",
      value: 14,
      color: colors.blueAccent[500],
    },
    {
      id: "IT",
      label: "IT",
      value: 10,
      color: colors.greenAccent[300],
    },
    {
      id: "Supply Chain",
      label: "Supply Chain",
      value: 12,
      color: colors.blueAccent[300],
    },
    {
      id: "Accounts",
      label: "Accounts",
      value: 9,
      color: colors.greenAccent[700],
    },
    {
      id: "Management",
      label: "Management",
      value: 10,
      color: colors.blueAccent[700],
    },
  ];

  return (
    <Box sx={{ m: "20px" }}>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: "15px",
          mb: "25px",
        }}
      >
        <Header
          title="HR DASHBOARD"
          subtitle="Employee, leave and salary overview"
        />

        <Button
          variant="contained"
          startIcon={<DownloadOutlinedIcon />}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            px: "20px",
            py: "10px",

            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Download HR Report
        </Button>
      </Box>

      {/* Dashboard grid */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            gridColumn: "span 12",
            background: `linear-gradient(135deg, ${colors.blueAccent[700]} 0%, ${colors.primary[400]} 100%)`,
            borderRadius: "16px",
            p: { xs: "20px", sm: "24px" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{ color: colors.grey[100], mb: "6px" }}
            >
              {monthName} HR Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.grey[300] }}
            >
              Monthly snapshot of leave activity, workforce health, and team progress for {monthName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Chip
              label="Live Now"
              sx={{
                color: colors.greenAccent[300],
                backgroundColor: "rgba(76, 206, 172, 0.16)",
                fontWeight: "700",
                borderRadius: "999px",
              }}
            />

            <Box
              sx={{
                minWidth: { xs: "100%", sm: "220px" },
                backgroundColor: "rgba(255,255,255,0.08)",
                border: `1px solid ${colors.primary[500]}`,
                borderRadius: "12px",
                px: "16px",
                py: "10px",
                backdropFilter: "blur(8px)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  color: colors.grey[100],
                  fontFamily: "'Roboto Mono', monospace",
                  lineHeight: 1.1,
                }}
              >
                {formattedTime}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.grey[300], mt: "4px" }}
              >
                {formattedDate}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Summary cards */}

        <SummaryCard
          title="Leave Requests"
          value="10"
          note="2 approved • 8 pending"
          colors={colors}
          noteColor={colors.greenAccent[400]}
          icon={
            <EventNoteOutlinedIcon
              sx={{
                color: colors.greenAccent[400],
                fontSize: "27px",
              }}
            />
          }
        />

        <SummaryCard
          title="Total Employees"
          value="75"
          note="+2 joined • -1 resigned"
          colors={colors}
          noteColor={colors.greenAccent[400]}
          icon={
            <GroupsOutlinedIcon
              sx={{
                color: colors.greenAccent[400],
                fontSize: "29px",
              }}
            />
          }
        />

        <SummaryCard
          title="Salary This Month"
          value="৳5.8M"
          note="August 2026 salary sheet"
          colors={colors}
          icon={
            <PaymentsOutlinedIcon
              sx={{
                color: colors.greenAccent[400],
                fontSize: "28px",
              }}
            />
          }
        />

        <SummaryCard
          title="Working Days"
          value="22 days"
          note="8 weekend days this month"
          colors={colors}
          icon={
            <CalendarMonthOutlinedIcon
              sx={{
                color: colors.greenAccent[400],
                fontSize: "27px",
              }}
            />
          }
        />

        {/* Department employee distribution */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 12",
              md: "span 12",
              lg: "span 5",
            },
            minHeight: "410px",
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            p: "22px",
            minWidth: 0,
          }}
        >
          <Box sx={{ mb: "5px" }}>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Employees by Department
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: colors.grey[300],
                mt: "4px",
              }}
            >
              Distribution of 75 active employees
            </Typography>
          </Box>

          <Box sx={{ height: "325px" }}>
            <DepartmentPieChart data={departmentData} />
          </Box>
        </Box>

        {/* Team list */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 12",
              md: "span 6",
              lg: "span 3",
            },
            minHeight: "410px",
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              p: "20px",
              borderBottom: `1px solid ${colors.primary[500]}`,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Teams
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: colors.grey[300],
                mt: "4px",
              }}
            >
              Department heads and members
            </Typography>
          </Box>

          <Box sx={{ px: "20px" }}>
            {teams.map((team, index) => (
              <Box key={team.id}>
                <Box
                  sx={{
                    py: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      fontWeight="600"
                      color={colors.grey[100]}
                      noWrap
                    >
                      {team.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.grey[300],
                        mt: "3px",
                      }}
                      noWrap
                    >
                      Head: {team.head}
                    </Typography>
                  </Box>

                  <Chip
                    label={`${team.members} members`}
                    size="small"
                    sx={{
                      flexShrink: 0,
                      color: colors.greenAccent[300],
                      backgroundColor: colors.primary[500],
                      fontWeight: "600",
                    }}
                  />
                </Box>

                {index < teams.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: colors.primary[500],
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Contact list */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 12",
              md: "span 6",
              lg: "span 4",
            },
            minHeight: "410px",
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              p: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: `1px solid ${colors.primary[500]}`,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Employee Contacts
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: colors.grey[300],
                  mt: "4px",
                }}
              >
                Frequently contacted employees
              </Typography>
            </Box>

            <Button
              size="small"
              sx={{
                color: colors.greenAccent[400],
                whiteSpace: "nowrap",
              }}
            >
              View All
            </Button>
          </Box>

          <Box sx={{ px: "20px" }}>
            {contacts.map((contact, index) => (
              <Box key={contact.id}>
                <Box
                  sx={{
                    py: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {contact.initials}
                  </Avatar>

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      fontWeight="600"
                      color={colors.grey[100]}
                      noWrap
                    >
                      {contact.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: colors.grey[300] }}
                      noWrap
                    >
                      {contact.designation} · {contact.department}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexShrink: 0,
                    }}
                  >
                    <IconButton
                      component="a"
                      href={`tel:${contact.phone}`}
                      size="small"
                      aria-label={`Call ${contact.name}`}
                    >
                      <PhoneOutlinedIcon
                        sx={{
                          color: colors.greenAccent[400],
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>

                    <IconButton
                      component="a"
                      href={`mailto:${contact.email}`}
                      size="small"
                      aria-label={`Email ${contact.name}`}
                    >
                      <EmailOutlinedIcon
                        sx={{
                          color: colors.blueAccent[300],
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {index < contacts.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: colors.primary[500],
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 12",
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              p: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: `1px solid ${colors.primary[500]}`,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Pending Leave Applications
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.grey[300], mt: "4px" }}
              >
                Recent requests for {monthName}
              </Typography>
            </Box>

            <Button
              size="small"
              sx={{
                color: colors.greenAccent[400],
                whiteSpace: "nowrap",
              }}
            >
              View All
            </Button>
          </Box>

          <Box sx={{ p: "16px 20px 20px" }}>
            <Box
              sx={{
                display: { xs: "block", md: "grid" },
                gridTemplateColumns: "2.2fr 1fr 1.2fr 0.7fr 1fr 1fr",
                gap: "10px",
                px: "6px",
                py: "6px",
                borderBottom: `1px solid ${colors.primary[500]}`,
                mb: "8px",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                Employee
              </Typography>
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                Department
              </Typography>
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                Leave Type
              </Typography>
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                Days
              </Typography>
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                Head Status
              </Typography>
              <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                HR Status
              </Typography>
            </Box>

            {leaveRequests.map((request) => (
              <Box
                key={request.id}
                sx={{
                  display: { xs: "block", md: "grid" },
                  gridTemplateColumns: "2.2fr 1fr 1.2fr 0.7fr 1fr 1fr",
                  gap: "10px",
                  py: "12px",
                  borderBottom: `1px solid ${colors.primary[500]}`,
                }}
              >
                <Typography fontWeight="600" color={colors.grey[100]}>
                  {request.employee}
                </Typography>
                <Typography color={colors.grey[300]}>{request.department}</Typography>
                <Typography color={colors.grey[300]}>{request.leaveType}</Typography>
                <Typography color={colors.grey[300]}>{request.days}</Typography>
                <Chip
                  label={request.headStatus}
                  size="small"
                  sx={{
                    width: "fit-content",
                    color:
                      request.headStatus === "Approved"
                        ? colors.greenAccent[300]
                        : colors.blueAccent[300],
                    backgroundColor:
                      request.headStatus === "Approved"
                        ? "rgba(76, 206, 172, 0.16)"
                        : "rgba(104, 112, 250, 0.16)",
                    fontWeight: "600",
                  }}
                />
                <Chip
                  label={request.hrStatus}
                  size="small"
                  sx={{
                    width: "fit-content",
                    color:
                      request.hrStatus === "Approved"
                        ? colors.greenAccent[300]
                        : request.hrStatus === "Pending"
                        ? colors.blueAccent[300]
                        : colors.grey[100],
                    backgroundColor:
                      request.hrStatus === "Approved"
                        ? "rgba(76, 206, 172, 0.16)"
                        : request.hrStatus === "Pending"
                        ? "rgba(104, 112, 250, 0.16)"
                        : "rgba(255,255,255,0.1)",
                    fontWeight: "600",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;