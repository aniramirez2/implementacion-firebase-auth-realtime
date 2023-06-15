import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./components/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Login/>
        </PrivateRoute>
      } />
      <Route path="/notfound" element={<NotFound/>} />
    </Routes>
  );
}

export default App;