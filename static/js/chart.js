async function parseData (createG) {
    const response = await fetch('salaries_cyber.csv');
    const text_csv = await response.text();
    const dataset = Papa.parse(text_csv);
    return dataset.data;
}



function castValue (field, type) {
    if (type === 'int') {
        return parseInt(field);
    }
    if (type === 'str') {
        return field;
    }
    throw new Error('Unsupported field type.');
}

function rowsToColumns (data) {
    const columns = {};
    const column_titles = data[0];
    const column_types = data[1];

    data[0].forEach(function (element) { columns[element] = []; });

    for (let i = 2; i < data.length; i++) {
        const row = data[i];
        for (let row_i = 0; row_i < row.length; row_i++) {
            const field_name = data[0][row_i];
            let field_value = row[row_i];
            field_value = castValue(field_value, column_types[row_i]);

            columns[field_name].push(field_value);
        }
    }
    console.log(columns);
    return columns;
}

function createGraph (data) {
    const columns = rowsToColumns(data);

    const chart_data = {
        bindto: '#chart',
        data: {

            xs: {
                salary_in_usd: 'work_year'
            },
            columns: [

                ['salary_in_usd'].concat(columns.salary_in_usd),
                ['work_year'].concat(columns.work_year)
            ],
            type: 'scatter'
        },
        axis: {
            x: {
                label: 'Work Year',
                tick: {
                    values: ['2020', '2021', '2022']
                }
            },
            y: {
                label: 'Salary'
            }
        }
    };

    const chart = c3.generate(chart_data);
    return chart;
}

parseData().then((data) => { createGraph(data); });
// https://c3js.org/
// https://www.papaparse.com/
