import { NavLink } from "react-router-dom";
export default function Sidebar() {
    return (
        <aside className="p-3 border rounded-4" style={{ minWidth: 260, background: "#f8fbff" }}>
            <h4 className="mb-3">Navigation</h4>
            <nav className="nav flex-column gap-2">
                <NavLink end to="/" className="nav-link border rounded-3 px-3 py-2">
                    Home
                </NavLink>
                <NavLink to="/contacts" className="nav-link border rounded-3 px-3 py-2">
                    View Contacts
                </NavLink>
                <NavLink to="/add" className="nav-link border rounded-3 px-3 py-2">
                    Add contact
                </NavLink>
                <NavLink to="/delete" className="nav-link border rounded-3 px-3 py-2">
                    Delete contact
                </NavLink>
                <NavLink to="/update" className="nav-link border rounded-3 px-3 py-2">
                    Update contact
                </NavLink>
                <navLink to="/getOne" className="nav-link border rounded-3 px-3 py-2">
                    Get one contact
                </navLink>
            </nav>
        </aside>
    );
}