window.onload = () => {

    const getBtns = document.getElementsByClassName('getBtns'),
        deleteBtns = document.getElementsByClassName('deleteBtns'),
        rentBtns = document.getElementsByClassName('rentBtns'),
        returnBtns = document.getElementsByClassName('returnBtns');

    for (const btn of getBtns) { btn.onclick = reqMovieData; }
    for (const btn of deleteBtns) { btn.onclick = deleteMovie; }
    // for (const btn of rentBtns) { btn.onclick = rentMovie; }
    // for (const btn of returnBtns) { btn.onclick = returnMovie; }

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

    const movieID = this.parentNode.id;

    fetch(`${window.location.origin}/movie/${movieID}`, {
            method: 'DELETE'
        })
        .then(rs => {

            if (rs.status !== 200) {

                return console.log(`Something went wrong\nStatus Code: ${rs.status}\nrsponse: ${rs.statusText}`);

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

// vscode-fold=1