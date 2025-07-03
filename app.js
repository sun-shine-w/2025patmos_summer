// Employee data with vacation schedules
const employees = [
    {
        name: "한혜미",
        color: "#7CB342",
        vacations: [
            {start: "2025-06-30", end: "2025-07-02"}
        ]
    },
    {
        name: "박지원", 
        color: "#FECA57",
        vacations: [
            {start: "2025-07-24", end: "2025-07-25"},
            {start: "2025-08-07", end: "2025-08-08"},
            {start: "2025-08-14", end: "2025-08-14"}
        ]
    },
    {
        name: "신선영",
        color: "#FF9F43", 
        vacations: [
            {start: "2025-07-21", end: "2025-07-22"},
            {start: "2025-08-20", end: "2025-08-22"}
        ]
    },
    {
        name: "김수경",
        color: "#96CEB4",
        vacations: [
            {start: "2025-07-10", end: "2025-07-11"},
            {start: "2025-08-14", end: "2025-08-14"},
            {start: "2025-08-18", end: "2025-08-19"}
        ]
    },
    {
        name: "김새록",
        color: "#45B7D1",
        vacations: [
            {start: "2025-08-13", end: "2025-08-14"}
        ]
    },
    {
        name: "이형노",
        color: "#00D2D3",
        vacations: [
            {start: "2025-08-14", end: "2025-08-14"},
            {start: "2025-08-21", end: "2025-08-22"}
        ]
    },
    {
        name: "김다애",
        color: "#FF6B6B",
        vacations: [
            {start: "2025-08-11", end: "2025-08-12"},
            {start: "2025-08-25", end: "2025-08-26"}
        ]
    },
    {
        name: "안호영",
        color: "#54A0FF",
        vacations: [
            {start: "2025-08-08", end: "2025-08-12"},
            {start: "2025-08-25", end: "2025-08-26"}
        ]
    },
    {
        name: "이예은",
        color: "#5F27CD",
        vacations: [
            {start: "2025-08-25", end: "2025-08-26"},
            {start: "2025-08-29", end: "2025-08-29"}
        ]
    },
    {
        name: "김명진",
        color: "#C8A8E9",
        vacations: [
            {start: "2025-08-11", end: "2025-08-13"},
            {start: "2025-08-21", end: "2025-08-22"}
        ]
    },
    {
        name: "정지수",
        color: "#9C27B0",
        vacations: [
            {start: "2025-08-08", end: "2025-08-08"},
            {start: "2025-08-20", end: "2025-08-22"}
        ]
    },
    {
        name: "조슬기",
        color: "#8BC34A",
        vacations: [
            {start: "2025-08-14", end: "2025-08-14"},
            {start: "2025-08-16", end: "2025-08-18"},
            {start: "2025-08-29", end: "2025-08-29"}
        ]
    },
    {
        name: "구창본",
        color: "#FF5722",
        vacations: [
            {start: "2025-08-12", end: "2025-08-14"}
        ]
    }
];

const holidays = ["2025-08-15"];
let selectedEmployee = null;

// Utility functions
function parseDate(dateString) {
    return new Date(dateString);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
}

function isHoliday(date) {
    return holidays.includes(formatDate(date));
}

function getDateRange(startDate, endDate) {
    const dates = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    
    return dates;
}

function isWorkingDay(date) {
    return !isWeekend(date) && !isHoliday(date);
}

// Calendar generation functions
function generateCalendar(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDate = new Date(firstDay);
    
    // For July, include June 30th to show 한혜미's vacation
    if (month === 7) {
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    } else {
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    }
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7);
    
    const weeks = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
    }
    
    return weeks;
}

function renderCalendar(containerId, year, month) {
    const container = document.getElementById(containerId);
    const weeks = generateCalendar(year, month);
    
    container.innerHTML = '';
    
    weeks.forEach(week => {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'calendar-week';
        
        week.forEach(date => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.setAttribute('data-date', formatDate(date));
            
            // Add classes for styling
            if (isWeekend(date)) {
                dayDiv.classList.add('weekend');
            }
            if (isHoliday(date)) {
                dayDiv.classList.add('holiday');
            }
            if (date.getMonth() !== month - 1) {
                dayDiv.classList.add('other-month');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = date.getDate();
            dayDiv.appendChild(dayNumber);
            
            const vacationContainer = document.createElement('div');
            vacationContainer.className = 'vacation-container';
            dayDiv.appendChild(vacationContainer);
            
            weekDiv.appendChild(dayDiv);
        });
        
        container.appendChild(weekDiv);
    });
}

