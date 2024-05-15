// NotesContext.js
import { createContext, useState } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [headline, setHeadline] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => setModal(!modal);

  const addNote = () => {
    if (headline.trim() !== "" && paragraph.trim() !== "") {
      const newNote = {
        id: Date.now(),
        headline: headline,
        paragraph: paragraph,
      };
      setNotes([...notes, newNote]);
      setHeadline("");
      setParagraph("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const searchContent = note.headline.toLowerCase() + note.paragraph.toLowerCase();
    return searchContent.includes(searchQuery.toLowerCase());
  });

  return (
    <NotesContext.Provider
      value={{
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
        filteredNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
