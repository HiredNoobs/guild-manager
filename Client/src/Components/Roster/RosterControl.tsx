import { Apps, Check, FilterList, ImportExport, Refresh, TableRows } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import React, { useCallback, useState } from 'react';

import './RosterControl.scss';

interface Props {
  filterBy: string;
  setFilterBy: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  refetchData: () => void;
  isFetching: boolean;
  fullWidth: boolean;
  setFullWidth: (val: boolean) => void;
}

const RosterControl = ({
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  refetchData,
  isFetching,
  fullWidth,
  setFullWidth
}: Props) => {
  const [anchorElement, setAnchorElement] = useState<(EventTarget & Element) | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const onSortOpen = useCallback(
    (e: React.MouseEvent) => {
      setAnchorElement(e.currentTarget);
      setSortOpen(true);
    },
    [setAnchorElement, setSortOpen]
  );

  const onFilterOpen = useCallback(
    (e: React.MouseEvent) => {
      setAnchorElement(e.currentTarget);
      setFilterOpen(true);
    },
    [setAnchorElement, setFilterOpen]
  );

  const closeMenu = useCallback(() => {
    setSortOpen(false);
    setFilterOpen(false);
    setAnchorElement(null);
  }, [setSortOpen, setFilterOpen, setAnchorElement]);

  const sortHandler = useCallback(
    (sortBy: string) => {
      setSortBy(sortBy);
      closeMenu();
    },
    [setSortBy, closeMenu]
  );

  const filterHandler = useCallback(
    (filterBy: string) => {
      setFilterBy(filterBy);
      closeMenu();
    },
    [setFilterBy, closeMenu]
  );

  return (
    <>
      <Paper variant="outlined" className="roster-bar">
        <span className="left">
          <Tooltip title="Filter Members">
            <IconButton size="small" onClick={onFilterOpen}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort Members">
            <IconButton size="small" onClick={onSortOpen}>
              <ImportExport />
            </IconButton>
          </Tooltip>
        </span>
        <span className="right">
          <Tooltip title={fullWidth ? 'Show Members As Grid' : 'Show Members As Rows'}>
            <IconButton size="small" onClick={() => setFullWidth(!fullWidth)}>
              {fullWidth ? <Apps /> : <TableRows />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton
              size="small"
              onClick={refetchData}
              className="refresh"
              disabled={isFetching}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </span>
      </Paper>
      <Menu
        open={sortOpen}
        anchorEl={anchorElement}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => sortHandler('rank')}>
          {sortBy === 'rank' ? <Check className="selected" /> : null}
          Rank
        </MenuItem>
        <MenuItem onClick={() => sortHandler('name')}>
          {sortBy === 'name' ? <Check className="selected" /> : null}
          Name
        </MenuItem>
        <MenuItem onClick={() => sortHandler('date')}>
          {sortBy === 'date' ? <Check className="selected" /> : null}
          Join Date
        </MenuItem>
        <MenuItem onClick={() => sortHandler('warnings')}>
          {sortBy === 'warnings' ? <Check className="selected" /> : null}
          Warnings
        </MenuItem>
      </Menu>
      <Menu
        open={filterOpen}
        anchorEl={anchorElement}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => filterHandler('none')}>
          {filterBy === 'none' ? <Check className="selected" /> : null}
          No filters
        </MenuItem>
        <MenuItem onClick={() => filterHandler('has-gw2')}>
          {filterBy === 'has-gw2' ? <Check className="selected" /> : null}
          Has GW2 Account
        </MenuItem>
        <MenuItem onClick={() => filterHandler('excess-discord')}>
          {filterBy === 'excess-discord' ? <Check className="selected" /> : null}
          Excess Discord
        </MenuItem>
        <MenuItem onClick={() => filterHandler('issues')}>
          {filterBy === 'issues' ? <Check className="selected" /> : null}
          Any issues
        </MenuItem>
        <MenuItem onClick={() => filterHandler('warnings')}>
          {filterBy === 'warnings' ? <Check className="selected" /> : null}
          Any warnings
        </MenuItem>
      </Menu>
    </>
  );
};

export default RosterControl;
