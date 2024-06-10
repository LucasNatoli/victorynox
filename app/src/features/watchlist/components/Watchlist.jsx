import { FabAdd, Title } from "../../";
import { useWatchList } from "../hooks/useWatchList";
import { FavoritesCards } from "./FavoritesCards";
import { SymbolSearch } from "../../";

export function Watchlist() {
  const { data, isSuccess, open, show, hide } = useWatchList();

  function selected(s){
    hide()
    //check and add to api 
  }
  return (
    <>
      <Title variant="h4">Watchlist</Title>
      {isSuccess && (
        <>
          <FavoritesCards favorites={data} />
        </>
      )}
      <SymbolSearch open={open} show={show} hide={hide} selected={selected} />
      <FabAdd onClick={show} />
      {/* <DataFetchDialog
        open={open}
        handleClose={hideImportDialog}
        handleSubmit={handleImportSubmit}
      /> */}


      {/* 
      //TODO: Remove DataGrid from package?
      <DataGrid rows={list} columns={columns} /> */}
    </>
  );
}
