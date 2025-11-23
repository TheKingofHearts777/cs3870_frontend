import Sidebar from "./Sidebar.jsx";
export default function Layout({ title, children }) {
    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                {/* Left nav */}
                <div className="col-12 col-md-4 col-lg-3">
                    <Sidebar />
                </div>
                {/* Main content */}
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="border rounded-4 p-4">
                        <h1 className="text-center mb-4">{title}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}