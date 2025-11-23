import { useState } from "react";

export default function UpdateContact() {
    const [oldContactName, setOldContactName] = useState("");
    const [contactName, setContactName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [messageTimeStamp, setMessageTimeStamp] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [responseMsg, setResponseMsg] = useState("");

    const UpdateOldContact = async (e) => {
        e.preventDefault();
        setResponseMsg("");

        const oldNameTrim = oldContactName.trim();
        if (!oldNameTrim) {
            setResponseMsg("Old contact name is required.");
            return;
        }

        try {
            // Fetch current contact from DB
            const getRes = await fetch(
                `https://cs3870-backend-tjpk.onrender.com/contacts/${encodeURIComponent(oldNameTrim)}`
            );
            const existing = await getRes.json().catch(() => null);

            if (getRes.status !== 200 || !existing) {
                setResponseMsg(existing?.message || "Could not find existing contact.");
                return;
            }

            // If an input field is blank, use the value from the DB; otherwise use the provided input.
            const body = {
                contact_name: contactName.trim() ? contactName : existing.contact_name,
                phone_number: phoneNumber.trim() ? phoneNumber : existing.phone_number,
                message: message.trim() ? message : existing.message,
                image_url: imageUrl.trim() ? imageUrl : existing.image_url,
            };

            const res = await fetch(
                `https://cs3870-backend-tjpk.onrender.com/contacts/${encodeURIComponent(oldNameTrim)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json().catch(() => null);
            if (res.status === 200) {
                setResponseMsg("Contact updated successfully!");
                // Clear fields
                setOldContactName("");
                setContactName("");
                setPhoneNumber("");
                setMessage("");
                setMessageTimeStamp(Date.now());
                setImageUrl("");
            } else {
                setResponseMsg(data?.message || "Failed to update contact.");
            }
        } catch (error) {
            console.log("PUT error:", error);
            setResponseMsg("Network error: Could not connect to the server.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Update Contact</h2>
            <br />
            <div>
                <input
                    type="text"
                    placeholder="Old Full Name"
                    value={oldContactName}
                    onChange={(e) => setOldContactName(e.target.value)}
                />
            </div>
            <hr style={{ border: "1px solid black" }} />

            <form onSubmit={UpdateOldContact}>
                <input
                    type="text"
                    placeholder="New Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="New Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="New Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="New Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Update Contact</button>
            </form>
            {responseMsg && (
                <p style={{ marginTop: "15px", color: "blue" }}>{responseMsg}</p>
            )}
        </div>
    );
}