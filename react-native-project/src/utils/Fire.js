import firebase from './firebase';

class Fire {

    deletePost = async (postId) => {
        return new Promise(async (res, rej) => {
            this.firestore.collection("posts").doc(postId).delete()
            .then(ref => {
                res(ref);
            })
            .catch(err => {
                rej(err);
            });
        });        
    }

    getPosts = async () => {
        let ref = this.firestore.collection("posts").orderBy("timestamp", "desc");
        try {
            const querySnapshot = await ref.get();

            return Promise.all(
                querySnapshot.docs.map(async doc => {
                    if (doc.exists) {
                        const post = doc.data() || {};
                        const user = await post.user.get();
                        post.user = user.data();
                        post.id = doc.id;
                        return post;
                    }  
                })
            );
        } catch ({ message }) {
            alert(message);
        }
    };    

    addPost = async ({text, localUri}) => {
        const photoPath = `photos/${this.uid}/${this.timestamp}.jpg`;
        const remoteUri = await this.uploadPhotoAsync(localUri, photoPath);

        return new Promise(async (res, rej) => {
            this.firestore.collection("posts").add({
                text,
                user: this.firestore.doc(`/users/${this.uid}`),
                timestamp: this.timestamp,
                image: remoteUri,
                username: firebase.auth().currentUser.displayName
            })
            .then(ref => {
                res(ref);
            })
            .catch(err => {
                rej(err);
            });
        });

    }

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(filename).put(file);

            upload.on("state_changed", snapshot => {}, err => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            );
        });

    }

    createUser = async user => {
        const remoteUri = null;

        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);
                db.set({
                    avatar: remoteUri
                },{
                    merge: true
                });
            }
        } catch (error) {
            alert("Error :" + error);
        }
    }

    updateUser = async user => {
        try {
            let db = this.firestore.collection("users").doc(this.uid);
            let remoteUri = null;

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);
                firebase.auth().currentUser.updateProfile({
                    photoURL: user.avatar
                })
            }

            db.set({
                name: user.name,
                email: user.email,
                avatar: remoteUri
            })
        } catch (error) {
            alert("Error :" + error);
        }
    }    

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

    get firestore() {
        return firebase.firestore();
    }

    get userPhotoUrl() {
        return (firebase.auth().currentUser || {}).photoURL;
    }
}

Fire = new Fire();
export default Fire;