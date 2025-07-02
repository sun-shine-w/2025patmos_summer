// Vacation data with exact color specifications from requirements
const vacationData = {
    "한혜미": [{"start": "2025-06-30", "end": "2025-07-02"}],
    "박지원": [
        {"start": "2025-07-24", "end": "2025-07-25"},
        {"start": "2025-08-07", "end": "2025-08-08"},
        {"start": "2025-08-14", "end": "2025-08-14"}
    ],
    "신선영": [
        {"start": "2025-07-21", "end": "2025-07-22"},
        {"start": "2025-08-20", "end": "2025-08-22"}
    ],
    "김수경": [
        {"start": "2025-07-10", "end": "2025-07-11"},
        {"start": "2025-08-14", "end": "2025-08-14"},
        {"start": "2025-08-18", "end": "2025-08-19"}
    ],
    "김새록": [{"start": "2025-08-13", "end": "2025-08-14"}],
    "이형노": [
        {"start": "2025-08-14", "end": "2025-08-14"},
        {"start": "2025-08-21", "end": "2025-08-22"}
    ],
    "김다애": [
        {"start": "2025-08-11", "end": "2025-08-12"},
        {"start": "2025-08-25", "end": "2025-08-26"}
    ],
    "안호영": [
        {"start": "2025-08-08", "end": "2025-08-12"},
        {"start": "2025-08-25", "end": "2025-08-26"}
    ],
    "이예은": [
        {"start": "2025-08-25", "end": "2025-08-26"},
        {"start": "2025-08-29", "end": "2025-08-29"}
    ],
    "김명진": [
        {"start": "2025-08-11", "end": "2025-08-13"},
        {"start": "2025-08-21", "end": "2025-08-22"}
    ],
    "정지수": [
        {"start": "2025-08-08", "end": "2025-08-08"},
        {"start": "2025-08-20", "end": "2025-08-22"}
    ],
    "조슬기": [
        {"start": "2025-08-14", "end": "2025-08-14"},
        {"start": "2025-08-16", "end": "2025-08-18"},
        {"start": "2025-08-29", "end": "2025-08-29"}
    ]
};

// Continuous vacation row assignments for consistent positioning
const continuousVacationRows = {
    // 한혜미: 6월30일-7월2일
    "한혜미-0": 0,
    
    // 김수경: 7월10일-11일
    "김수경-0": 0,
    
    // 신선영: 7월21일-22일
    "신선영-0": 0,
    
    // 박지원: 7월24일-25일
    "박지원-0": 0,
    
    // 박지원: 8월7일-8일
    "박지원-1": 0,
    
    // 안호영: 8월8일-12일 (longest period gets priority)
    "안호영-0": 0,
    
    // 정지수: 8월8일
    "정지수-0": 1,
    
    // 김다애: 8월11일-12일
    "김다애-0": 2,
    
    // 김명진: 8월11일-13일 (8월 13일 2번째 위치로 고정)
    "김명진-0": 1,
    
    // 김새록: 8월13일-14일 (8월 13일 1번째 위치로 고정)
    "김새록-0": 0,
    
    // 조슬기: 8월16일-18일 (8월 18일 2번째 위치로 고정)
    "조슬기-1": 1,
    
    // 김수경: 8월18일-19일 (8월 18일 1번째 위치로 고정)
    "김수경-2": 0,
    
    // 신선영: 8월20일-22일
    "신선영-1": 0,
    
    // 정지수: 8월20일-22일
    "정지수-1": 1,
    
    // 이형노: 8월21일-22일
    "이형노-1": 2,
    
    // 김명진: 8월21일-22일
    "김명진-1": 3,
    
    // 김다애: 8월25일-26일
    "김다애-1": 0,
    
    // 안호영: 8월25일-26일
    "안호영-1": 1,
    
    // 이예은: 8월25일-26일
    "이예은-0": 2
};

const holidays = ['2025-08-15'];

// Fixed color mapping exactly as specified in requirements
const employeeColors = {
    '김수경': '#96CEB4',  // mint green
    '김다애': '#FF6B6B',  // coral
    '김명진': '#C8A8E9',  // light purple - IMPORTANT: exact color as specified
    '김새록': '#45B7D1',  // sky blue
    '박지원': '#FECA57',  // lavender
    '신선영': '#FF9F43',  // orange
    '안호영': '#54A0FF',  // bright blue
    '이예은': '#5F27CD',  // purple
    '이형노': '#00D2D3',  // cyan
    '정지수': '#FF6B95',  // pink
    '조슬기': '#FFA502',  // golden
    '한혜미': '#3742FA'   // indigo
};

let selectedPerson = null;

// Utility functions
function formatDate(dateStr) {
    return new Date(dateStr + 'T00:00:00');
}

function dateToString(date) {
    return date.toISOString().split('T')[0];
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
}

function isHoliday(date) {
    const dateStr = dateToString(date);
    return holidays.includes(dateStr);
}

