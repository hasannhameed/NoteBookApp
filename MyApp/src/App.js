// App.js
import React, { Fragment, useContext } from "react";
import "./App.css";
import Modal from './Components/Modal';
import { NotesProvider, NotesContext } from './Components/NoteContext';

const App = () => {
  const {
    notes,
    headline,
    paragraph,
    modal,
    searchQuery,
    toggleModal,
    addNote,
    deleteNote,
    setHeadline,
    setParagraph,
    setSearchQuery,
    filteredNotes
  } = useContext(NotesContext);

  return (
    <Fragment>
      <div className="App">
        {modal && (
          <Modal show={modal} close={toggleModal} title="Dynamic Title" addNote={addNote}>
            <div>
              <input
                type="text"
                placeholder="Enter headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
              <textarea
                placeholder="Enter paragraph"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
              />
            </div>
            <button className="submit" onClick={addNote}>Add</button>
          </Modal>
        )}
        <button onClick={toggleModal}>Add Note</button>
        <input
          type="text"
          placeholder="Search notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <h2>Note count ({notes.length})</h2>
        </div>
        <div className="notes">
          {filteredNotes.map((note) => (
            <div key={note.id}>
              <h3>{note.headline}</h3>
              <p>{note.paragraph}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

const WrappedApp = () => (
  <NotesProvider>
    <App />
  </NotesProvider>
);

export default WrappedApp;
