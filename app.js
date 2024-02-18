document.addEventListener('DOMContentLoaded', function() {
    const startMeetingButton = document.getElementById('startMeeting');
    const stopMeetingButton = document.getElementById('stopMeeting');
    const resetMeetingButton = document.getElementById('resetMeeting');
    const salarySlider = document.getElementById('salarySlider');
    const participantsInput = document.getElementById('participants');
    const costDisplay = document.getElementById('costDisplay');
    const labels = ['label1', 'label2', 'label3'];
    let intervalId;
    let seconds = 0;
    let cost = 0;

    const receiptItems = [
        { cost: 5, item: "Big Mac Meal" },
        { cost: 10, item: "Movie Ticket" },
        { cost: 20, item: "Hardcover Book" },
        { cost: 50, item: "Fancy Dinner" },
        { cost: 100, item: "Concert Ticket" },
        { cost: 200, item: "Smartphone" },
        { cost: 500, item: "Domestic Flight" },
        { cost: 1000, item: "High-End Laptop" },
        { cost: 2000, item: "Used Car" },
        { cost: 5000, item: "Luxury Watch" }
    ];
    

// Initialize an array to keep track of added items
let addedItems = [];

function updateReceipt(currentCost) {
    const receiptContainer = document.getElementById('receiptContainer');
    receiptItems.forEach(item => {
        if (currentCost >= item.cost && !addedItems.includes(item.item)) {
            addedItems.push(item.item); // Mark this item as added

            // Create a new paragraph for each item and simulate the typing effect
            const itemElement = document.createElement('p');
            receiptContainer.appendChild(itemElement);
            printLetterByLetter(itemElement, `...that's a ${item.item}`);
        }
    });
}

    
    function printLetterByLetter(element, text) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Adjust speed as needed
    }



    // Salary rates for each slider position // I Think this is not needed
    // const salaryRates = [25, 50, 75, 100, 125]; // Example rates

    function updateLabelHighlight() {
        // Reset all labels to default
        labels.forEach(label => {
            const element = document.getElementById(label);
            element.classList.remove('highlight');
            element.style.color = ''; // Reset color to default or CSS color
        });
    
        const sliderValue = parseInt(salarySlider.value);
    
        // Apply highlighting logic based on slider position
        switch (sliderValue) {
            case 1:
                document.getElementById('label1').classList.add('highlight');
                break;
            case 2:
                document.getElementById('label1').classList.add('highlight');
                document.getElementById('label2').classList.add('highlight');
                break;
            case 3:
                document.getElementById('label2').classList.add('highlight'); // Solidly on "Average Joes"
                break;
            case 4:
                document.getElementById('label2').classList.add('highlight');
                document.getElementById('label3').classList.add('highlight');
                break;
            case 5:
                document.getElementById('label3').classList.add('highlight');
                document.getElementById('label3').style.color = 'red'; // Make "Overpaid Management" red
                break;
        }
    }
    
    function startMeeting() {
        const salaryRates = [25, 50, 75, 100, 125]; // Example rates for each slider position
        const rate = salaryRates[salarySlider.value - 1];
        const participants = parseInt(participantsInput.value, 10) || 4;
        cost = 0;
        seconds = 0;
        intervalId = setInterval(() => {
            seconds++;
            cost = ((rate * participants) / 3600) * seconds;
            costDisplay.innerHTML = `Meeting Cost: $${cost.toFixed(2)}`;
    
            updateReceipt(cost); // Trigger the receipt update based on the current cost
        }, 1000);
        startMeetingButton.style.display = 'none';
        stopMeetingButton.style.display = 'inline-block';
        resetMeetingButton.style.display = 'none';
    }
    

    function stopMeeting() {
        clearInterval(intervalId);
        stopMeetingButton.style.display = 'none';
        startMeetingButton.style.display = 'none'; // Keep start hidden, show only reset
        resetMeetingButton.style.display = 'inline-block';
    }

    function resetMeeting() {
        // Reset the cost display and any other elements as needed
        costDisplay.innerHTML = '';
        addedItems = []; // Clear the list of added items
        // Reset the UI elements to their initial state, e.g., hide stop/reset buttons, show start button
        startMeetingButton.style.display = 'inline-block';
        stopMeetingButton.style.display = 'none';
        resetMeetingButton.style.display = 'none';
        document.getElementById('receiptContainer').innerHTML = ''; // Clear the receipt container
    }
    

    salarySlider.addEventListener('input', updateLabelHighlight);
    updateLabelHighlight(); // Initial highlight

    startMeetingButton.addEventListener('click', startMeeting);
    stopMeetingButton.addEventListener('click', stopMeeting);
    resetMeetingButton.addEventListener('click', resetMeeting);
});



