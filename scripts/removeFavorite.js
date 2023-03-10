const firebaseConfiguration = {
    apiKey: 'AIzaSyAr2LiNLW2hd-p6vQWuaO1z6vrTsEvufXE',
    appId: '1:154668288998:android:9628b0a7e1b6b4cb69e427',
    messagingSenderId: '154668288998',
    projectId: 'flutter-noel',
    storageBucket: 'flutter-noel.appspot.com',
}

function getParametersUrl(){
    let strUrl = document.location.href;
    let url = new URL(strUrl);
    let searchParams = new URLSearchParams(url.search);
    let paramaters = [];

    if(searchParams.has('id_customer')){
        let customerId = searchParams.get('id_customer')
        paramaters.push(customerId)
    }
    else{
        alert('Pas de customer_id');
    }

    if(searchParams.has('id_product')){
        let productId = searchParams.get('id_product')
        paramaters.push(productId)
    }
    else{
        alert('Pas de id_product');
    }

    if(searchParams.has('id_variant')){
        let variantId = searchParams.get('id_variant')
        paramaters.push(variantId);
    }

    return paramaters;
}

firebase.initializeApp(firebaseConfiguration);

const db = firebase.firestore()


class removeFavorite{
    parameters = getParametersUrl();
    userId = this.parameters[0];
    productId = this.parameters[1];
    variantId = this.parameters[2];
    favoriteRef = db.collection('favorite');
    productsRef = db.collection('products');

    product = {
        id : '',
        description: '',
        name: '',
        price: 0,
        urlPicture: '',
        category: '',
    }

    async removeFavorite(){
        try{
            if(this.variantId === undefined){
                await this.favoriteRef.doc(this.userId).collection("favoriteProducts").doc(this.productId).delete();
                alert('supprimé !')
            }
            else{
                await this.favoriteRef.doc(this.userId).collection("favoriteProducts").doc(this.variantId).delete();
                alert('supprimé !')
            }
        }
        catch (error){
            console.error('error removeFavorite() :', error);
        }
    }
}

let favorite = new removeFavorite();
favorite.removeFavorite().then(r => console.log('function called'));