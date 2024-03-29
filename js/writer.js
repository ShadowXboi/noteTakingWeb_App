document.addEventListener("DOMContentLoaded", function () {
    // Create an instance of NoteManager
    const noteManager = new NoteManager();

    // Load existing notes on page load
    noteManager.loadExistingNotes();

    // Save notes to local storage only when there are changes
    let unsavedChanges = false; // Track whether there are unsaved changes

    setInterval(function () {
        if (unsavedChanges) {
            noteManager.saveNotesToLocalStorage();
        }
    }, 2000);

    // Add initial textarea and buttons
    noteManager.addNoteTextArea();

    // Event listener for the add button
    document.getElementById("add-button").addEventListener("click", function () {
        noteManager.addNoteTextArea();
        unsavedChanges = true;
    });

    // Event listener for the notes container using event delegation
    document.getElementById("notes-container").addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("remove-button")) {
            const index = target.getAttribute("data-index");
            noteManager.removeNoteTextArea(index);
            unsavedChanges = true;
        }
    });

    // Save notes to local storage when the user leaves the page (optional)
    window.addEventListener("beforeunload", function () {
        if (unsavedChanges) {
            noteManager.saveNotesToLocalStorage();
        }
    });
});

class NoteManager {
    constructor() {
        this.notesContainer = document.getElementById("notes-container");
    }

    loadExistingNotes() {
        // Retrieve existing notes from local storage
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

        // Populate text areas with existing notes
        existingNotes.forEach((note, index) => {
            const noteTextArea = this.createNoteTextArea(index, note.content);
            this.notesContainer.appendChild(noteTextArea);
        });
    }

    saveNotesToLocalStorage() {
        // Get all text areas
        const textAreas = this.notesContainer.querySelectorAll("textarea");

        // Create an array to store notes
        const notes = [];

        // Iterate through text areas and save content
        textAreas.forEach((textArea, index) => {
            notes.push({
                id: index,
                content: textArea.value,
            });
        });

        // Save notes to local storage only when there are changes
        const notesString = JSON.stringify(notes);
        if (localStorage.getItem("notes") !== notesString) {
            localStorage.setItem("notes", notesString);
            this.unsavedChanges = false;
            this.displaySaveTime();
        }
    }

    addNoteTextArea() {
        // Create a new textarea and remove button
        const index = this.notesContainer.childElementCount;
        const noteTextArea = this.createNoteTextArea(index);

        // Append the new textarea and button to the container
        this.notesContainer.appendChild(noteTextArea);
    }

    createNoteTextArea(index, content = "") {
        // Create a new textarea and remove button
        const noteTextArea = document.createElement("div");
        noteTextArea.innerHTML = `
            <textarea id="note-${index}" class="note-textarea">${content}</textarea>
            <button data-index="${index}" class="remove-button">Remove</button>
        `;
        return noteTextArea;
    }

    removeNoteTextArea(index) {
        // Remove the note with the specified index
        const noteToRemove = document.getElementById(`note-${index}`);
        this.notesContainer.removeChild(noteToRemove.parentNode);

        // Save the updated notes to local storage
        this.saveNotesToLocalStorage();

        // Provide user feedback
        this.displayUserFeedback("Note removed successfully");
    }

    displaySaveTime() {
        const saveTime = new Date().toLocaleTimeString();

        // Create an element to display the save time
        const saveTimeElement = document.createElement("p");
        saveTimeElement.textContent = `Notes saved at: ${saveTime}`;
        saveTimeElement.id = "save-time-display";

        // Check if the element already exists and update or append it
        const existingSaveTimeElement = document.getElementById("save-time-display");
        if (existingSaveTimeElement) {
            existingSaveTimeElement.textContent = saveTimeElement.textContent;
        } else {
            // Append the new save time element to the document body
            document.body.appendChild(saveTimeElement);
        }

        // Update the time in the top right corner
    }

    displayUserFeedback(message) {
        alert(message);
    }

    
}    
    
document.addEventListener("DOMContentLoaded", function () {
    // Create an instance of NoteManager
    const noteManager = new NoteManager();
});
