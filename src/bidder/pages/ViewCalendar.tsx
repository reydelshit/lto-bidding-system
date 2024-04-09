import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DateSelectArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useState } from 'react';

import timeGridPlugin from '@fullcalendar/timegrid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventInput } from '@fullcalendar/core';

import axios from 'axios';
import UserNavigation from '../UserNavigation';

export default function ViewCalendar() {
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
  }) as any;

  const [addCalendar, setAddCalendar] = useState(false);
  const [title, setTitle] = useState('' as any);
  const [selectInfo, setSelectInfo] = useState({} as any);
  const [calendar, setCalendar] = useState<EventInput[]>([]);

  const getAppointments = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/calendar.php`)
      .then((res) => {
        setCalendar(res.data.map((appointment: EventInput[]) => appointment));
        console.log(res.data);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // const selectDate = (selectInfo: DateSelectArg) => {
  //   console.log(selectInfo);

  //   setSelectInfo(selectInfo);
  //   setAddCalendar(true);
  // };

  // const handleDateSelect = (selectInfo: DateSelectArg) => {
  //   // setAddAppointment(true)

  //   // let title = prompt('Please enter a new title for your appointment')

  //   let calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect();
  //   if (title) {
  //     calendarApi.addEvent({
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //     setAddCalendar(false);

  //     // console.log(selectInfo)

  //     axios
  //       .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/calendar.php`, {
  //         calendar_title: title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //         account_id: localStorage.getItem('lto_bidding_token'),
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   }
  // };

  // //   const handleNotification = (patient_id: number, startDate: string) => {
  // //     axios
  // //       .post(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/notification.php`, {
  // //         receiver_id: patient_id,
  // //         sender_id: localStorage.getItem('user'),
  // //         notification_message: `You have a new appointment on ${moment(
  // //           startDate,
  // //         ).format('lll')}`,
  // //       })
  // //       .then((res) => {
  // //         console.log(res.data);
  // //       });
  // //   };

  // const handleEventClick = (clickInfo: EventClickArg) => {
  //   console.log(clickInfo.event);
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`,
  //     )
  //   ) {
  //     axios
  //       .delete(
  //         `${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/calendar.php/${clickInfo.event.id}`,
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //     clickInfo.event.remove();
  //   }
  // };

  // const handleChangeAppointment = (eventChange: EventChangeArg) => {
  //   console.log(eventChange.event.title);

  //   // console.log('nice')
  //   // console.log(eventInfo.event)
  //   axios
  //     .put(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/calendar.php`, {
  //       calendar_id: eventChange.event.id,
  //       calendar_title: eventChange.event.title,
  //       start: eventChange.event.startStr,
  //       end: eventChange.event.endStr,
  //       allDay: eventChange.event.allDay,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  // const handleAppointments = (events: EventApi[]) => {
  //   setState({
  //     currentEvents: events,
  //   });
  // };

  const renderSidebar = () => {
    return (
      <div className="w-[20rem] ">
        <Card className="mb-2 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-md">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </CardContent>
        </Card>

        <div className="rounded-md border-2 p-2 text-sm">
          <span className="block text-base font-semibold">
            All Schedules ({state.currentEvents.length})
          </span>
          <span className="text-md">
            {state.currentEvents.map(renderSidebarEvent)}
          </span>
        </div>
      </div>
    );
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <div className="flex gap-1" key={event.id}>
        <span>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <p className="font-bold">{event.title}</p>
      </div>
    );
  };

  return (
    <div className="relative mt-[2rem] w-full">
      <UserNavigation />
      {/* {addCalendar && (
        <div className="absolute z-20 my-auto flex h-full w-full justify-center bg-white bg-opacity-90 p-2 ">
          <div className=" my-5 mt-[12rem] flex h-[15rem] w-[30rem] flex-col gap-2 rounded-md border-2 bg-white p-4">
            <div className="w-full">
              <Label className="mb-2 block text-lg">Enter Calendar Title</Label>
              <Input
                className="mb-[1rem] h-[5rem]"
                value={title}
                placeholder="Calendar title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex gap-2 self-end">
              <Button
                className="border-2 bg-white text-black"
                onClick={() => setAddCalendar(false)}
              >
                Cancel
              </Button>

              <Button onClick={() => handleDateSelect(selectInfo)}>
                Add calendar
              </Button>
            </div>
          </div>
        </div>
      )} */}

      <div className="mt-[2rem] flex h-full  w-full gap-4">
        {renderSidebar()}
        <div className="h-[90%] w-[80%]">
          {calendar.length > 0 && (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              eventBackgroundColor="orange"
              eventBorderColor="orange"
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={calendar} // alternatively, use the `events` setting to fetch from a feed
              // select={selectDate}
              eventContent={renderEventContent} // custom render function
              // eventClick={handleEventClick}
              // eventsSet={handleAppointments} // called after events are initialized/added/changed/removed
              // you can update a remote database when these fire:
              // eventAdd={() => handleAppointmentsDatabaase}
              // eventChange={handleChangeAppointment}
              // eventRemove={function(){}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
