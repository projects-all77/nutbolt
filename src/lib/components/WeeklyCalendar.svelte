<script>
	import { onMount } from 'svelte';
	import { FaPlus } from '../utils/icons.js';
	import db from '../utils/db.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';

	// State for selected date and events
	let selectedDate = null;
	let events = {};

	// Get current week dates
	let weekDates = [];
	let currentWeekStart = new Date();

	onMount(async () => {
		updateWeekDates();
		selectedDate = new Date().toISOString().split('T')[0];
		await loadEvents();
	});

	async function loadEvents() {
		const allEvents = await db.events.toArray();
		events = allEvents.reduce((acc, event) => {
			if (!acc[event.date]) acc[event.date] = [];
			acc[event.date].push(event);
			return acc;
		}, {});
	}

	async function addEvent(dateStr, title, time) {
		const newEvent = {
			date: dateStr,
			title,
			time
		};
		await db.events.add(newEvent);
		await loadEvents();
	}

	function updateWeekDates() {
		const currentDay = currentWeekStart.getDay(); // 0-6 (Sunday-Saturday)

		// Get Sunday of current week
		const sunday = new Date(currentWeekStart);
		sunday.setDate(currentWeekStart.getDate() - currentDay);

		// Generate array of dates for the week
		weekDates = Array.from({ length: 7 }, (_, i) => {
			const date = new Date(sunday);
			date.setDate(sunday.getDate() + i);
			return date;
		});
	}

	// Format date for display
	function formatDate(date) {
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	// Handle date click
	async function handleDateClick(date) {
		const dateStr = date.toISOString().split('T')[0];
		selectedDate = dateStr;

		// If no events exist for this date, initialize with empty array
		if (!events[dateStr]) {
			events[dateStr] = [];
		}

		// Add a sample event (in real app, this could open a modal/form)
		await addEvent(dateStr, `Item ${events[dateStr].length + 1}`, '12:00 PM');
	}

	// Check if date is selected
	function isSelected(date) {
		return date.toISOString().split('T')[0] === selectedDate;
	}

	// Check if date is today
	function isToday(date) {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	}

	// Scroll week forward
	function scrollWeekForward() {
		currentWeekStart.setDate(currentWeekStart.getDate() + 7);
		updateWeekDates();
	}

	// Scroll week backward
	function scrollWeekBackward() {
		currentWeekStart.setDate(currentWeekStart.getDate() - 7);
		updateWeekDates();
	}
</script>

<div class="mx-auto flex h-[100vh] max-w-3xl flex-col bg-gray-100 p-4">
	{#if selectedDate && events[selectedDate]}
		<div class="mt-6">
			<h3 class="mb-3 text-lg font-semibold">
				Tracking items for {new Date(selectedDate).toLocaleDateString()}
			</h3>
			<div class="space-y-2">
				{#each events[selectedDate] as event}
					<div class="rounded-lg border border-gray-200 bg-white p-3">
						<div class="font-medium">{event.title}</div>
						<div class="text-sm text-gray-500">{event.time}</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	
	<div class="mt-[auto] flex justify-between">
        <Carousel.Root class="w-full max-w-xs">
            <Carousel.Content>
		<div class="grid grid-cols-7 gap-2">
		
					{#each weekDates as date}
						<Carousel.Item>
							<button
								class="rounded-lg p-4 text-center transition-colors duration-200
                      {isSelected(date) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}
                      {isToday(date) ? 'ring-2 ring-blue-400' : ''}
                      border border-gray-200"
								on:click={() => handleDateClick(date)}
							>
								<div class="text-sm font-medium">{formatDate(date)}</div>
								{#if events[date.toISOString().split('T')[0]]?.length}
									<div class="mt-1 text-xs {isSelected(date) ? 'text-blue-100' : 'text-gray-500'}">
										{events[date.toISOString().split('T')[0]].length} events
									</div>
								{/if}
							</button>
						</Carousel.Item>
					{/each}
			
		</div>
    </Carousel.Content>
    <Carousel.Previous />
            <Carousel.Next />

</Carousel.Root>
	</div>

</div>