// Vacation scheduling functions
function scheduleVacations() {
    const julyContainer = document.getElementById('july-body');
    const augustContainer = document.getElementById('august-body');
    
    // Clear existing vacation bars
    julyContainer.querySelectorAll('.vacation-bar').forEach(bar => bar.remove());
    augustContainer.querySelectorAll('.vacation-bar').forEach(bar => bar.remove());
    
    // Process vacations for each month
    scheduleVacationsForMonth(julyContainer, 2025, 7);
    scheduleVacationsForMonth(augustContainer, 2025, 8);
}

function scheduleVacationsForMonth(container, year, month) {
    const vacationsByDate = {};
    
    // Collect all vacations for this month
    employees.forEach(employee => {
        employee.vacations.forEach(vacation => {
            const startDate = parseDate(vacation.start);
            const endDate = parseDate(vacation.end);
            
            const vacationDates = getDateRange(startDate, endDate);
            
            vacationDates.forEach(date => {
                if ((month === 7 && (date.getMonth() === 5 && date.getDate() === 30)) || 
                    (date.getMonth() === month - 1 && date.getFullYear() === year)) {
                    
                    if (isWorkingDay(date)) {
                        const dateKey = formatDate(date);
                        if (!vacationsByDate[dateKey]) {
                            vacationsByDate[dateKey] = [];
                        }
                        
                        vacationsByDate[dateKey].push({
                            employee: employee,
                            vacation: vacation,
                            date: date
                        });
                    }
                }
            });
        });
    });
    
    // Assign row numbers to vacations
    const vacationRows = assignVacationRows(vacationsByDate);
    
    // Create vacation bars
    Object.keys(vacationsByDate).forEach(dateKey => {
        const dayCell = container.querySelector(`[data-date="${dateKey}"]`);
        if (dayCell) {
            const vacationContainer = dayCell.querySelector('.vacation-container');
            
            vacationsByDate[dateKey].forEach(vacationData => {
                const rowIndex = vacationRows[`${vacationData.employee.name}-${vacationData.vacation.start}`];
                createVacationBar(vacationContainer, vacationData, rowIndex);
            });
        }
    });
}

function assignVacationRows(vacationsByDate) {
    const vacationRows = {};
    const continuousVacations = {};
    
    // Group continuous vacations
    employees.forEach(employee => {
        employee.vacations.forEach(vacation => {
            const key = `${employee.name}-${vacation.start}`;
            const startDate = parseDate(vacation.start);
            const endDate = parseDate(vacation.end);
            
            const workingDates = getDateRange(startDate, endDate).filter(date => isWorkingDay(date));
            
            if (workingDates.length > 0) {
                continuousVacations[key] = {
                    employee: employee,
                    vacation: vacation,
                    dates: workingDates
                };
            }
        });
    });
    
    // Assign row numbers with better conflict resolution
    const dateRows = {};
    const sortedKeys = Object.keys(continuousVacations).sort((a, b) => {
        // Sort by start date first, then by duration (longer vacations first)
        const vacA = continuousVacations[a];
        const vacB = continuousVacations[b];
        const startA = parseDate(vacA.vacation.start);
        const startB = parseDate(vacB.vacation.start);
        
        if (startA.getTime() !== startB.getTime()) {
            return startA.getTime() - startB.getTime();
        }
        
        return vacB.dates.length - vacA.dates.length;
    });
    
    sortedKeys.forEach(key => {
        const continuous = continuousVacations[key];
        let rowIndex = 0;
        let canUseRow = false;
        
        // Find the first available row across all dates in this vacation
        while (!canUseRow) {
            canUseRow = true;
            
            continuous.dates.forEach(date => {
                const dateKey = formatDate(date);
                if (!dateRows[dateKey]) {
                    dateRows[dateKey] = [];
                }
                
                if (dateRows[dateKey][rowIndex]) {
                    canUseRow = false;
                }
            });
            
            if (!canUseRow) {
                rowIndex++;
                if (rowIndex > 7) { // Prevent infinite loop
                    break;
                }
            }
        }
        
        vacationRows[key] = rowIndex;
        
        // Reserve this row for all dates in the continuous vacation
        continuous.dates.forEach(date => {
            const dateKey = formatDate(date);
            if (!dateRows[dateKey]) {
                dateRows[dateKey] = [];
            }
            dateRows[dateKey][rowIndex] = key;
        });
    });
    
    return vacationRows;
}

