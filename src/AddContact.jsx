import { useState } from "react";

export default function AddContact() {
    const [contactName, setContactName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [messageTimeStamp, setMessageTimeStamp] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    const handleAddContact = async (e) => {
        e.preventDefault();
        setResponseMsg("");

        if (!contactName.trim()) {
            setResponseMsg("Contact name is required.");
            return;
        }

        try {
            const res = await fetch("https://cs3870-backend-tjpk.onrender.com/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contact_name: contactName,
                    phone_number: phoneNumber,
                    message: message,
                    image_url: imageUrl
                }),
            });
            
            const data = await res.json().catch(() => null);
            if (res.status === 201) {
                setResponseMsg("Contact added successfully!");
                // Clear fields
                setContactName("");
                setPhoneNumber("");
                setMessage("");
                setMessageTimeStamp(Date.now());
                setImageUrl("");
            } else {
                setResponseMsg(data?.message || "Failed to add contact.");
            }
        } catch (error) {
            console.log("POST error:", error);
            setResponseMsg("Network error: Could not connect to the server.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add New Contact</h2>
            <form onSubmit={handleAddContact}>
                <input
                    type="text" placeholder="Full Name" value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <br /><br />
                <input
                    type="text" placeholder="Phone Number" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br /><br />
                <input
                    type="text" placeholder="Message" value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br /><br />
                <input
                    type="text" placeholder="Image URL" value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <br /><br />
                <button type="submit">Add Contact</button>
            </form>
            {responseMsg && (
                <p style={{ marginTop: "15px", color: "blue" }}>{responseMsg}</p>
            )}
        </div>
    );
}