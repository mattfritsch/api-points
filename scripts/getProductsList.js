const firebaseConfiguration = {
    apiKey: 'AIzaSyAr2LiNLW2hd-p6vQWuaO1z6vrTsEvufXE',
    appId: '1:154668288998:android:9628b0a7e1b6b4cb69e427',
    messagingSenderId: '154668288998',
    projectId: 'flutter-noel',
    storageBucket: 'flutter-noel.appspot.com',
}

firebase.initializeApp(firebaseConfiguration);

const db = firebase.firestore()

class productsList{
    productsRef = db.collection('products')

    async getAllProducts(){
        const products = [];
        try{
            const snapshot = await this.productsRef.get();
            snapshot.forEach(doc => products.push({id: doc.id, ...doc.data()}));
        }
        catch (error){
            console.error('error :', error);
        }
        return products;
    }
}

let products = new productsList();
products.getAllProducts().then((products) => {
    document.getElementById("list").innerHTML = JSON.stringify(products);
});