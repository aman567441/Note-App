import React, { useContext } from "react";
import contextValue from "../context/notes/noteContext";
const Noteitems = (props) => {
  const context = useContext(contextValue);
  const { deleteNote } = context;
  const { note,updateNote } = props;

  return (
    <div className='col-md-3 bg-dark-subtle'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mx-1" title="Edit">
              <i className="fas fa-edit" onClick={()=>{updateNote(note)}}></i>
            </button>
            <button className="btn btn-danger mx-1" title="Delete" onClick={()=>{deleteNote(note._id)}}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
