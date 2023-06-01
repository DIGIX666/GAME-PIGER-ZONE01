export async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    let jsonArray = [];
    for (let i = 0; i < data.length; i++) {
        jsonArray.push(data[i]);
    }
    return jsonArray;
}