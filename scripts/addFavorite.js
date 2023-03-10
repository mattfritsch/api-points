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

const randomId = () => (Math.random() + 1).toString(36).substring(7);

firebase.initializeApp(firebaseConfiguration);

const db = firebase.firestore()


class addFavorite{
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
        category: ''
    }

    favoriteProduct = {
        id: '',
        product: {}
    }

    favoriteVariant = {
        id: '',
        product: {},
        variant: {}
    }


    variant = {
        id: '',
        color: '',
        price: 0,
        size: '',
        urlPicture: ''
    }

    async addFavorite(){
        try{
            if(this.variantId === undefined){
                await this.favoriteRef.doc(this.userId).collection("favoriteProducts").doc(this.product.id).set(
                    this.favoriteProduct,
                );
                alert('ajouté !')
            }
            else{
                await this.favoriteRef.doc(this.userId).collection("favoriteProducts").doc(this.variant.id).set(
                    this.favoriteVariant,
                );
                alert('ajouté !')
            }
        }
        catch (error){
            console.error('error addFavorite() :', error);
        }
    }

    async getProductById(){
        try{
            const variant = await this.productsRef.doc(this.productId).collection('variants').get()
            if(this.variantId === undefined){
                const snapshot = await this.productsRef.doc(this.productId).get();
                this.product = snapshot.data();
                this.product.id = snapshot.id;
                console.log(snapshot.id)
                this.product.urlPicture = snapshot.get("urlPicture");
                this.product.price = snapshot.get("price");
                this.product.category = snapshot.get("category");
                console.log(this.product);
                this.favoriteProduct.id = randomId();
                this.favoriteProduct.product = this.product;
                await this.addFavorite();
            }
            else {
                const snapshotProduct = await this.productsRef.doc(this.productId).get();
                const snapshotVariant = await this.productsRef.doc(this.productId).collection('variants').doc(this.variantId).get();
                this.product = snapshotProduct.data();
                this.product.id = snapshotProduct.id;
                this.product.urlPicture = snapshotProduct.get("urlPicture");
                this.product.price = snapshotProduct.get("price");
                this.product.category = snapshotProduct.get("category");
                this.variant = snapshotVariant.data()
                this.variant.id = snapshotVariant.id;
                if(snapshotVariant.color !== ""){
                    this.variant.color = snapshotVariant.get("color");
                }
                else{
                    this.variant.color = ''
                }
                if(snapshotVariant.size !== ""){
                    this.variant.size = snapshotVariant.get("size");
                }
                else{
                    this.variant.size = ''
                }
                this.variant.urlPicture = snapshotVariant.get("urlPicture");
                console.log(this.variant);
                this.favoriteVariant.id = randomId();
                this.favoriteVariant.product = this.product;
                this.favoriteVariant.variant = this.variant;
                await this.addFavorite();
            }
        }
        catch (error){
            console.error('error getProduct() :', error);
        }
    }
}

let favorite = new addFavorite();
favorite.getProductById().then(r => console.log('function called'));