function createVacationBar(container, vacationData, rowIndex) {
    const bar = document.createElement('div');
    bar.className = 'vacation-bar';
    bar.style.backgroundColor = vacationData.employee.color;
    bar.style.top = `${30 + rowIndex * 21}px`;
    bar.style.left = '3px';
    bar.style.right = '3px';
    bar.style.height = '16px';
    bar.style.zIndex = rowIndex + 1;
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'vacation-name';
    nameSpan.textContent = vacationData.employee.name;
    bar.appendChild(nameSpan);
    
    // Add tooltip functionality
    bar.addEventListener('mouseenter', (e) => {
        showTooltip(e, vacationData);
    });
    
    bar.addEventListener('mouseleave', hideTooltip);
    
    // Add click functionality for highlighting
    bar.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleEmployeeHighlight(vacationData.employee.name);
    });
    
    container.appendChild(bar);
}

// Tooltip functions
function showTooltip(event, vacationData) {
    const tooltip = document.getElementById('tooltip');
    const startDate = parseDate(vacationData.vacation.start);
    const endDate = parseDate(vacationData.vacation.end);
    
    const formatOptions = { month: 'long', day: 'numeric' };
    const startStr = startDate.toLocaleDateString('ko-KR', formatOptions);
    const endStr = endDate.toLocaleDateString('ko-KR', formatOptions);
    
    tooltip.innerHTML = `
        <strong>${vacationData.employee.name}</strong><br>
        ${startStr} - ${endStr}
    `;
    
    tooltip.style.left = event.pageX + 'px';
    tooltip.style.top = (event.pageY - 60) + 'px';
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Legend functions
function createLegend() {
    const legendGrid = document.getElementById('legend-grid');
    
    employees.forEach(employee => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.setAttribute('data-employee', employee.name);
        
        const colorDiv = document.createElement('div');
        colorDiv.className = 'legend-color';
        colorDiv.style.backgroundColor = employee.color;
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'legend-name';
        nameDiv.textContent = employee.name;
        
        legendItem.appendChild(colorDiv);
        legendItem.appendChild(nameDiv);
        
        legendItem.addEventListener('click', () => {
            toggleEmployeeHighlight(employee.name);
        });
        
        legendGrid.appendChild(legendItem);
    });
}

function toggleEmployeeHighlight(employeeName) {
    const wasSelected = selectedEmployee === employeeName;
    
    // Clear previous selection
    document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.vacation-bar').forEach(bar => {
        bar.classList.remove('highlighted', 'dimmed');
    });
    
    if (!wasSelected) {
        // Set new selection
        selectedEmployee = employeeName;
        
        const legendItem = document.querySelector(`[data-employee="${employeeName}"]`);
        if (legendItem) {
            legendItem.classList.add('active');
        }
        
        document.querySelectorAll('.vacation-bar').forEach(bar => {
            const barEmployeeName = bar.querySelector('.vacation-name').textContent;
            if (barEmployeeName === employeeName) {
                bar.classList.add('highlighted');
            } else {
                bar.classList.add('dimmed');
            }
        });
    } else {
        // Clear selection
        selectedEmployee = null;
    }
}

// Initialize the application
function init() {
    renderCalendar('july-body', 2025, 7);
    renderCalendar('august-body', 2025, 8);
    scheduleVacations();
    createLegend();
    
    // Add click listener to clear selection when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.legend-item') && !e.target.closest('.vacation-bar')) {
            if (selectedEmployee) {
                toggleEmployeeHighlight(selectedEmployee);
            }
        }
    });
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);