function shouldExcludeFromVacation(date) {
    return isWeekend(date) || isHoliday(date);
}

// Generate calendar days
function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDate = new Date(firstDay);
    
    // For July, include June 30 to show 한혜미's vacation
    if (month === 7) {
        startDate.setDate(startDate.getDate() - 1);
    }
    
    // Adjust to start from Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    // Generate days for calendar grid
    while (days.length < 42) { // 6 weeks maximum
        const isCurrentMonth = current.getMonth() === firstDay.getMonth();
        const isBeforeMonth = current < firstDay;
        const isAfterMonth = current > lastDay;
        
        // Show each month's days plus June 30 for July calendar
        const shouldShow = isCurrentMonth || 
                          (month === 7 && current.getTime() === new Date(2025, 5, 30).getTime()) ||
                          (isBeforeMonth && current.getMonth() === firstDay.getMonth() - 1);
        
        if (shouldShow || (!isAfterMonth && days.length % 7 !== 0)) {
            days.push({
                date: new Date(current),
                day: current.getDate(),
                isCurrentMonth,
                isOtherMonth: !isCurrentMonth,
                isWeekend: isWeekend(current),
                isHoliday: isHoliday(current),
                shouldDisplay: shouldShow
            });
        } else if (isAfterMonth && current.getMonth() > lastDay.getMonth()) {
            // After month end, add empty spaces
            break;
        } else {
            days.push({
                date: new Date(current),
                day: current.getDate(),
                isCurrentMonth: false,
                isOtherMonth: true,
                isWeekend: isWeekend(current),
                isHoliday: isHoliday(current),
                shouldDisplay: false
            });
        }
        
        current.setDate(current.getDate() + 1);
        
        // If we've completed a week and we're past the current month, stop
        if (days.length % 7 === 0 && current > lastDay) {
            break;
        }
    }
    
    return days;
}

// Process vacation data with row assignments
function processVacationData() {
    const processedData = {};
    
    Object.keys(vacationData).forEach(person => {
        processedData[person] = [];
        
        vacationData[person].forEach((period, periodIndex) => {
            const start = formatDate(period.start);
            const end = formatDate(period.end);
            const dates = [];
            
            const current = new Date(start);
            while (current <= end) {
                if (!shouldExcludeFromVacation(current)) {
                    dates.push(new Date(current));
                }
                current.setDate(current.getDate() + 1);
            }
            
            if (dates.length > 0) {
                const vacationKey = `${person}-${periodIndex}`;
                const assignedRow = continuousVacationRows[vacationKey];
                
                processedData[person].push({
                    originalStart: start,
                    originalEnd: end,
                    workingDays: dates,
                    periodIndex,
                    assignedRow: assignedRow !== undefined ? assignedRow : null
                });
            }
        });
    });
    
    return processedData;
}

// Get vacation bars for a specific date with fixed positioning
function getVacationBarsForDate(date, processedData) {
    const dateStr = dateToString(date);
    const bars = [];
    
    Object.keys(processedData).forEach(person => {
        processedData[person].forEach((period, periodIndex) => {
            const dayIndex = period.workingDays.findIndex(d => dateToString(d) === dateStr);
            if (dayIndex !== -1) {
                const isStart = dayIndex === 0;
                const isEnd = dayIndex === period.workingDays.length - 1;
                const isSingle = period.workingDays.length === 1;
                
                bars.push({
                    person,
                    periodIndex,
                    isStart,
                    isEnd,
                    isSingle,
                    originalStart: period.originalStart,
                    originalEnd: period.originalEnd,
                    dayIndex,
                    assignedRow: period.assignedRow
                });
            }
        });
    });
    
    // Fixed position sorting ensuring special dates maintain consistent positioning
    bars.sort((a, b) => {
        const isAug13 = dateStr === '2025-08-13';
        const isAug18 = dateStr === '2025-08-18';
        
        // August 13: 김새록(0), 김명진(1) fixed positions
        if (isAug13) {
            if (a.person === '김새록' && b.person === '김명진') return -1;
            if (a.person === '김명진' && b.person === '김새록') return 1;
        }
        
        // August 18: 김수경(0), 조슬기(1) fixed positions
        if (isAug18) {
            if (a.person === '김수경' && b.person === '조슬기') return -1;
            if (a.person === '조슬기' && b.person === '김수경') return 1;
        }
        
        // If both have assigned rows, sort by row number
        if (a.assignedRow !== null && b.assignedRow !== null) {
            if (a.assignedRow !== b.assignedRow) {
                return a.assignedRow - b.assignedRow;
            }
        }
        
        // If only one has an assigned row, it goes first
        if (a.assignedRow !== null && b.assignedRow === null) {
            return -1;
        }
        if (a.assignedRow === null && b.assignedRow !== null) {
            return 1;
        }
        
        // For bars without assigned rows, sort by start date and then by name
        const dateCompare = a.originalStart - b.originalStart;
        return dateCompare !== 0 ? dateCompare : a.person.localeCompare(b.person);
    });
    
    return bars;
}

