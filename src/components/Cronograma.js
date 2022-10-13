import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'

const Cronograma = () => {

    const currentDate = '2018-11-01';
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];

    return (
        <div id="calendar">
            <Scheduler data={schedulerData}>
                <ViewState currentDate={currentDate} />
                <EditingState />
                <IntegratedEditing />
                <WeekView startDayHour={7} endDayHour={22} />
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>



    )
}

export default Cronograma;