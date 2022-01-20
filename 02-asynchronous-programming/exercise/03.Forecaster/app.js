function attachEvents() {
    document.getElementById('submit').addEventListener('click', getForecast);
}

attachEvents();

const conditionsImages = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Degrees': '&#176'
        };

const forecastDiv = document.getElementById('forecast'); 

async function getForecast(event) {
    event.target.disabled = true;
    const input = document.getElementById('location');
    

    const code = await getLocationCode(input.value);
    if (typeof code == 'object') {
        forecastDiv.style.display = 'block';
        forecastDiv.textContent = code.message;
        event.target.disabled = false;
    }
    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ]);
    const currentDiv = document.getElementById('current');
    currentDiv.removeChild(currentDiv.lastChild)
    const upcomingDiv = document.getElementById('upcoming');
    upcomingDiv.removeChild(upcomingDiv.lastChild);

    const currentCondition = current.forecast.condition;
    forecastDiv.style.display = 'block';
    const currentEl = document.createElement('div');
    currentEl.className = 'forecasts';
    currentEl.innerHTML = `<span class="condition symbol">${conditionsImages[currentCondition]}</span>
<span class="condition">
    <span class="forecast-data">${current.name}</span>
    <span class="forecast-data">${current.forecast.low}${conditionsImages['Degrees']}/${current.forecast.high}${conditionsImages['Degrees']}</span>
    <span class="forecast-data">${currentCondition}</span>
</span>`;
    currentDiv.appendChild(currentEl);

    const upcomingEl = document.createElement('div');
    upcomingEl.className = 'forecast-info';
    upcoming.forecast.forEach(f => {
        const spanEl = document.createElement('span');
        spanEl.className = 'upcoming';
        spanEl.innerHTML = `<span class="symbol">${conditionsImages[f.condition]}</span>
<span class="forecast-data">${f.low}${conditionsImages['Degrees']}/${f.high}${conditionsImages['Degrees']}</span>
<span class="forecast-data">${f.condition}</span>`;
        upcomingEl.appendChild(spanEl);
    });
    upcomingDiv.appendChild(upcomingEl);

    input.value = '';
    event.target.disabled = false;
}

async function getLocationCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    
    try {
        const res = await fetch(url);
        if (res != 200) {
            throw new Error('City not found');
        }
        const data = await res.json();

        const location = data.find(l => l.name == name);
    
        return location.code;
    
    } catch (error) {
        return error;
    }
}

async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}