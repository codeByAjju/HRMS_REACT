import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css'
import { AdminSidebar, Navbar } from "./components";
import { Unknown } from "./components";
import { routes } from "./route/index";

function RouteLayout({ path }) {
    const element = useRoutes(path);
    if (!element) {
        return <Unknown />;
    }
    return element;
}
function App() {

    return <>
        <Router>
            <div className="App">
                <div className="admin-shell">
                    <div className="sidebar-backdrop" data-sidebar-close></div>
                    <AdminSidebar />
                    <div className="admin-main">
                        <Navbar />
                        <RouteLayout path={routes()} />
                    </div>
                </div>
            </div>
        </Router>
    </>
}

export default App
