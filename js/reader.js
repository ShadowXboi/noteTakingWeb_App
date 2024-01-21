document.addEventListener("DOMContentLoaded", function () {
    // Retrieve and display notes every 2 seconds
    setInterval(function () {
        retrieveAndDisplayNotes();
    }, 2000);
});

function retrieveAndDisplayNotes() {
    const notesContainer = document.getElementById("notes-container");
    const lastRetrievedTime = document.getElementById("last-retrieved-time");

    // Retrieve existing notes from local storage
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Display existing notes
    notesContainer.innerHTML = ""; // Clear existing notes

    existingNotes.forEach((note, index) => {
        const noteDiv = createNoteDiv(index, note.content);
        notesContainer.appendChild(noteDiv);
    });

    // Display the time of the last retrieval
    displayLastRetrievedTime();
}

function createNoteDiv(index, content) {
    // Create a div to display a note
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
        <p>Note ${index + 1}:</p>
        <p>${content}</p>
        <textarea id="note-${index}" class="note-textarea">${content}</textarea>
    `;
    return noteDiv;
}

function displayLastRetrievedTime() {
    const lastRetrievedTime = document.getElementById("last-retrieved-time");
    const retrievalTime = new Date().toLocaleTimeString();
    lastRetrievedTime.textContent = `Last retrieved at: ${retrievalTime}`;
}
