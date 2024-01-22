document.addEventListener("DOMContentLoaded", function () {
    // Create an instance of NoteReader
    const noteReader = new NoteReader();

    // Retrieve and display notes every 2 seconds
    setInterval(function () {
        noteReader.retrieveAndDisplayNotes();
    }, 2000);
});

class NoteReader {
    constructor() {
        this.notesContainer = document.getElementById("notes-container");
        this.lastRetrievedTime = document.getElementById("last-retrieved-time");
    }

    retrieveAndDisplayNotes() {
        // Retrieve existing notes from local storage
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

        // Display existing notes
        this.notesContainer.innerHTML = ""; // Clear existing notes

        existingNotes.forEach((note, index) => {
            const noteDiv = this.createNoteDiv(index, note.content);
            this.notesContainer.appendChild(noteDiv);
        });

        // Display the time of the last retrieval
        this.displayLastRetrievedTime();
    }

    createNoteDiv(index, content) {
        // Create a div to display a note
        const noteDiv = document.createElement("div");
        noteDiv.innerHTML = `
            <p>Note ${index + 1}:</p>
            <textarea id="note-${index}" class="note-textarea">${content}</textarea>
        `;
        return noteDiv;
    }

    displayLastRetrievedTime() {
        const retrievalTime = new Date().toLocaleTimeString();
        this.lastRetrievedTime.textContent = `Last retrieved at: ${retrievalTime}`;
    }
}
