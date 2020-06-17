console.log('test');

window.onload = () => {

    const getBtns = document.getElementsByClassName('getMovieBtn');

    for (const btn of getBtns) { btn.onclick = reqMovieData; }

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