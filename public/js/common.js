let getWeather = () => {
    if (!window.fetching) {
        window.fetching = true;
        let p1 = document.getElementById('message-1');
        let p2 = document.getElementById('message-2');
        let p3 = document.getElementById('message-3');
        let p4 = document.getElementById('message-4');

        p1.innerText = "Loading ....";
        p2.innerText = "Loading ....";
        p3.innerText = "Loading ....";
        p4.innerText = "Loading ....";

        let address = document.getElementById('address').value;
        let url = '/weather?address=' + encodeURIComponent(address);
        fetch(url).then(response => {
            response.json().then(data => {
                if ('error' in data) {
                    p1.innerText = data.error;
                    p2.innerText = '';
                    p3.innerText = '';
                    p4.innerText = '';
                } else {
                    p1.innerText = data.name;
                    p2.innerText = data.summary + ' ' + data.today.summary;
                    p3.innerText = 'Current Temperature :' + data.temperature;
                    p4.innerText = 'Maximum temperature :' + data.today.temperatureHigh + ' Mininmum temperature :' + data.today.temperatureLow;
                }
                window.fetching = false;
            });
        });
    }
};