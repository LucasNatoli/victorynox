import AssignmentIcon from "@mui/icons-material/Assignment";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';

const navRoutes = [
  {
    label: "Dashboard",
    route: "/",
    key: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "WatchList",
    route: "/watchlist",
    key: "watchlist",
    icon: <StarIcon />,
  },
  {
    label: "Portfolio",
    route: "/portfolio",
    key: "portfolio",
    icon: <WorkIcon />,
  },
];

const configRoutes = [
  {
    label: "APIs",
    route: "/apis",
    key: "apis",
    icon: <AssignmentIcon />,
  },
  {
    label: "Ordenes",
    route: "/",
    key: "orders",
    icon: <AssignmentIcon />,
  },
  {
    label: "Backtest",
    route: "/history",
    key: "history",
    icon: <AssignmentIcon />,
  },
  {
    label: "Chart",
    route: "/candles",
    key: "candles",
    icon: <CandlestickChartIcon />,
  },
];

export const useDrawerMenues = () => {
  return { navRoutes, configRoutes };
};
