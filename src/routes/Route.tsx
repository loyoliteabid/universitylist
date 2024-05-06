import { BrowserRouter, Routes, Route } from "react-router-dom";

// local modules
import UniversityList from "../views/UniversityList";
import UniversityDetails from "../views/UniversityDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversityList />} />
        <Route path="/details/:id" element={<UniversityDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
