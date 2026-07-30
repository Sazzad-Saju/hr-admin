import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import listPlugin from "@fullcalendar/react/list";

import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr} - ${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            selected.event.remove();
        }
    };

    const getFridayClass = ({ date }) => {
        return date.getDay() === 5 ? "company-friday" : "";
    };

    return <Box sx={{ margin: "20px" }}>
        <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />

        <Box sx={{
            display: "flex", gap: "15px", alignItems: "stretch", flexDirection: {
                xs: "column",
                md: "row",
            },
        }}>
            {/* calendar sidebar */}
            <Box sx={{
                flex: {
                    xs: "1 1 auto",
                    md: "0 0 260px",
                }, backgroundColor: colors.primary[400], p: "15px", borderRadius: "4px"
            }}>
                <Typography variant="h5"> Events </Typography>
                <List>
                    {currentEvents.map((event) => (
                        <ListItem key={event.id} sx={{ backgroundColor: colors.greenAccent[500], margin: "10px 0", borderRadius: "2px" }}>
                            <ListItemText primary={event.title} secondary={
                                <Typography>{formatDate(event.start, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}</Typography>
                            } />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* CALENDER */}
            <Box sx={{
                flex: "1 1 auto", minWidth: 0, "& .fc": {
                    color: colors.grey[100],
                },

                "& .fc-theme-standard td, & .fc-theme-standard th": {
                    borderColor: colors.grey[700],
                },

                "& .fc-theme-standard .fc-scrollgrid": {
                    borderColor: colors.grey[700],
                },

                // Friday danger styling
                "& .company-friday, & .company-friday a": {
                    color: theme.palette.error.main,
                    fontWeight: 700,
                },
            }}>
                <FullCalendar
                    colorScheme={theme.palette.mode}
                    firstDay={6}
                    dayHeaderClass={getFridayClass}
                    dayCellTopClass={getFridayClass}
                    listDayHeaderClass={getFridayClass}
                    height="75vh"
                    plugins={[
                        themePlugin,
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin
                    ]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={setCurrentEvents}
                    initialEvents={[
                        { id: "1234", title: "All-day event", date: "2026-09-14" },
                        { id: "4321", title: "Timed event", date: "2026-09-28" },
                    ]}
                />
            </Box>
        </Box>
    </Box>
};

export default Calendar;