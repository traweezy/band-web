import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import type { GridValidRowModel } from '@mui/x-data-grid';
import flatten from 'flat';
import useMobileDetect from 'use-mobile-detect-hook';
import { useGetRecordings, useGetTabs, useGetLyrics, useGetEvents, useGetImages } from '../../../store/server';
import { recordingsColumns, tabsColumns, lyricsColumns, imagesColumns, eventsColumns, getFooter } from './grid.conf';
import { useStore } from '../../../store/local';

const PanelGrid = () => {
  const routes = useStore(state => state.routes);

  const { isMobile } = useMobileDetect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selected, setSelected] = useState<any | null>(null);
  const location = useLocation();

  const getCurrentType = () => {
    const type = routes[location.pathname as SideNavigationRoutePath];
    return type?.name ?? null;
  };

  const { data: recordings, isLoading: recordingsIsLoading, isRefetching: recordingsIsRefetching } = useGetRecordings();
  const { data: tabs, isLoading: tabsIsLoading, isRefetching: tabsIsRefetching } = useGetTabs();
  const { data: lyrics, isLoading: lyricsIsLoading, isRefetching: lyricsIsRefetching } = useGetLyrics();
  const { data: images, isLoading: imagesIsLoading, isRefetching: imagesIsRefetching } = useGetImages();
  const { data: events, isLoading: eventsIsLoading, isRefetching: eventsIsRefetching } = useGetEvents();

  const getGridProps = () => {
    switch (getCurrentType()) {
      case 'Recordings': {
        return {
          rows: recordings ? (recordings?.map(flatten) as readonly GridValidRowModel[]) : [],
          loading: recordingsIsLoading || recordingsIsRefetching,
          columns: recordingsColumns,
        };
      }
      case 'Tabs': {
        return {
          rows: tabs ? (tabs?.map(flatten) as readonly GridValidRowModel[]) : [],
          loading: tabsIsLoading || tabsIsRefetching,
          columns: tabsColumns,
        };
      }
      case 'Lyrics': {
        return {
          rows: lyrics ? (lyrics?.map(flatten) as readonly GridValidRowModel[]) : [],
          loading: lyricsIsLoading || lyricsIsRefetching,
          columns: lyricsColumns,
        };
      }
      case 'Images': {
        return {
          rows: images ? (images?.map(flatten) as readonly GridValidRowModel[]) : [],
          loading: imagesIsLoading || imagesIsRefetching,
          columns: imagesColumns,
        };
      }
      case 'Events': {
        return {
          rows: events ? (events?.map(flatten) as readonly GridValidRowModel[]) : [],
          loading: eventsIsLoading || eventsIsRefetching,
          columns: eventsColumns,
        };
      }
      default: {
        return {
          rows: [],
          loading: false,
          columns: [],
        };
      }
    }
  };

  const { rows, loading, columns } = getGridProps();

  return (
    <DataGrid
      sx={{
        borderRadius: isMobile() ? 0 : 'initial',
      }}
      rows={rows}
      loading={loading}
      columns={
        isMobile()
          ? columns?.filter((column: any) => column?.field === 'Title' || column?.field === 'Actions')
          : columns?.map((column: any) => {
              column.width = undefined;
              column.flex = 1;
              return column;
            })
      }
      onSelectionModelChange={newSelectionModel => {
        const [index] = newSelectionModel;
        const found = recordings?.find(({ id }) => id === index);
        setSelected(found ?? null);
      }}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Footer: () => getFooter(getCurrentType(), isMobile(), selected) as any,
      }}
      componentsProps={{
        footer: { selected },
      }}
    />
  );
};

export default PanelGrid;
