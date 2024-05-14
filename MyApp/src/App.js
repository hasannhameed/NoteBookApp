import { useState } from "react";
import "./App.css";
import Modal from './Components/Modal.js'
import { Fragment } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [headline, setHeadline] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [modal, setModal] = useState(false);
  const [noteCount, setNoteCount] = useState(0); // Initialize note count
  const [searchQuery, setSearchQuery] = useState(""); // Initialize search query state

  const toggleModal = () => setModal(!modal);

  const addNote = () => {
    if (headline.trim() !== "" && paragraph.trim() !== "") {
      const newNote = {
        id: Date.now(), // Unique id for each note
        headline: headline,
        paragraph: paragraph
      };
      setNotes([...notes, newNote]);
      setHeadline("");
      setParagraph("");
      setNoteCount(noteCount + 1); // Increment note count by 1
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    const searchContent = note.headline.toLowerCase() + note.paragraph.toLowerCase();
    return searchContent.includes(searchQuery.toLowerCase());
  });

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
}

export default App;
