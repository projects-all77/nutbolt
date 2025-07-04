<!-- 
UI structure for the application

A list of current dates
A button to go to a new date

Amount
Default amount daily
Unit
Vendor name

Pause/Resume

A QR code to share the application with the vendors
-->



<!-- WeeklyCalendar.svelte -->
<script>
    import { onMount } from 'svelte';
    import {db} from '$lib/dexie/db';
  
    // Set up initial date state
    let currentDate = new Date();
    let events = [
      {
        id: 1,
        title: 'Team Meeting',
        start: new Date(2025, 0, 10, 10, 0),
        end: new Date(2025, 0, 10, 11, 0),
        color: '#4CAF50'
      },
      {
        id: 2,
        title: 'Project Review',
        start: new Date(2025, 0, 10, 14, 0),
        end: new Date(2025, 0, 10, 15, 30),
        color: '#2196F3'
      }
    ];
  
    // Time slots for the day
    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM 
  
    // Get week dates
    $: weekDates = getWeekDates(currentDate);
  
    // Format date for display
    function formatDate(date) {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  
    // Format time for display
    function formatTime(hour) {
      return `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    }
  
    // Get array of dates for current week
    function getWeekDates(date) {
      const week = [];
      const firstDay = new Date(date);
      firstDay.setDate(date.getDate() - date.getDay()); // Start from Sunday
  
      for (let i = 0; i < 7; i++) {
        week.push(new Date(firstDay));
        firstDay.setDate(firstDay.getDate() + 1);
      }
      return week;
    }
  
    // Navigate to previous week
    function previousWeek() {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      currentDate = newDate;
    }
  
    // Navigate to next week
    function nextWeek() {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      currentDate = newDate;
    }
  
    // Check if there's an event at a specific time slot
    function getEventsForSlot(date, hour) {
      return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === date.getDate() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getYear() === date.getYear() &&
               eventDate.getHours() === hour;
      });
    }
  
    // Add new event
    function addEvent(date, hour) {
      const title = prompt('Enter event title:');
      if (title) {
        const start = new Date(date);
        start.setHours(hour);
        const end = new Date(start);
        end.setHours(hour + 1);
  
        const newEvent = {
          id: events.length + 1,
          title,
          start,
          end,
          color: '#' + Math.floor(Math.random()*16777215).toString(16)
        };
  
        events = [...events, newEvent];
      }
    }


    async function track() {
    try {

      // Add the new friend!
      const id = await db.track.add({
        name: 'tardasd',
      });
    } catch (error) {
      
    console.error('Error adding:', error);}
  }
  </script>
  
  <style>
    .calendar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .nav-button {
      padding: 8px 16px;
      border: none;
      background: #f0f0f0;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
  
    .nav-button:hover {
      background: #e0e0e0;
    }
  
    .grid {
      display: grid;
      grid-template-columns: 80px repeat(7, 1fr);
      gap: 1px;
      background: #f0f0f0;
    }
  
    .time-slot {
      padding: 10px;
      background: white;
      border-right: 1px solid #f0f0f0;
      text-align: right;
    }
  
    .cell {
      padding: 10px;
      background: white;
      min-height: 60px;
      cursor: pointer;
    }
  
    .cell:hover {
      background: #f8f8f8;
    }
  
    .header-cell {
      padding: 10px;
      background: #f8f8f8;
      font-weight: 500;
      text-align: center;
    }
  
    .event {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
      color: white;
      margin-bottom: 4px;
    }
  </style>
  
<button type="button" on:click={track}>Track</button>

  <div class="calendar">
    <div class="header">
      <button class="nav-button" on:click={previousWeek}>Previous Week</button>
      <h2>{formatDate(weekDates[0])} - {formatDate(weekDates[6])}</h2>
      <button class="nav-button" on:click={nextWeek}>Next Week</button>
    </div>
  
    <div class="grid">
      <div class="header-cell"></div>
      {#each weekDates as date}
        <div class="header-cell">{formatDate(date)}</div>
      {/each}
  
      {#each timeSlots as hour}
        <div class="time-slot">{formatTime(hour)}</div>
        {#each weekDates as date}
          <div class="cell" on:click={() => addEvent(date, hour) }>
            {#each getEventsForSlot(date, hour) as event}
              <div class="event" style="background-color: {event.color}">
                {event.title}
              </div>
            {/each}
          </div>
        {/each}
      {/each}
    </div>
  </div>