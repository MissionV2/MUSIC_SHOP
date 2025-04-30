import Dashboard from "../pages/Dashboard/Dashboard";
import RecordsList from "../pages/Records/List";
import RecordDetails from "../pages/Records/Details";
import CompositionDetails from "../pages/Compositions/Detail";
import EnsembleDetails from "../pages/Ensemble/Detail";
import MusicianDetails from "../pages/Musician/Detail";
import LableDetails from '../pages/Lable/Detail'
export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/records", element: <RecordsList /> },
  { path: "/records/:id", element: <RecordDetails /> },
  { path: "/compositions/:id", element: <CompositionDetails /> },
  { path: "/ensemble/:id", element: <EnsembleDetails /> },
  { path: "/musician/:id", element: <MusicianDetails /> },
  { path: "/label/:id", element: <LableDetails /> },
];