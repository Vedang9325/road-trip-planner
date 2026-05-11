/* =========================
   GOOGLE AUTH
========================= */

const provider =
    new firebase.auth.GoogleAuthProvider();


const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================
   LOGIN
========================= */

loginBtn.addEventListener("click", async () => {

    try {

        await auth.signInWithPopup(provider);

    } catch (error) {

    console.error(error);

    alert(error.message);
}
});


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", async () => {

    await auth.signOut();
});


/* =========================
   AUTH STATE
========================= */

auth.onAuthStateChanged((user) => {

    const userProfile =
        document.getElementById("userProfile");

    if (user) {

        loginBtn.classList.add("hidden");

        userProfile.classList.remove("hidden");

        document.getElementById("userName")
            .textContent = user.displayName;

        document.getElementById("userAvatar")
            .src = user.photoURL;

    } else {

        loginBtn.classList.remove("hidden");

        userProfile.classList.add("hidden");
    }
});