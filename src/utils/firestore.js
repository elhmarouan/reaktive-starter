import firebase from './firebase';

class Fire {

    getPosts = async () => {
        let ref = this.firestore.collection("posts");
        try {
            const querySnapshot = await ref.get();
            const data = [];
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    const post = doc.data() || {};
                    post.id = doc.id;
                    data.push(post);
                }
            });

            return data;
        } catch ({ message }) {
            alert(message);
        }
    };    

    addPost = async ({text, localUri}) => {

        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise(async (res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
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

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${this.timestamp}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(path).put(file);

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