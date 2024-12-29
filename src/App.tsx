import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HistoryPage from "./pages/History";
import HomePage from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/history",
      element: <HistoryPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
