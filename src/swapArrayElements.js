
export default function swapArrayElements (array,x,y) {

	var a = JSON.parse(JSON.stringify(array[x]));
	var b = JSON.parse(JSON.stringify(array[y]));

	array[y] = a;
	array[x] = b;

	return array;
}