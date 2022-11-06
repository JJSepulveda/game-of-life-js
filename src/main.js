console.log("se agrego un archivo de javascript correctametne")

// Nodos
const gridSection = document.querySelector(".game-grid");
const buttonContainer = document.querySelector(".buttons__startStop")
const playButton = document.querySelector(".buttons__play-button")
const stopButton = document.querySelector(".buttons__stop-button")

playButton.addEventListener("click", start_game);
stopButton.addEventListener("click", stop_game);

// Constantes
const ROWS = 20;
const COLS = 30;
const cell_rows = new Array(ROWS).fill([]);

// Variables
let listElements = [];
let cells = cell_rows.map(() => {
	// esto parece funcionar :D
	return new Array(COLS).fill(false);
})

// source code
/**
* Generate the grid game
*/
const create_intial_grid = () => {
	for (let row = 0; row < ROWS; row++) {
		const list = document.createElement("ul");

		for (let column = 0; column < COLS; column++) {
			const listItem = document.createElement("li");
			const itemButton = document.createElement("button");
			itemButton.id = `${row}-${column}`
			itemButton.addEventListener('click', () => {
				toggle_state_and_set_style(itemButton);
			});
			listItem.append(itemButton)
			list.append(listItem)
		}

		listElements.push(list)
	}
}

create_intial_grid();

gridSection.append(...listElements);

/**
* get the cell id in list form
* @param {string} cell_id - the cell id string that is placed in the button id
* @return {array} 
*/
function get_cell_id(cell_id) {
	[row, column] = cell_id.split('-');
	row = parseInt(row)
	column = parseInt(column)

	if (!(row < ROWS && row >= 0)) {
		return;
	}

	if (!(column < COLS && column >= 0)) {
		return;
	}

	return [row, column];
}

/**
* toggle the cell state
* @param {string} cell_id - the cell id string that was placed in the button id
*/
function toggle_cell_state(cell_id) {
	[row, column] = get_cell_id(cell_id)
	cells[row][column] = !cells[row][column];
}


/**
* Set the style of the cell by adding or removing the class
* @param {object} cell_element - The dom-elment of the cell
* @param {bool} alive - The actual state of the cell
*/
function set_cell_style(cell_element, alive) {
	if (alive) {
		cell_element.classList.add("alive");
		return;
	}
	cell_element.classList.remove('alive');
}

/**
* Update the state and the style of a cell
*/
function toggle_state_and_set_style(itemButton){
	[row, column] = get_cell_id(itemButton.id)
	toggle_cell_state(itemButton.id);
	set_cell_style(itemButton, cells[row][column]);
}
//********************************************************
// CELL LOGIC
//********************************************************

/**
* Get the previous row
* @param {number} rowIndex - the row index of the actual cell
* @return {number} previousRow - The index of the previous row
*/
function get_previous_row(rowIndex) {
	let previousRow = rowIndex - 1;
	const firstRow = 0;
		
	// Am I in the first row?
	if (rowIndex === firstRow) {
		const last_row = ROWS - 1;
		previousRow = last_row;
	}

	return previousRow;
}

/**
* Get the next row
* @param {number} rowIndex - the row index of the actual cell
* @return {number} nextRow - The index of the next row
*/
function get_next_row(rowIndex) {
	let nextRow = rowIndex + 1 ;
	const lastRow = ROWS - 1;

	// Am I in the last row?
	if (rowIndex === lastRow) {
		nextRow = 0;
	}

	return nextRow;
}

/**
* Get the previous column
* @param {number} columnIndex - the column index of the actual cell
* @return {number} previousColumn - The previous column index
*/
function get_previous_column(columnIndex) {
	let previousColumn = columnIndex - 1 ;
	const firstColumn = 0;

	// Am I in the first column?
	if (columnIndex === firstColumn) {
		const lastColumn = COLS - 1;
		previousColumn = lastColumn;
	}

	return previousColumn;
}

