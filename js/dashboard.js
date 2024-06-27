function addRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    newRow.cells[0].innerText = 'Data Base / Journal';
    for (let i = 1; i < newRow.cells.length; i++) {
        newRow.cells[i].innerText = '0';
    }
    table.appendChild(newRow);
}

function removeRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    } else {
        alert('There must be at least one row in the table.');
    }
}

function addRowToTable(button) {
    const table = button.closest('.keyword-table-container').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    newRow.cells[0].innerText = 'Data Base / Journal';
    for (let i = 1; i < newRow.cells.length; i++) {
        newRow.cells[i].innerText = '0';
    }
    table.appendChild(newRow);
}

function removeRowFromTable(button) {
    const table = button.closest('.keyword-table-container').getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    } else {
        alert('There must be at least one row in the table.');
    }
}

function addKeywordTable() {
    const container = document.getElementById('tables-container');
    const newTableContainer = document.createElement('div');
    newTableContainer.className = 'keyword-table-container';
    newTableContainer.innerHTML = `
        <table class="keyword-table">
            <thead>
                <tr>
                    <th rowspan="3">Data base / Journal</th>
                    <th colspan="8">Keywords</th>
                </tr>
                <tr>
                    <th rowspan="2">Number of Selected Articles</th>
                    <th rowspan="2">Number of Collected Articles</th>
                    <th colspan="6">Number of included articles after criteria insertion</th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Document type</th>
                    <th>Source type</th>
                    <th>Language</th>
                    <th>Other</th>
                    <th>On topic</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td contenteditable="true">Data Base / Journal</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                    <td contenteditable="true">0</td>
                </tr>
            </tbody>
        </table>
        <div class="button-container">
            <button onclick="addRowToTable(this)">Add Row</button>
            <button onclick="removeRowFromTable(this)">Remove Row</button>
        </div>
    `;
    container.appendChild(newTableContainer);
}

function saveData() {
    const tablesData = [];
    const tables = document.querySelectorAll('.keyword-table-container table');
    
    tables.forEach(table => {
        const tableData = [];
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach(cell => {
                rowData.push(cell.innerText);
            });
            tableData.push(rowData);
        });
        tablesData.push(tableData);
    });
    
    localStorage.setItem('tablesData', JSON.stringify(tablesData));
    alert('Data saved locally.');
}

function loadData() {
    const tablesData = JSON.parse(localStorage.getItem('tablesData'));
    if (!tablesData) return;

    const container = document.getElementById('tables-container');
    container.innerHTML = '';

    tablesData.forEach(tableData => {
        const newTableContainer = document.createElement('div');
        newTableContainer.className = 'keyword-table-container';
        newTableContainer.innerHTML = `
            <table class="keyword-table">
                <thead>
                    <tr>
                        <th rowspan="3">Data base / Journal</th>
                        <th colspan="8">Keywords</th>
                    </tr>
                    <tr>
                        <th rowspan="2">Number of Selected Articles</th>
                        <th rowspan="2">Number of Collected Articles</th>
                        <th colspan="6">Number of included articles after criteria insertion</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Document type</th>
                        <th>Source type</th>
                        <th>Language</th>
                        <th>Other</th>
                        <th>On topic</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="button-container">
                <button onclick="addRowToTable(this)">Add Row</button>
                <button onclick="removeRowFromTable(this)">Remove Row</button>
            </div>
        `;
        
        const tbody = newTableContainer.querySelector('tbody');
        tableData.forEach(rowData => {
            const newRow = document.createElement('tr');
            rowData.forEach(cellData => {
                const newCell = document.createElement('td');
                newCell.contentEditable = 'true';
                newCell.innerText = cellData;
                newRow.appendChild(newCell);
            });
            tbody.appendChild(newRow);
        });

        container.appendChild(newTableContainer);
    });
}

document.addEventListener('DOMContentLoaded', loadData);

function exportData() {
    const tablesData = [];
    const tables = document.querySelectorAll('.keyword-table-container table');
    
    tables.forEach(table => {
        const tableData = [];
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach(cell => {
                rowData.push(cell.innerText);
            });
            tableData.push(rowData);
        });
        tablesData.push(tableData);
    });
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tablesData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tables_data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


function resetData() {
    if (confirm('Are you sure you want to reset the data? This action cannot be undone.')) {
        localStorage.removeItem('tablesData');
        location.reload();
    }
}