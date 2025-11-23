import { useState } from "react";

export default function GetOne() {
    const [query, setQuery] = useState("");
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchContact = async (e) => {
        e.preventDefault();
        const name = query.trim();
        if (!name) {
            setError("Please enter a name to search.");
            setContact(null);
            return;
        }

        setLoading(true);
        setError(null);
        setContact(null);

        try {
            // Try a dedicated endpoint first: /contacts/:name
            const resp = await fetch(`https://cs3870-backend-tjpk.onrender.com/contacts/${encodeURIComponent(name)}`);
            if (resp.ok) {
                const data = await resp.json();
                setContact(data);
            } else {
                // Fallback: fetch all contacts and do a client-side match
                const allResp = await fetch("https://cs3870-backend-tjpk.onrender.com/contacts");
                if (!allResp.ok) throw new Error("Failed to fetch contacts");
                const all = await allResp.json();
                const found = all.find(
                    (c) => c.contact_name && c.contact_name.toLowerCase() === name.toLowerCase()
                );
                if (found) {
                    setContact(found);
                } else {
                    setError("Contact not found.");
                }
            }
        } catch (err) {
            setError("There was an error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Get One Contact</h2>

            <form className="d-flex my-3" onSubmit={searchContact}>
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Enter contact name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && (
                <div className="alert alert-warning" role="alert">
                    {error}
                </div>
            )}

            {contact && (
                <div className="card mb-4">
                    <div className="card-body d-flex align-items-start">
                        {contact.image_url && (
                            <img
                                src={contact.image_url}
                                alt={contact.contact_name}
                                style={{
                                    width: 120,
                                    height: 120,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                    marginRight: 20,
                                }}
                            />
                        )}

                        <div>
                            <h4 className="card-title mb-1">{contact.contact_name}</h4>
                            {contact.image_url && (
                                <img
                                    src={contact.image_url}
                                    alt={contact.contact_name}
                                    style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                                />
                            )}
                            {contact.phone_number && (
                                <p className="mb-1"><strong>Phone:</strong> {contact.phone_number}</p>
                            )}
                            {contact.email && (
                                <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
                            )}
                            {contact.address && (
                                <p className="mb-1"><strong>Address:</strong> {contact.address}</p>
                            )}
                            {contact.message && (
                                <p className="mt-2"><strong>Message:</strong><br />{contact.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!contact && !error && !loading && (
                <p className="text-muted">Enter a name above and click Search to load a contact.</p>
            )}
        </div>
    );
};