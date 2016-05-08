class Node {
	constructor(id, main, secondary) {
		this.id = id;
		this.main = main;
		this.secondary = secondary;
		this.label = createLabel(main, secondary);
		this.shape = 'box';
	}
}

export default Node

let createLabel = (p1, p2) => {
	let res = p1.surname + ' ' + p1.name +' (' + p1.birthday + ' - ' + p1.deathday + ')';
	if (p2 == null)
		return res;
	return res + '\n' + p2.surname + ' ' + p2.name +' (' + p2.birthday + ' - ' + p2.deathday + ')'
};