// Tooltip functions
function showTooltip(event) {
    event.stopPropagation();
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    
    const person = event.currentTarget.dataset.person;
    const start = new Date(event.currentTarget.dataset.start);
    const end = new Date(event.currentTarget.dataset.end);
    
    if (!person || !start || !end) return;
    
    const startStr = `${start.getMonth() + 1}/${start.getDate()}`;
    const endStr = `${end.getMonth() + 1}/${end.getDate()}`;
    
    const tooltipContent = tooltip.querySelector('.tooltip-content');
    if (tooltipContent) {
        tooltipContent.textContent = `${person}: ${startStr} ~ ${endStr}`;
    }
    
    tooltip.classList.add('show');
    moveTooltip(event);
}

function hideTooltip(event) {
    event.stopPropagation();
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

function moveTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY - 10) + 'px';
    }
}

// Create calendar HTML
function createCalendar(containerId, year, month) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const days = generateCalendarDays(year, month);
    const processedData = processVacationData();
    
    container.innerHTML = '';
    
    days.forEach(dayInfo => {
        if (!dayInfo.shouldDisplay && dayInfo.isOtherMonth) {
            // Empty div for non-displayed days
            const emptyElement = document.createElement('div');
            emptyElement.className = 'calendar-day empty';
            container.appendChild(emptyElement);
            return;
        }
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (dayInfo.isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        if (dayInfo.isWeekend) {
            dayElement.classList.add('weekend');
        }
        if (dayInfo.isHoliday) {
            dayElement.classList.add('holiday');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = dayInfo.day;
        dayElement.appendChild(dayNumber);
        
        const vacationContainer = document.createElement('div');
        vacationContainer.className = 'vacation-container';
        
        const vacationBars = getVacationBarsForDate(dayInfo.date, processedData);
        
        vacationBars.forEach((bar, index) => {
            const barElement = document.createElement('div');
            barElement.className = `vacation-bar person-${bar.person}`;
            
            // Apply fixed color directly from employeeColors mapping
            barElement.style.backgroundColor = employeeColors[bar.person];
            
            if (bar.isSingle) {
                barElement.classList.add('single');
            } else if (bar.isStart) {
                barElement.classList.add('start');
            } else if (bar.isEnd) {
                barElement.classList.add('end');
            } else {
                barElement.classList.add('middle');
            }
            
            barElement.dataset.person = bar.person;
            barElement.dataset.start = dateToString(bar.originalStart);
            barElement.dataset.end = dateToString(bar.originalEnd);
            
            // Show name on start or single day bars with proper text fitting
            if (bar.isStart || bar.isSingle) {
                const nameElement = document.createElement('span');
                nameElement.className = 'vacation-name';
                nameElement.textContent = bar.person;
                barElement.appendChild(nameElement);
            }
            
            // Add tooltip functionality with proper event handling
            barElement.addEventListener('mouseenter', showTooltip);
            barElement.addEventListener('mouseleave', hideTooltip);
            barElement.addEventListener('mousemove', moveTooltip);
            
            vacationContainer.appendChild(barElement);
        });
        
        dayElement.appendChild(vacationContainer);
        container.appendChild(dayElement);
    });
}

// Create legend
function createLegend() {
    const legendContainer = document.getElementById('legend-items');
    if (!legendContainer) return;
    
    const people = Object.keys(vacationData);
    
    legendContainer.innerHTML = '';
    
    people.forEach((person) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.dataset.person = person;
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        // Apply fixed color directly from employeeColors mapping
        colorBox.style.backgroundColor = employeeColors[person];
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'legend-name';
        nameSpan.textContent = person;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(nameSpan);
        
        // Add click event with proper event handling
        legendItem.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            togglePersonHighlight(person);
        });
        
        legendContainer.appendChild(legendItem);
    });
}

// Toggle person highlight
function togglePersonHighlight(person) {
    if (!person) return;
    
    const legendItems = document.querySelectorAll('.legend-item');
    const vacationBars = document.querySelectorAll('.vacation-bar');
    
    if (selectedPerson === person) {
        // Deselect
        selectedPerson = null;
        legendItems.forEach(item => item.classList.remove('active'));
        vacationBars.forEach(bar => {
            bar.classList.remove('highlighted', 'dimmed');
        });
    } else {
        // Select new person
        selectedPerson = person;
        
        legendItems.forEach(item => {
            if (item.dataset.person === person) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        vacationBars.forEach(bar => {
            if (bar.dataset.person === person) {
                bar.classList.add('highlighted');
                bar.classList.remove('dimmed');
            } else {
                bar.classList.remove('highlighted');
                bar.classList.add('dimmed');
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        createCalendar('july-body', 2025, 7);
        createCalendar('august-body', 2025, 8);
        createLegend();
    } catch (error) {
        console.error('Error initializing calendar:', error);
    }
});