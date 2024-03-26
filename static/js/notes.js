// Get the container element and the "Add Note" button
const container = document.querySelector(".sticky-notes");
const addNoteBtn = document.querySelector(".add-note");
const textareaNote = document.querySelector(".textarea-note");

const notes = [];

// Add event listener to the "Add Note" button
addNoteBtn.addEventListener("click", ()=>{
  const id = Math.random().toString(36).substr(2, 9);
  const color = generateRandomLightColor();
  let content = textareaNote.value
  const stickyNote = createStickyNote(id, color,content);
  container.prepend(stickyNote);
});

// Function to create a new sticky note element
function createStickyNote(id, color, content) {
  const stickyNote = document.createElement("div");
  stickyNote.classList.add("sticky-note", "animate-in");
  stickyNote.style.setProperty("--note-color", color);

  // add id to stickyNote
    stickyNote.id = id;
    const noteContent = document.createElement("div");
    noteContent.classList.add("note-content");
    noteContent.innerHTML = content;
    let note = {}
    note['id'] = id ;
    note['content'] = content;
    note['color'] = color
    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes));

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-note");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", deleteNote);

  stickyNote.appendChild(noteContent);
  stickyNote.appendChild(deleteBtn);

  return stickyNote;
}

// Function to add a new sticky note
function addNote() {
  const id = Math.random().toString(36).substr(2, 9);
  const color = generateRandomLightColor();

  const stickyNote = createStickyNote(id, color,content);

  container.prepend(stickyNote);
}

const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));

if (notesFromLocalStorage) {
  notesFromLocalStorage.forEach((note) => {
    const stickyNote = createStickyNote(
      note.id,
      note.color,
      note.content,
    );
    container.prepend(stickyNote);
  });
}

// Function to delete a sticky note
function deleteNote(event) {
  const stickyNote = event.target.parentElement;
  stickyNote.classList.add("animate-out"); // Add animate-out class

  // Wait for the animation to complete before removing the sticky note from the DOM
  setTimeout(() => {
    container.removeChild(stickyNote);
  }, 500);

  const id = stickyNote.id;
  const noteIndex = notes.findIndex((note) => note.id === id);
  notes.splice(noteIndex, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to generate a random light background color
function generateRandomLightColor() {
  // Generate random RGB values within the light color range (200-255)
  const r = Math.floor(Math.random() * 56) + 200;
  const g = Math.floor(Math.random() * 56) + 200;
  const b = Math.floor(Math.random() * 56) + 200;

  // Convert RGB values to hexadecimal
  const color =
    "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

  return color;
}

// Function to calculate the lightness of a color
function calculateLightness(color) {
  // Remove the leading '#' if present
  color = color.replace("#", "");

  // Convert the color to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Convert RGB to HSL
  const hsl = rgbToHsl(r, g, b);

  // Extract the lightness value
  const lightness = Math.round(hsl[2] * 100);

  return lightness;
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = (max + min) / 2 > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  l = (max + min) / 2;

  return [h, s, l];
}
