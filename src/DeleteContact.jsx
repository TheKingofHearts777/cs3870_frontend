import React, { useState } from "react";

function DeleteContact() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage("");
        const trimmedName = name.trim();
        if (!trimmedName) {
            setMessage("Please enter a contact name.");
            return;
        }
        try {
            const encodedName = encodeURIComponent(trimmedName);
            console.log("EncodeURIComponent :", encodedName);
            const res = await fetch(`http://localhost:8081/contacts/${encodedName}`, {
                method: "DELETE",
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) {
                const errorMsg = data?.message || `Error: HTTP ${res.status}`;
                setMessage(errorMsg);
            } else {
                const successMsg =
                    data?.message || `Contact '${trimmedName}' was deleted successfully.`;
                setMessage(successMsg);
                setName("");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            setMessage("Network error while deleting contact.");
        }
    };
    return (
        <div>
            <h2>Delete Contact</h2>
            <form onSubmit={handleDelete}>
                <label>
                    Contact name:
                    <input
                        style={{ marginLeft: "5px" }}
                        type="text"
                        value={name}
                        placeholder="e.g. Abraham Aldaco"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Delete</button>
            </form>
            {message && (
                <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>
            )}
        </div>
    );
}
export default DeleteContact;