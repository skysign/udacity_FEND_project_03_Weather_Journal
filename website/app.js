// Personal API Key for OpenWeatherMap API
const APIURL = 'http://api.openweathermap.org/data/2.5/weather';
// ?q={city name}&appid={API key}
const APIKey = 'c5c0688d265d12c69d78a2fcca878ada';

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
const btnGenerate = document.getElementById('generate');
btnGenerate.addEventListener('click', clickBtnGenerate);

/* Function called by event listener */
function clickBtnGenerate(event) {
    event.preventDefault();
    btnGenerate.classList.remove('invalid');
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;    

    if (zip == '') {
        console.log('clickBtnGenerate', 'no zip');
        return;
    }
    
    console.log('clickBtnGenerate', zip);

    callWeatherAPI(zip)
    .then(function(weatherData){
        postProjectData('/postProjectData',
                        {temp: weatherData.main.temp, date: newDate, content: content });
    })
    .then(function(){
        getProjectData();
    })
    .catch(function(error){
        console.log(error);
    })
}

/* Function to GET Web API Data*/
const callWeatherAPI = async(zip) => {
    const res = await fetch(`${APIURL}?q=${zip}&appid=${APIKey}`);
    try {
        const weatherData = await res.json();
        console.log('callWeatherAPI', weatherData);
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postProjectData = async(url = '', projectData = {}) => {
    console.log('postProjectData', projectData.temp);
    console.log('postProjectData', projectData.date);
    console.log('postProjectData', projectData.content);

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: projectData.temp,
            date: projectData.date,
            content: projectData.content
        })
    });

    try {
        const data = await response.json();
        console.log('postProjectData', data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

/* Function to GET Project Data */
const getProjectData = async() => {
    const request = await fetch('/getProjectData');
    try {
        const projectData = await request.json();
        console.log('getProjectData', projectData);
        updateWeather(projectData);
    } catch (error) {
        console.log('error', error);
    }
};

function updateWeather(projectData) {
    document.getElementById('date').innerHTML = projectData.date;
    document.getElementById('temp').innerHTML = projectData.temp;
    document.getElementById('content').innerHTML = projectData.content;
}