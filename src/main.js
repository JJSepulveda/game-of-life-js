console.log("se agrego un archivo de javascript correctametne")

// Nodos
const gridSection = document.querySelector(".game-grid");
const playButton = document.querySelector(".buttons__play-button")

// Constantes
const ROWS = 15;
const COLS = 20;
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