/**
* Get the next column
* @param {number} columnIndex - the column index of the actual cell
* @return {number} nextColumn - The next column index
*/
function get_next_column(columnIndex) {
	let nextColumn = columnIndex + 1 ;
	const lastColumn = COLS - 1;
	// Am I in the last column?
	if (columnIndex === lastColumn) {
		const firstColumn = 0;
		nextColumn = firstColumn;
	}

	return nextColumn;
}

/**
* Count the number of cell neighbours alive
* @param {number} rowIndex - the row index of the actual cell
* @param {number} columnIndex - the column index of the actual cell
* @return {number} counter - The amount of cell neighbours alive
*/
function neighbours_count(rowIndex, columnIndex){
	const previousRow = get_previous_row(rowIndex);
	const nextRow = get_next_row(rowIndex);
	const previousColumn = get_previous_column(columnIndex);
	const nextColumn = get_next_column(columnIndex);
	const neighboursList = [
		// Previous
		[previousRow, previousColumn],
		[previousRow, columnIndex],
		[previousRow, nextColumn],
		// Middle
		[rowIndex, previousColumn],
		[rowIndex, nextColumn],
		// Next
		[nextRow, previousColumn],
		[nextRow, columnIndex],
		[nextRow, nextColumn],
	]

	const counter = neighboursList.reduce((acumulator, element) => {
		acumulator += Number(cells[element[0]][element[1]]);
		return acumulator;
	}, 0)

	return counter
}

/**
* Update the state of an individual cell
* @param {number} rowIndex - the row index of the actual cell
* @param {number} columnIndex - the colum index of the actual cell
* @return {bool} newValue - The new value of the cell
*/
function update_cell(rowIndex, columnIndex) {
	const actualValue = cells[rowIndex][columnIndex];
	const neighboursCounter = neighbours_count(rowIndex, columnIndex);

	//element = document.getElementById(`${rowIndex}-${columnIndex}`)
	//element.innerHTML = '' + neighboursCounter

	if (!actualValue && neighboursCounter === 3) {
		//console.log('revive', rowIndex, columnIndex)
		return true;
	}

	if (!actualValue) {
		//console.log('estaba muerta, se queda muerta', rowIndex, columnIndex)
		return actualValue;
	}

	if (neighboursCounter <= 1){
		return false;
	}

	if (neighboursCounter >= 4){
		//console.log('Muere por sobrepoblación', rowIndex, columnIndex)
		return false;	
	}
	//console.group(`${rowIndex}${columnIndex}`)
	//console.log(neighboursCounter)
	//console.log('Estaba viva y se mantiene viva', rowIndex, columnIndex)
	//console.groupEnd(`${rowIndex}${columnIndex}`)
	return actualValue;
}

/**
* Update the state of each cell
*/
function update_cells() {
	const cellsCopy = cells.map((rowsCells, rowIndex) => {
		const newCellRows = rowsCells.map((cell, columnIndex) => {
			newCellValue = update_cell(rowIndex, columnIndex)
			// update de style
			element = document.getElementById(`${rowIndex}-${columnIndex}`)
			set_cell_style(element, newCellValue)
			return newCellValue;
		})
		
		return newCellRows;
	})

	cells = cellsCopy;
}

// variable to store our intervalID
let nIntervId;

/**
* Start or stop the game
* https://developer.mozilla.org/en-US/docs/Web/API/setInterval
*/
function start_game() {
	// check if an interval has already been set up
	if (!nIntervId) {
		nIntervId = setInterval(update_cells, 500);
		stopButton.removeAttribute("hidden"); 
		playButton.setAttribute("hidden", '');
	}
}

function stop_game() {
	clearInterval(nIntervId);
	// release our intervalID from the variable
	nIntervId = null;
	playButton.removeAttribute("hidden"); 
	stopButton.setAttribute("hidden", '');
	console.log('play')
}
