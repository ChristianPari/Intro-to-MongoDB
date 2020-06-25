window.onload = () => {

    for (const div of document.getElementsByClassName('editMovie')) {

        div.style.display = 'none';

    }

    setEventListeners();

};

function setEventListeners() {

    const getBtns = document.getElementsByClassName('getBtns'),
        deleteBtns = document.getElementsByClassName('deleteBtns'),
        confirmBtns = document.getElementsByClassName('confirmEdits'),
        editBtns = document.getElementsByClassName('editBtns');

    for (const btn of getBtns) { btn.onclick = reqMovieData; }
    for (const btn of deleteBtns) { btn.onclick = deleteMovie; }
    for (const btn of confirmBtns) { btn.onclick = confirmEdit; }
    for (const btn of editBtns) { btn.onclick = editMovie; }

};

function reqMovieData() {

    const movieID = this.parentNode.id;

    fetch(`${window.location.origin}/movie/${movieID}`)
        .then(rs => {

            if (rs.status !== 200) {

                return console.log(`Something went wrong\nStatus Code: ${rs.status}\nrsponse: ${rs.statusText}`);

            }

            rs.json()
                .then(res => { console.log(res); })

        })
        .catch(err => {

            console.log('Something went wrong, error:\n', err);

        });

};

function deleteMovie() {

    const movieID = this.parentNode.parentNode.id;

    fetch(`${window.location.origin}/movie/${movieID}`, {
            method: 'DELETE'
        })
        .then(rs => {

            if (rs.status !== 200) {

                return console.log({ status: rs.status, message: rs.statusText });

            }

            return rs.json()

        })
        .then(res => {

            console.log(res);

            const movieID = res.deleted_movie._id;
            document.getElementById(movieID).remove();

        })
        .catch(err => {

            console.log('Something went wrong, error:\n', err);

        });

};

function editMovie() {

    let editDiv = this.parentNode.parentNode.childNodes[1],
        displayDiv = this.parentNode.parentNode.childNodes[0];

    editDiv.style.display = editDiv.style.display == 'none' ? 'flex' : 'none';
    displayDiv.style.display = displayDiv.style.display == 'none' ? 'flex' : 'none';

};

async function confirmEdit() {

    const formElms = this.parentNode.childNodes[0],
        movieID = this.parentNode.parentNode.id,
        reqBody = {},
        errIn = [],
        imgRegExp = /.jpg/g,
        urlRegExp = /imdb/g;

    for (const input of formElms) {

        if (input.value != '') {

            switch (input.name) {

                case 'title':

                    reqBody[input.name] = input.value.trim().replace(/\s+/g, '');

                    break;

                case 'release':

                    if (input.validationMessage != '') {

                        errIn.push(input.name);

                    } else {

                        reqBody[input.name] = input.value;

                    }

                    break;

                case 'img':

                    if (!imgRegExp.test(input.value)) {

                        errIn.push(input.name);

                    } else {

                        reqBody[input.name] = input.value.trim().replace(/\s+/g, '');

                    }

                    break;

                case 'imdb_link':

                    if (input.validationMessage != '' || !urlRegExp.test(input.value)) {

                        errIn.push(input.name);

                    } else {

                        reqBody[input.name] = input.value.trim().replace(/\s+/g, '');

                    }

                    break;

            }

        }

    };

    if (errIn.length != 0) {

        const errStr = errIn.join(', ');

        return alert(`Following fields need fixing: ${errStr}`);

    }

    if (Object.keys(reqBody).length < 1) { return alert("Must have at least one field filled out"); };

    const endpoint = `${window.location.origin}/movie/${movieID}`,
        reqObj = {

            headers: {

                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'content-type': 'application/json'

            },
            method: 'PATCH',
            body: JSON.stringify(reqBody)

        };

    await fetch(endpoint, reqObj)
        .then(rs => { return rs.json(); })
        .then(res => { console.log(res); })
        .catch(err => { console.log(err); })

    const refresh = confirm("Do you wish to refresh the page?");

    if (refresh == true) { window.location.reload(true); };

};

// vscode-fold=1