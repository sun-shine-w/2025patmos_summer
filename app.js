// Employee data with vacation schedules
const employees = [
    {
        name: "한혜미",
        color: "#7CB342",
        vacations: [
            { start: "2025-06-30", end: "2025-07-02" }
        ]
    },
    {
        name: "박지원",
        color: "#FECA57",
        vacations: [
            { start: "2025-07-24", end: "2025-07-25" },
            { start: "2025-08-07", end: "2025-08-08" },
            { start: "2025-08-14", end: "2025-08-14" }
        ]
    },
    {
        name: "신선영",
        color: "#FF9F43",
        vacations: [
            { start: "2025-07-21", end: "2025-07-22" },
            { start: "2025-08-20", end: "2025-08-22" }
        ]
    },
    {
        name: "김수경",
        color: "#96CEB4",
        vacations: [
            { start: "2025-07-10", end: "2025-07-11" },
            { start: "2025-08-14", end: "2025-08-14" },
            { start: "2025-08-18", end: "2025-08-19" }
        ]
    },
    {
        name: "김새록",
        color: "#45B7D1",
        vacations: [
            { start: "2025-08-13", end: "2025-08-14" }
        ]
    },
    {
        name: "이형노",
        color: "#00D2D3",
        vacations: [
            { start: "2025-08-14", end: "2025-08-14" },
            { start: "2025-08-21", end: "2025-08-22" }
        ]
    },
    {
        name: "김다애",
        color: "#FF6B6B",
        vacations: [
            { start: "2025-08-11", end: "2025-08-12" },
            { start: "2025-08-25", end: "2025-08-26" }
        ]
    },
    {
        name: "안호영",
        color: "#54A0FF",
        vacations: [
            { start: "2025-08-08", end: "2025-08-08" },
            { start: "2025-08-11", end: "2025-08-12" },
            { start: "2025-08-25", end: "2025-08-26" }
        ]
    },
    {
        name: "이예은",
        color: "#5F27CD",
        vacations: [
            { start: "2025-08-25", end: "2025-08-26" },
            { start: "2025-08-29", end: "2025-08-29" }
        ]
    },
    {
        name: "김명진",
        color: "#C8A8E9",
        vacations: [
            { start: "2025-08-11", end: "2025-08-13" },
            { start: "2025-08-21", end: "2025-08-22" }
        ]
    },
    {
        name: "정지수",
        color: "#9C27B0",
        vacations: [
            { start: "2025-08-08", end: "2025-08-08" },
            { start: "2025-08-20", end: "2025-08-22" }
        ]
    },
    {
        name: "조슬기",
        color: "#66BB6A",
        vacations: [
            { start: "2025-08-18", end: "2025-08-18" },
            { start: "2025-08-28", end: "2025-08-29" }
        ]
    },
    {
        name: "구창본",
        color: "#FF5722",
        vacations: [
            { start: "2025-08-12", end: "2025-08-14" }
        ]
    }
];

// Events
const events = [
    {
        name: "홀리그라운드 캠프",
        color: "#FFD700",
        start: "2025-07-28",
        end: "2025-08-02"
    }
];

const holidays = ["2025-08-15"]; // 광복절
let selectedEmployee = null;
let selectedEvent = null;

/* ----------------------------- UTILITIES ----------------------------- */
function parseDate(dateString) {
    return new Date(dateString);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday, Saturday
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

/* ------------------------- CALENDAR RENDERING ------------------------ */
function generateCalendar(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const startDate = new Date(firstDay);

    if (month === 7) {
        // July must include June 30 (Monday)
        startDate.setDate(startDate.getDate() - 1);
    } else {
        // Move to the Monday of the week where the first day resides
        startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
    }

    const endDate = new Date(lastDay);
    // Extend to Sunday of the last week so grid is complete
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay() + 7) % 7);

    const weeks = [];
    const cur = new Date(startDate);
    while (cur <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(cur));
            cur.setDate(cur.getDate() + 1);
        }
        weeks.push(week);
    }
    return weeks;
}

