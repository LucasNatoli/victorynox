import { Provider } from "react-redux";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import {
  APIs,
  AppNotification,
  AppLayout,
  Backdrop,
  Dashboard,
  HistoryHome,
  Login,
  Portfolio,
  Register,
  Watchlist,
} from "./features";
import TradingViewWidget from "./features/TradingViewWidget/components/TradingViewWidget";
import { store } from "./store";

function Root() {

  
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/watchlist"
          element={
            <AppLayout>
              <Watchlist />
            </AppLayout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <AppLayout>
              <Portfolio />
            </AppLayout>
          }
        />
        <Route
          path="/apis"
          element={
            <AppLayout>
              <APIs />
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout>
              <HistoryHome />
            </AppLayout>
          }
        />
        <Route
          path="/candles"
          element={
            <AppLayout>
              <TradingViewWidget />
            </AppLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <AppNotification />
      <Backdrop />
    </Provider>
  );
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  console.log("app rendered")
  return <RouterProvider router={router} />;
}
