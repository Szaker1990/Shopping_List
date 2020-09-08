import React, {useEffect, useState} from "react";

export const MainPage = () => {
    const [product, setProduct] = useState({id: 0, name: "", category: "", quantity: ""});
    const [categories, setCategories] = useState(["Pieczywo", "Owoce", "Warzywa", "Nabiał", "Kosmetyki", "Napoje", "Słodycze", "Art.Biurowe"]);
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const [kilos, setKilos] = useState(true);
    const [productCategory, setProductCategory] = useState(categories[0]);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const [amount, setAmount] = useState(0)
    const [maxId, setMaxId] = useState(0)

    //////////Functions that handle inputs value///////

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

    //// getting id for new product////////
    const maxIdNumber = () => {
        setMaxId(Math.max(product.id) + 1)
    }

    //////watching new product id//////
    useEffect(() => {
        maxIdNumber()
    }, [amount])
    //////////Creating new product from inputs//////////////
    const addProduct = () => {
        let newProduct = {
            id: maxId,
            name: productName.trim(),
            category: productCategory,
            quantity: kilos ? `${productQuantity} Kg` : `${productQuantity} Szt.`
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
        if (product.name.length < 1 || product.name.length > 16) {
            newErrors.push("Nazwa Produktu musi zawierać więcej niż 1 znak i mniej niz 16")
        }
        setWarnings(newErrors);
        if (newErrors.length > 0) return false;
        setListOfProducts([...listOfProducts, product]);
        setAmount(listOfProducts.length + 1);
        resetProduct();

    }
    /////Reset Inputs///////
    const resetProduct = () => {
        setProductName("");
        setProductQuantity(1);

    }
    ///////Delete List Object////
    const handleRemoveItem = (id) => {
        setListOfProducts(listOfProducts.filter((product) => product.id !== id));
        setAmount(prev => prev - 1);
    }
    //Saving to Local Storage/////
    const save = () => {
        // window.localStorage.clear()
        const list = listOfProducts
        if (list.length <= 0) {
            return alert("Nie możesz dodać pustej listy")
        } else {
            window.localStorage.clear()
            localStorage.setItem("list", JSON.stringify(list));
        }
    }
    ////load data from Local storage////
    const load = () => {
        let result = JSON.parse(localStorage.getItem('list'))
        if (result === null) return alert("Brak listy do wczytania")
        setListOfProducts(result)
        setAmount(result.length)
    }
    return (
        <>{/*Header*/}
            <nav className="navbar navbar-light bg-light shadow mb-3">
                <h2>Aplikacja Zakupowa</h2>
                <div className={"d-flex p-3"}>
                    <h6>{`Ilość Produktów na Liście ${amount}`}</h6>
                    <i className="fas fa-shopping-cart ml-3"/>
                </div>
            </nav>
            {/*Form to handle the inputs*/}
            <form className={" container form__wrapper justify-content-around"} onSubmit={handleAddProduct}>
                <span className={"input__style"}>Podaj Nazwę Produktu</span>
                <label>
                    <input className={"form-control"} value={productName} onChange={handleNameChange} type={"text"}/>
                </label>
                <span className={"input__style"}>Wybierz Kategorie:</span>
                {/*Creating option for each category*/}
                <label>
                    <select className={"form-control"} onChange={handleCategoryChange}>
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                <span className={"input__style"}>Ilość</span>
                <label>
                    <input className={"form-control"} value={productQuantity} max={100} min={1} type={"number"}
                           onChange={handleQuantityChange}/>
                </label>
                <label>
                    <input type="radio" name="quantity" checked={kilos} value={kilos} onChange={handleKilosChange}/>
                    <span className={"input__style"}>Kg</span>
                    <input type="radio" name="quantity" onChange={handleKilosChange}/>
                    <span className={"input__style"}>Szt.</span>
                </label>
                <input className={"btn btn-primary align-self-center"} value={"Dodaj Produkt"}
                       type={"submit"} data-toggle="tooltip" data-placement="bottom" title="Dodaj Produkt"/>
            </form>
            {/*Creating list of errors*/}
            {warnings.length > 0 && <ul className={"blank"}> {warnings.map((err, index) =>
                <li className={"alert alert-danger"} id={'warning'} key={index}>
                    <i className="fas fa-exclamation mr-2"/> {err}
                </li>)}
            </ul>}
            {/*Logic of creating a list for each category and sort items to correct category*/}
            <div className={"d-flex flex-column flex-md-row text-center col-12  container"}>
                {categories.map((cat) =>
                    <ul className={"list-group w-100 product__list"}
                        key={cat}>{cat} {listOfProducts.filter(prod => prod.category === cat).map(
                        filteredProducts => (
                            <li className={"list-group-item d-flex flex-column justify-content-between product__item"}
                                key={filteredProducts.id}>{filteredProducts.name} <br/>{filteredProducts.quantity}
                                <button className={"btn btn-danger"}
                                        onClick={() => handleRemoveItem(filteredProducts.id)}
                                        data-toggle="tooltip" data-placement="bottom" title="Usuń Produkt z listy">
                                    <i className="far fa-trash-alt"/>
                                </button>
                            </li>))}
                    </ul>)}
            </div>
            <div className={"container d-flex justify-content-end  p-3"}>
                <button className={"btn btn-success col-6 col-md-2 m-1"} onClick={save} data-toggle="tooltip"
                        data-placement="bottom" title="Możesz zapisać tylko jedna listę">
                    Zapisz Listę
                </button>
                <button className={"btn btn-info col-6 col-md-2 m-1"} onClick={load} data-toggle="tooltip"
                        data-placement="bottom" title="Wczytaj Listę Zakupów">
                    Wczytaj Listę
                </button>
            </div>
        </>
    )

}