import "./App.css";
import useLocalStorage from "use-local-storage";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import SqlHome from "./SqlHome";
import Footer from "./Footer";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <div className="nav-container">
        <div className="light-toggle">
          <button onClick={switchTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="main-content">
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Link eventKey="disabled" disabled>
              Inactive
            </Nav.Link>
            <Nav.Item>
              <Nav.Link href="/">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Inactive
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="Github-container">Github</div>
      </div>
      <SqlHome />
      <Footer />
    </div>
  );
}

export default App;