function renderCalendar(containerId, year, month) {
    const container = document.getElementById(containerId);
    const weeks = generateCalendar(year, month);

    container.innerHTML = "";

    weeks.forEach((week) => {
        const weekDiv = document.createElement("div");
        weekDiv.className = "calendar-week";

        week.forEach((date) => {
            const dayDiv = document.createElement("div");
            dayDiv.className = "calendar-day";
            dayDiv.setAttribute("data-date", formatDate(date));

            const isCurrentMonth =
                (month === 7 && date.getMonth() === 5 && date.getDate() === 30) ||
                date.getMonth() === month - 1;

            // Styling classes
            if (isWeekend(date)) dayDiv.classList.add("weekend");
            if (isHoliday(date)) dayDiv.classList.add("holiday");
            if (!isCurrentMonth) {
                dayDiv.classList.add("other-month", "other-hidden");
            }

            // Day number
            const dayNumber = document.createElement("div");
            dayNumber.className = "day-number";
            dayNumber.textContent = isCurrentMonth ? date.getDate() : "";
            dayDiv.appendChild(dayNumber);

            // Container for bars
            const vacContainer = document.createElement("div");
            vacContainer.className = "vacation-container";
            dayDiv.appendChild(vacContainer);

            weekDiv.appendChild(dayDiv);
        });
        container.appendChild(weekDiv);
    });
}

/* ----------------------- VACATION / EVENT LOGIC ---------------------- */
function scheduleVacations() {
    const julyBody = document.getElementById("july-body");
    const augBody = document.getElementById("august-body");

    // Clear existing
    [julyBody, augBody].forEach((node) => {
        node.querySelectorAll(".vacation-bar, .event-bar").forEach((el) => el.remove());
    });

    // Events first (row 0)
    scheduleEvents();

    // Vacations (start rows at 1)
    scheduleVacForMonth(julyBody, 2025, 7);
    scheduleVacForMonth(augBody, 2025, 8);
}

function scheduleEvents() {
    events.forEach((event) => {
        const start = parseDate(event.start);
        const end = parseDate(event.end);
        getDateRange(start, end).forEach((d, idx) => {
            const key = formatDate(d);
            let container = null;
            if (d.getMonth() === 6) container = document.getElementById("july-body");
            if (d.getMonth() === 7) container = document.getElementById("august-body");
            if (!container) return;
            const cell = container.querySelector(`[data-date="${key}"]`);
            if (!cell) return;
            const vacWrap = cell.querySelector(".vacation-container");
            createEventBar(vacWrap, { event, isFirst: idx === 0 });
        });
    });
}

function scheduleVacForMonth(container, year, month) {
    // vacationsByDate[date] = array of { employee, vacation, date }
    const vacationsByDate = {};

    employees.forEach((emp) => {
        emp.vacations.forEach((vac) => {
            const start = parseDate(vac.start);
            const end = parseDate(vac.end);
            const dates = getDateRange(start, end).filter((d) => isWorkingDay(d));

            dates.forEach((d) => {
                const inMonth =
                    (month === 7 && d.getMonth() === 5 && d.getDate() === 30) ||
                    d.getMonth() === month - 1;
                if (!inMonth) return;

                const key = formatDate(d);
                if (!vacationsByDate[key]) vacationsByDate[key] = [];
                vacationsByDate[key].push({ employee: emp, vacation: vac, date: d });
            });
        });
    });

    // Row assignment so bars never overlap
    const rowMap = assignRows(vacationsByDate, month);

    Object.keys(vacationsByDate).forEach((dateKey) => {
        const cell = container.querySelector(`[data-date="${dateKey}"]`);
        if (!cell) return;
        const vacWrap = cell.querySelector(".vacation-container");

        vacationsByDate[dateKey].forEach((info) => {
            const rowIdx = rowMap[`${info.employee.name}-${info.vacation.start}`];
            const isFirstDay = dateKey === info.vacation.start ||
                (info.vacation.start === "2025-06-30" && dateKey === "2025-06-30");
            createVacationBar(vacWrap, info, rowIdx, isFirstDay);
        });
    });
}

