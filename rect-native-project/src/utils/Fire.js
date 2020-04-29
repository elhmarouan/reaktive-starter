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
        let ref = this.firestore.collection("posts");
        try {
            const querySnapshot = await ref.get();
            const data = [];
            
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    const post = doc.data() || {};
                    post.user.get().then(user => {
                        post.id = doc.id;
                        post.user = user.data();
                        data.push(post);
                    })
                }
            });

            return data;
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
        let remoteUri = null;

        try {
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

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

    get firestore() {
        return firebase.firestore();
    }
}

Fire = new Fire();
export default Fire;