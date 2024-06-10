import { SymbolsCards } from "./SymbolCards";
import { FabAdd, Title } from "../../";
import { DataFetchDialog } from "./DataFetchDialog";
import {useHistory} from "../hooks/useHistory"

export function HistoryHome() {
  
  const {data, isSuccess, open,  hideImportDialog, showImportDialog, handleImportSubmit} = useHistory()
  
  return (
    <>
      <Title variant="h4">Historial</Title>
      {isSuccess && (
        <>
          <Title>Mensual</Title>
          <SymbolsCards symbols={data.monthly}  />
          <Title>Diario</Title>
          <SymbolsCards symbols={data.daily}  />
        </>
      )}
      <FabAdd onClick={showImportDialog} />
      <DataFetchDialog
        open={open}
        handleClose={hideImportDialog}
        handleSubmit={handleImportSubmit}
      />
    </>
  );
}