function assignRows(vacationsByDate, month) {
    const result = {}; // key (emp-start) -> row number
    const dateRows = {}; // dateKey -> array occupied rows

    // Build list of continuous vacations
    employees.forEach((emp) => {
        emp.vacations.forEach((vac) => {
            const key = `${emp.name}-${vac.start}`;
            const dates = getDateRange(parseDate(vac.start), parseDate(vac.end))
                .filter((d) => isWorkingDay(d))
                .filter((d) => {
                    return (
                        (month === 7 && d.getMonth() === 5 && d.getDate() === 30) ||
                        d.getMonth() === month - 1
                    );
                });
            if (dates.length === 0) return;

            // Find smallest available row across all these dates
            let row = 1;
            while (true) {
                const conflict = dates.some((d) => {
                    const dk = formatDate(d);
                    return dateRows[dk] && dateRows[dk][row];
                });
                if (!conflict) break;
                row++;
            }
            result[key] = row;
            dates.forEach((d) => {
                const dk = formatDate(d);
                if (!dateRows[dk]) dateRows[dk] = {};
                dateRows[dk][row] = true;
            });
        });
    });
    return result;
}

/* ---------------------------- BAR MAKERS ----------------------------- */
function createVacationBar(container, info, rowIdx, showName) {
    const bar = document.createElement("div");
    bar.className = "vacation-bar";
    bar.style.backgroundColor = info.employee.color;
    bar.setAttribute("data-employee", info.employee.name);

    const topBase = 25; // reserve 25px (day number + potential event row)
    bar.style.top = `${topBase + (rowIdx - 1) * 21}px`;
    bar.style.left = "2px";
    bar.style.right = "2px";

    if (showName) {
        const span = document.createElement("span");
        span.className = "vacation-name";
        span.textContent = info.employee.name;
        bar.appendChild(span);
    }

    // Tooltip
    bar.addEventListener("mouseenter", (e) => showTooltip(e, info));
    bar.addEventListener("mouseleave", hideTooltip);
    bar.addEventListener("mousemove", (e) => updateTooltipPosition(e));
    bar.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleEmployeeHighlight(info.employee.name);
    });

    container.appendChild(bar);
}

function createEventBar(container, data) {
    const bar = document.createElement("div");
    bar.className = "event-bar";
    bar.style.backgroundColor = data.event.color;
    bar.style.top = "25px"; // Row 0 (events row)
    bar.style.left = "2px";
    bar.style.right = "2px";
    bar.setAttribute("data-event", data.event.name);

    if (data.isFirst) {
        const span = document.createElement("span");
        span.className = "event-name";
        span.textContent = data.event.name;
        bar.appendChild(span);
    }

    bar.addEventListener("mouseenter", (e) => showEventTooltip(e, data.event));
    bar.addEventListener("mouseleave", hideTooltip);
    bar.addEventListener("mousemove", (e) => updateTooltipPosition(e));
    bar.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleEventHighlight(data.event.name);
    });

    container.appendChild(bar);
}

