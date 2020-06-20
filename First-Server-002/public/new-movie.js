const body = document.body;

window.onload = () => {

    document.getElementById('submitMovie').onclick = submitNewMovie;

};

function submitNewMovie() {

    const formArray = document.getElementById('newMovieForm').childNodes;
    let reqBody = {};

    formArray.forEach(elm => {

        if (!isNaN(elm.value)) {

            reqBody[elm.name] = Number(elm.value);

        } else {

            reqBody[elm.name] = elm.value;

        }

    });

    const endpoint = `${window.location.origin}/movie`,
        reqObj = {

            headers: {

                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'content-type': 'application/json'

            },

            method: 'POST',
            body: JSON.stringify(reqBody)

        };

    fetch(endpoint, reqObj)
        .then(rs => { return rs.json(); })
        .then(res => { console.log(res); })

};