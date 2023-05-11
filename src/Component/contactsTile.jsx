import React from 'react';

const ContactsTile = ({ name, number, id, deleteContact, editContact }) => {
  return (
    <div className="contact_tile">
      <p>{id}</p>
      <div className="details">
        <h4>{name}</h4>
        <p>{number}</p>
      </div>

      <div>
        <button className="btn edit" onClick={editContact}>
          Edit
        </button>
        <button className="btn delete" onClick={deleteContact}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactsTile;
