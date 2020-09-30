////// variables
const listaTweets = document.getElementById('lista-tweets');

////// event listeners
// mando a llamar a la funcion
eventListeners();

// declaro la funcion
function eventListeners() {
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // para borrar un tweet
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

/////// funciones
// Agrega el tweet
function agregarTweet(e) {
    e.preventDefault();

    // leer el valor de text area, se almacena como la variable tweet
    const tweet = document.getElementById('tweet').value;
    // crea un elemento li donde voy a almacenar el tweet
    const li = document.createElement('li');
    // lo que escribi en la variable tweet se agrega al li
    li.innerText = tweet;

    // creo el boton para eliminar
    const bottonBorrar = document.createElement('a');
    // le agrego una clase
    bottonBorrar.classList = 'borrar-tweet';
    // agrego el texto que se va a ver
    bottonBorrar.innerText = 'X';

    // agrego el tweet al html como un li
    listaTweets.appendChild(li);
    // agrego el boton al html como un a
    li.appendChild(bottonBorrar);

    // añadir a local storage
    agregarTweetLocalStorage(tweet);
}


// elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    // compruebo que se seleccione solo cuando hago click en ese elemento que tiene la clase de borrar
    if(e.target.className === 'borrar-tweet') {
    // con target y parent element ubico al elemento que contiene a todo el tweet, en este caso es li. agregando la funcion remove lo elimino
        e.target.parentElement.remove();
        // con esto selecciono el texto del tweet con la X
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}


// mostrar datos de local storage en la lista
function localStorageListo() {
    let tweets;
    // si no hay nada se retorna un arreglo vacio, sino los que tenga
    tweets = obtenerTweetsLocalStorage();

    // con esto hago que lo que esta en local storage se agregue al html. copie lo mismo que hacia que se agreguen cuando escribia un nuevo tweet, pero carga los datos que ya tengo almacenados
    tweets.forEach(function(tweet) {
        const bottonBorrar = document.createElement('a');
        bottonBorrar.classList = 'borrar-tweet';
        bottonBorrar.innerText = 'X';
        const li = document.createElement('li');
        li.innerText = tweet;
        listaTweets.appendChild(li);
        li.appendChild(bottonBorrar); 
    });
}


// agrega el tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    // me fijo si hay tweets en local storage
    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet al arreglo
    tweets.push(tweet);

    // lo agrego a local storage, como sobre escribe lo convierto de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));

    //agregar a local storage
    //localStorage.setItem('tweets', tweet);
}


// comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage () {
    let tweets;
    // revisar los valores de local storage
    // si no hay nada se inicia tweets como un arreglo vacio, si hay algo lo agrega al arreglo despues del elemento que ya estaba
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    } // el JSON es para hacer el arreglo qsy
    return tweets;
}

// eliminar el tweet de local storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;

    // le paso el tweet que quiero borrar. corto la cadena para sacar la X. Substring tiene 2 parametros, va desde la posicion 0 hasta uno menos, por eso uso .length-1
    tweetBorrar = tweet.substring(0, tweet.length-1);

    tweets = obtenerTweetsLocalStorage();

    // recorro el arreglo de tweets, busco si el que quiero eliminar esta en ese arreglo entonces lo borra con splice. index va diciendo en que posicion esta, entonces si quiero eliminar el 3 le paso el index a splice, despues necesito poner cuantos mas quiero eliminar, como es ese solo pongo 1
    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
