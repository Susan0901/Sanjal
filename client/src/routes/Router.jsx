import { Route, Routes } from "react-router";
import Welcome from "../pages/Welcome";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default Router;
