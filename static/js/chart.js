/** Reads the dataset in to a javaScript object from a csv file. */
async function parseData () {
    const response = await fetch('salaries_cyber.csv');
    const textCsv = await response.text();
    // eslint-disable-next-line no-undef
    const dataset = Papa.parse(textCsv);
    return dataset.data;
}

/**
 * casting string vlaues from the csv to appropriate types.
 * @param {any} field - the value that is being converted to the appropriate type.
 * @param {string} type - the elements data type to cast to in string form.
 */
function castValue (field, type) {
    if (type === 'int') {
        return parseInt(field);
    }
    if (type === 'str') {
        return field;
    }
    throw new Error('Unsupported field type.');
}

/**
 * changing the form of the dataset which is a big set of rows into a set of columns for the dataset.
 * @param {Papa.ParseResult} data - the data object representing the dataset.
 */
function rowsToColumns (data) {
    const columns = {};
    const columnTypes = data[1];

    data[0].forEach(function (element) { columns[element] = []; });

    for (let i = 2; i < data.length; i++) {
        const row = data[i];
        for (let rowIndex = 0; rowIndex < row.length; rowIndex++) {
            const fieldName = data[0][rowIndex];
            let fieldValue = row[rowIndex];
            fieldValue = castValue(fieldValue, columnTypes[rowIndex]);

            columns[fieldName].push(fieldValue);
        }
    }
    console.log(columns);
    return columns;
}

/**
 * this renders the scatter plot to HTML.
 * @param {Papa.ParseResult} data - the data object representing the dataset.
 */
function createGraph (data) {
    const columns = rowsToColumns(data);

    const chartData = {
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

    // eslint-disable-next-line no-undef
    const chart = c3.generate(chartData);
    return chart;
}

parseData().then((data) => { createGraph(data); });
// https://c3js.org/
// https://www.papaparse.com/
