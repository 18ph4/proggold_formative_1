async function parseData(createG) {

    let response = await fetch("salaries_cyber.csv");
    let text_csv = await response.text();
    let dataset = Papa.parse(text_csv)
    return dataset
    
}

function createG(data){
    var years = ['work_year'];
    var salary = ['salary'];
    var jobs = ['job_title']
    for (var i = 1; i < data.length; i ++){
        years.push(data[i][0]);
        jobs.push(data[i][2])
        salary.push(data[i][3]); 
    }

    var chart = c3.generate({
        data: {
            xs: {
                setosa: 'setosa_x',
                versicolor: 'versicolor_x',
            },
            // iris data from R
            columns: [
                jobs,
                salary
            ],
            type: 'scatter'
        },
        axis: {
            x: {
                label: 'Sepal.Width',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'Petal.Width'
            }
        }
    });

   return chart
    
}

parseData();

//https://www.papaparse.com/