/* ------------------------------- TOOLTIPS ---------------------------- */
function showTooltip(evt, info) {
    const tip = document.getElementById("tooltip");
    if (!tip) return;
    
    const s = parseDate(info.vacation.start);
    const e = parseDate(info.vacation.end);
    const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}`;

    tip.innerHTML = `<strong>${info.employee.name}</strong><br>${fmt(s)} - ${fmt(e)}`;
    updateTooltipPosition(evt);
    tip.classList.add("show");
}

function showEventTooltip(evt, event) {
    const tip = document.getElementById("tooltip");
    if (!tip) return;
    
    tip.innerHTML = `<strong>${event.name}</strong><br>7/28(월)~8/2(토)`;
    updateTooltipPosition(evt);
    tip.classList.add("show");
}

function updateTooltipPosition(evt) {
    const tip = document.getElementById("tooltip");
    if (!tip) return;
    
    const rect = tip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = evt.clientX + 10;
    let top = evt.clientY - 60;
    
    // Prevent tooltip from going off-screen
    if (left + rect.width > viewportWidth) {
        left = evt.clientX - rect.width - 10;
    }
    if (top < 0) {
        top = evt.clientY + 10;
    }
    
    tip.style.left = left + window.scrollX + "px";
    tip.style.top = top + window.scrollY + "px";
}

function hideTooltip() {
    const tip = document.getElementById("tooltip");
    if (tip) {
        tip.classList.remove("show");
    }
}

/* -------------------------- LEGEND INTERACTION ----------------------- */
function createLegend() {
    const grid = document.getElementById("legend-grid");

    // Event first
    events.forEach((evt) => {
        grid.appendChild(buildLegendItem({ name: evt.name, color: evt.color, isEvent: true }));
    });

    employees.forEach((emp) => {
        grid.appendChild(buildLegendItem({ name: emp.name, color: emp.color, isEvent: false }));
    });
}

function buildLegendItem({ name, color, isEvent }) {
    const item = document.createElement("div");
    item.className = "legend-item";
    if (isEvent) {
        item.setAttribute("data-event", name);
    } else {
        item.setAttribute("data-employee", name);
    }

    const colorBox = document.createElement("div");
    colorBox.className = "legend-color";
    colorBox.style.backgroundColor = color;

    const txt = document.createElement("div");
    txt.className = "legend-name";
    txt.textContent = name;

    item.appendChild(colorBox);
    item.appendChild(txt);

    item.addEventListener("click", () => {
        if (isEvent) {
            toggleEventHighlight(name);
        } else {
            toggleEmployeeHighlight(name);
        }
    });

    return item;
}

function toggleEmployeeHighlight(empName) {
    const wasSel = selectedEmployee === empName;

    // Clear all highlights
    document.querySelectorAll(".legend-item").forEach((i) => i.classList.remove("active"));
    document.querySelectorAll(".vacation-bar, .event-bar").forEach((b) => {
        b.classList.remove("highlighted", "dimmed");
    });

    if (!wasSel) {
        selectedEmployee = empName;
        selectedEvent = null;
        
        // Highlight legend item
        const legendItem = document.querySelector(`[data-employee="${empName}"]`);
        if (legendItem) {
            legendItem.classList.add("active");
        }

        // Highlight employee's vacation bars
        document.querySelectorAll(".vacation-bar").forEach((bar) => {
            if (bar.getAttribute("data-employee") === empName) {
                bar.classList.add("highlighted");
            } else {
                bar.classList.add("dimmed");
            }
        });
        
        // Dim event bars
        document.querySelectorAll(".event-bar").forEach((bar) => {
            bar.classList.add("dimmed");
        });
    } else {
        selectedEmployee = null;
    }
}

function toggleEventHighlight(evtName) {
    const wasSel = selectedEvent === evtName;

    // Clear all highlights
    document.querySelectorAll(".legend-item").forEach((i) => i.classList.remove("active"));
    document.querySelectorAll(".vacation-bar, .event-bar").forEach((b) => {
        b.classList.remove("highlighted", "dimmed");
    });

    if (!wasSel) {
        selectedEvent = evtName;
        selectedEmployee = null;
        
        // Highlight legend item
        const legendItem = document.querySelector(`[data-event="${evtName}"]`);
        if (legendItem) {
            legendItem.classList.add("active");
        }
        
        // Highlight event bars
        document.querySelectorAll(".event-bar").forEach((b) => {
            if (b.getAttribute("data-event") === evtName) {
                b.classList.add("highlighted");
            }
        });
        
        // Dim vacation bars
        document.querySelectorAll(".vacation-bar").forEach((b) => {
            b.classList.add("dimmed");
        });
    } else {
        selectedEvent = null;
    }
}

/* ------------------------------ INIT ------------------------------- */
function init() {
    renderCalendar("july-body", 2025, 7);
    renderCalendar("august-body", 2025, 8);
    scheduleVacations();
    createLegend();

    // Clear selection on outside click
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".legend-item, .vacation-bar, .event-bar")) {
            if (selectedEmployee) toggleEmployeeHighlight(selectedEmployee);
            if (selectedEvent) toggleEventHighlight(selectedEvent);
        }
    });
}

document.addEventListener("DOMContentLoaded", init);
// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);
