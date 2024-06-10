import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

export function SymbolsCards({ symbols }) {
  return (
    <Grid container spacing={1}>
      {symbols.map((i) => (
        <Grid item key={i.symbol} sm={12} md={6} lg={4} xl={3} p={1}>
          <Card>
            <CardContent>
              <Typography variant="h6">{i.symbol}</Typography>
              <Typography variant="subtitle2">{i.grans.join(", ")}</Typography>
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
