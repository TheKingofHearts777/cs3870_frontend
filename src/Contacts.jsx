import { useState, useEffect } from 'react';
const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("https://cs3870-backend-1.onrender.com/contacts");
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts");
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                alert("There was an Error loading contacts " + error.message);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="container">
            <h2 className="text-center mt-4">Contacts List</h2>
            <ul className="list-group">
            </ul>
            {
                contacts.map((contact) => (
                    <li key={contact.id} className="list-group-item d-flex align-items-center">
                        {contact.image_url && (
                            <img
                                src={contact.image_url}
                                alt={contact.contact_name}
                                style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                            />
                        )}
                        <div>
                            <strong>{contact.contact_name}</strong> - {contact.phone_number}
                            <p>{contact.message}</p>
                        </div>
                    </li>
                ))
            }
        </div >
    );
};
export default Contacts;