function registrar() {
    var email = document.getElementById('email').value;
    var pass= document.getElementById('password').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function() {
        verificarEmail();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function ingresar() {
    var email = document.getElementById('email2').value;
    var pass= document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('existe usuario activo');
          console.log('emailVerified ' + user.emailVerified);
          profile(user);
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario activo');
          contenido.innerHTML = ``;
        }
      });
}

observador();

function profile(user) {
    var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = `
        <p>Bienveido!</p>
        <button onclick="cerrar()">Cerrar sesión</button>
    `;
    }
}

function cerrar() {
    firebase.auth().signOut()
        .then(function() {
            console.log('saliendo...');
        })
        .catch(function(error) {
            console.log(error);
        })

}

function verificarEmail() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('enviando correo...');
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
}