import React, {useEffect, useState} from "react";
const shoppingList = []
export const MainPage = () => {
    const [product, setProduct] = useState({id: 0,name: "", category: "", quantity: ""});
    const [categories, setCategories] = useState(["Pieczywo", "Owoce", "Warzywa", "Nabiał", "Kosmetyki","Napoje"]);
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const [kilos, setKilos] = useState(true);
    const [productCategory, setProductCategory] = useState(categories[0]);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const [updatedArray,setUpdatedArray] = useState([]);
    const [amount, setAmount] = useState(0)

    //////////Function that handle inputs value///////

    const handleNameChange = (e) => {
        setProductName(e.target.value);
    }
    const handleCategoryChange = (e) => {
        setProductCategory(e.target.value);
    }
    const handleKilosChange = () => {
        setKilos(!kilos);
    }
    const handleQuantityChange = (e) => {
        setProductQuantity(e.target.value);
    }
    //////////Creating new product from inputs//////////////
    const addProduct = () => {

        let newProduct = {
            id: listOfProducts.length+1,
            name: productName,
            category: productCategory,
            quantity: kilos ? `${productQuantity} Kg` : `${productQuantity} sztuk`

        }

        setProduct(newProduct);
    }

    ///////Watching changes on data////////////
    useEffect(() => {
        addProduct();
    }, [productName, productCategory, kilos, productQuantity]);


    ////////////Adding product to the list//////////
    const handleAddProduct = (e) => {
        e.preventDefault();
        const newErrors = [];
        if (product.name.length < 1 || product.name.length > 20) {
            newErrors.push("Nazwa Produktu musi zawierac wiecej niz 1 znak i mniej niz 20")
        }
        setWarnings(newErrors);
        if (newErrors.length > 0) return false
        setListOfProducts([...listOfProducts, product]);
        setAmount(listOfProducts.length + 1)
        resetProduct();

    }

    /////Reset Inputs///////
    const resetProduct = () => {
        setProductName("");
        setProductQuantity(1);

    }
    ///////Delete List Object////
    const handleRemoveItem = (id) => {
        setListOfProducts(listOfProducts.filter((product)=> product.id !== id))
        setAmount(prev => prev -1)

    }
    //Saving to Local Storage/////
    const save = () => {
        // window.localStorage.clear()
        const list = listOfProducts
        if(list.length<= 0) {
            return alert("nie mozesz dodac pustej listy")
        }else{
            window.localStorage.clear()
            localStorage.setItem("list", JSON.stringify(list));
        }


    }

    const load = () =>{
        let result = JSON.parse(localStorage.getItem('list'))
        if(result === null) return alert("Brak listy do wczytania")
        setListOfProducts(result)
        setAmount(result.length)
    }



    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <h2 >Aplikacja Zakupowa</h2>
                <button className={"btn btn-info m-1"} onClick={load} data-toggle="tooltip" data-placement="bottom"
                        title="Wczytaj Liste Zakupów">Wczytaj Liste
                </button>
                <div className={"d-flex p-3"}>
                    <h6>{`Ilosc Produktów na Liscie ${amount}`}</h6>
                    <i className="fas fa-shopping-cart ml-3"></i>
                </div>
            </nav>
            <form className={"container"} onSubmit={handleAddProduct}>
                Podaj Nazwe Produktu
                <label>
                    <input className={"form-control"} value={productName} onChange={handleNameChange} type={"text"}/>
                </label>
                Wybierz Kategorie:
                <label>
                    <select className={"form-control"} onChange={handleCategoryChange}>
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                Ilość
                <label>
                    <input className={"form-control"} value={productQuantity} max={100} min={1} type={"number"} onChange={handleQuantityChange}/>
                </label>
                <label>
                    <input type="radio" name="quanity" checked={kilos} value={kilos} onChange={handleKilosChange}/>KG
                    <input type="radio" name="quanity" onChange={handleKilosChange}/>Sztuk
                </label>
                <input className={"btn btn-primary"} value={"Dodaj Produkt"} type={"submit"} data-toggle="tooltip" data-placement="bottom" title="Dodaj Produkt"/>

            </form>
            {warnings.length > 0 && <ul> {warnings.map((err, index) => <li className={"alert alert-danger"} id={'warning'} key={index}>
                <i className="fas fa-exclamation"/> {err}</li>)} </ul>}
            {/*<ul>Wszystkie*/}
            {/*    {listOfProducts.map((prod, index) =>*/}
            {/*        <li key={index}>{prod.name} {prod.quantity} {prod.category}*/}
            {/*    <button onClick={() => handleRemoveItem(prod.id)}>Remove</button>*/}
            {/*        </li>)}*/}
            {/*</ul>*/}

            <div className={"d-flex flex-row"}>{categories.map((cat) =><ul className={"list-group p-5 product__list"} key={cat}>{cat} {listOfProducts.filter(prod => prod.category === cat).map(
                filteredProducts => (
                <li className={"list-group-item product__item"} key={filteredProducts.id} >{filteredProducts.name} {filteredProducts.quantity}
                    <button className={"btn btn-danger"} onClick={() => handleRemoveItem(filteredProducts.id)}>
                        <i className="far fa-trash-alt"></i>
                    </button></li>))}</ul>)}</div>
            <div className={"row container p-3"}>
                <button className={"btn btn-success m-1"}  onClick={save} data-toggle="tooltip" data-placement="bottom"
                        title="Mozesz zapisac tylko jedna liste">Zapisz Liste
                </button>
            </div>


        </>
    )

}