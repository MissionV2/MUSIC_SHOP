import Dashboard from "../pages/Dashboard/Dashboard";
import RecordsList from "../pages/Records/List";
import RecordDetails from "../pages/Records/Details";
import CompositionDetails from "../pages/Compositions/Detail";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/records", element: <RecordsList /> },
  { path: "/records/:id", element: <RecordDetails /> },
  { path: "/compositions/:id", element: <CompositionDetails /> },
];