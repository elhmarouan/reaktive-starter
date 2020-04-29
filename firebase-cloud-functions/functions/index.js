const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reaktive-starter.firebaseio.com"
});

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Get User feed posts
exports.getPosts = functions.https.onRequest((req, res) => {
    const ref = db.collection("posts");
    let data = [];

    ref.get()
      .then(querySnapshot => {

        querySnapshot.forEach(doc => {
            if (doc.exists) {
                const post = doc.data() || {};
                // post.user.get().then(user => {
                //     post.id = doc.id;
                //     post.user = user.data();
                //     data.push(post);
                // })
                // post.user = user.data();
                post.id = doc.id;
                data.push(post);
            }
        });

        return res.send(data);
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});