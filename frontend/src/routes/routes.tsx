import Dashboard from "../pages/Dashboard/DashBoard";
import RecordsList from "../pages/Records/List";
import RecordDetails from "../pages/Records/Details";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/records", element: <RecordsList /> },
  { path: "/records/:id", element: <RecordDetails /> },
];