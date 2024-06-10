import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import { useGetTickerQuery } from "../../api/restApiSlice";
export function FavoritesCards({ favorites }) {
  const symbols = favorites.map(f=>f.symbol)
  const {data, isLoading, isSuccess} = useGetTickerQuery(symbols)
  return (
    <Grid container spacing={1}>
      {favorites.map((i) => (
        <Grid item key={i.t} sm={12} md={6} lg={4} xl={3} p={1}>
          <Card>
            <CardContent>
              <Typography variant="h6">{i.symbol}</Typography>
              {/* <Typography variant="subtitle2">{i.grans.join(", ")}</Typography> */}
              <Divider />
            </CardContent>
            <CardActions>
              <IconButton>
                <CandlestickChartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
