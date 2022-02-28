import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import flatten from 'flat';
import useMobileDetect from 'use-mobile-detect-hook';
import { toast } from 'react-toastify';

const enum GridState {
  INITIAL,
  READY,
  PENDING,
  ERROR,
}

interface PanelGridProps {
  getData: () => Promise<unknown[]>;
  columns: GridColDef[];
  footerComponent: React.JSXElementConstructor<unknown> | undefined;
}

const PanelGrid = ({ getData, columns, footerComponent }: PanelGridProps) => {
  const { isMobile }: MobileDetector = useMobileDetect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [recordingGridState, setGridState] = useState<GridState>(
    GridState.INITIAL,
  );

  useEffect(() => {
    if (recordingGridState === GridState.INITIAL) {
      setGridState(GridState.PENDING);
      getData()
        .then(res => {
          setData(res);
          setGridState(GridState.READY);
        })
        .catch(error => {
          toast.error((error as Error).message);
          setGridState(GridState.ERROR);
        });
    }
  }, [recordingGridState]);

  const [selected, setSelected] = useState<unknown | null>(null);
  const location = useLocation();

  useEffect(() => {
    getData().then(res => {
      setData(res);
      setGridState(GridState.READY);
    });
  }, [location]);

  return (
    <>
      <DataGrid
        sx={{
          borderRadius: isMobile() ? 0 : 'initial',
        }}
        loading={
          recordingGridState === GridState.PENDING ||
          recordingGridState === GridState.INITIAL
        }
        rows={data.map(flatten)}
        columns={
          !isMobile()
            ? columns.map(column => {
                column.width = undefined;
                column.flex = 1;
                return column;
              })
            : columns
        }
        onSelectionModelChange={newSelectionModel => {
          const [index] = newSelectionModel;
          const found = data.find(({ id }) => id === index);
          setSelected(found ?? null);
        }}
        components={{
          Footer: footerComponent,
        }}
        componentsProps={{
          footer: { selected },
        }}
      />
    </>
  );
};

export default PanelGrid;
