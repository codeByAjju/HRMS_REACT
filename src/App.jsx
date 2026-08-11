import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css'
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
                <RouteLayout path={routes()} />
            </div>
        </Router>
    </>
}

export default App
