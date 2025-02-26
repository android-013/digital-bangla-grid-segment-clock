// Mapping digits (0-9) to lit-up grid cells
const digitMap = {
    "0": [2,3,4,6,7,9,10,11,15,16,20,21,25,26,27,29,30,32,33,34],
    "1": [2,3,4,9,10,15,17,20,21,23,25,26,28,29,30,32,33,34],
    "2": [1,2,3,4,6,10,11,12,14,16,21,22,23,25,29,30,31,32,33,34],
    "3": [1,2,3,4,6,10,11,12,14,16,22,23,24,26,30,31,32,33,34],
    "4": [2,3,4,6,7,9,10,11,12,14,16,22,23,24,25,26,27,29,30,32,33,34],
    "5": [1,2,3,4,6,7,8,9,10,11,12,16,22,23,24,26,30,31,32,33,34],
    "6": [2,3,4,6,7,9,10,11,12,14,16,21,22,23,25,26,30,31,32,33,34],
    "7": [1,2,3,4,6,10,11,12,14,17,20,21,22,25,27,28,30,32,33,34],
    "8": [2,3,4,6,7,9,10,11,12,14,16,21,22,23,25,26,30,31,32,33,34],
    "9": [2,3,4,6,7,9,10,11,12,14,16,22,23,24,26,30,31,32,33,34]
};

// Convert English numbers to Bangla
function convertToBangla(num) {
    const banglaDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
    return num.toString().split("").map(d => banglaDigits[d] || d).join("");
}

// Function to update the digit display
function updateDigit(digitId, num) {
    let digitElement = document.getElementById(digitId);
    if (!digitElement) return;

    // Reset all cells
    let cells = digitElement.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("lit"));

    // Light up the correct cells
    let litCells = digitMap[num] || [];
    litCells.forEach(cellNum => {
        let cell = document.getElementById(`${digitId}-${cellNum}`);
        if (cell) cell.classList.add("lit");
    });
}

// Function to update the clock
function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    let milliseconds = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, "0"); // Get 2-digit milliseconds

    // Convert digits to Bangla numerals
    let banglaTime = convertToBangla(hours + minutes + seconds + milliseconds);

    // Update each digit
    updateDigit("hour1", banglaTime[0]);
    updateDigit("hour2", banglaTime[1]);
    updateDigit("minute1", banglaTime[2]);
    updateDigit("minute2", banglaTime[3]);
    updateDigit("second1", banglaTime[4]);
    updateDigit("second2", banglaTime[5]);
    updateDigit("millisecond1", banglaTime[6]);
    updateDigit("millisecond2", banglaTime[7]);
    updateDigit("millisecond3", banglaTime[8]);
    updateDigit("millisecond4", banglaTime[9]);

    // Update every 10ms
    setTimeout(updateClock, 10);
}

// Initialize clock on page load
window.onload = updateClock;
