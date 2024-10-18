import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./components/loader";

function App() {
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  useEffect(() => {
    getToken(setLoading);
  }, []);

  if (loading) return <Loader className="h-screen" />;

  return (
    <div className="App">
      <Routes>
        {routes.map(({ key, path, component }) => (
          <Route key={key} path={path} element={component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
