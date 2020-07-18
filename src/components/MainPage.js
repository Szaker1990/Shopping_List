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
        if (product.name.length < 1) {
            newErrors.push("Nazwa Produktu musi zawierac wiecej niz 1 znak")
        }
        setWarnings(newErrors);
        if (newErrors.length > 0) return false
        setListOfProducts([...listOfProducts, product]);
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

    }
    //Saving to Local Storage/////
    const save = () => {
        window.localStorage.clear()
        const list = listOfProducts
        if(list.length<= 0) return alert("Nie możesz zapisać pustej listy")
        localStorage.setItem("list", JSON.stringify(list));

    }


    return (
        <>
            <h1>Witaj w Aplikacji Zakupowej</h1>
            <form className={"d-flex justify-content-center form-group container"} onSubmit={handleAddProduct}>
                Podaj Nazwe Produktu
                <label>
                    <input value={productName} onChange={handleNameChange} type={"text"}/>
                </label>
                <label>
                    Wybierz Kategorie:
                    <select onChange={handleCategoryChange}>
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                <label>
                    <input value={productQuantity} max={100} min={1} type={"number"} onChange={handleQuantityChange}/>
                </label>
                <label>
                    <input type="radio" name="quanity" checked={kilos} value={kilos} onChange={handleKilosChange}/>KG
                    <input type="radio" name="quanity" onChange={handleKilosChange}/>Sztuk
                </label>
                <input className={"btn btn-primary"} value={"Dodaj Produkt"} type={"submit"}/>

            </form>
            {warnings.length > 0 && <ul> {warnings.map((err, index) => <li className={"alert alert-danger"} id={'warning'} key={index}>
                <i className="fas fa-exclamation"/> {err}</li>)} </ul>}
            {/*<ul>Wszystkie*/}
            {/*    {listOfProducts.map((prod, index) =>*/}
            {/*        <li key={index}>{prod.name} {prod.quantity} {prod.category}*/}
            {/*    <button onClick={() => handleRemoveItem(prod.id)}>Remove</button>*/}
            {/*        </li>)}*/}
            {/*</ul>*/}
            {categories.map((cat) =><ul className={"list-group"} key={cat}>{cat} {listOfProducts.filter(prod => prod.category === cat).map(
                filteredProducts => (
                <li className={"list-group-item"} key={filteredProducts.id} >{filteredProducts.name} {filteredProducts.quantity}
                <button className={"btn btn-danger"} onClick={() => handleRemoveItem(filteredProducts.id)}><i className="fas fa-backspace"></i></button> </li>))}</ul>)}
                <button className={"btn btn-success"} onClick={save}>Zapisz Liste</button>

        </>
    )

}