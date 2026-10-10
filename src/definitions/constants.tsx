export const CELL_SIZE = 10;
export const ROWS = 30;
export const COLUMNS = 30;
export const DEFAULT_INTERVAL = 400;

// How much empty margin to leave around a loaded pattern on each side,
// so it has room to move or grow instead of touching the walls.
export const BOARD_PADDING = 4;

// Upper bound on a loaded pattern's board size, so a huge or malformed
// file can't blow up the layout or the simulation's cost per generation.
export const MAX_BOARD_DIMENSION = 60;
