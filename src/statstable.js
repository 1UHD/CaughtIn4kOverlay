function addRow(th1, th2, th3, th4, th5, th6) {
    let data = [th1, th2, th3, th4, th5, th6]

    var table = document.getElementById("statstable")
    var newRow = table.insertRow()

    for(let i = 0; i < data.length; i++) {
        var cell = newRow.insertCell(i);
        cell.textContent = data[i]
    }
}