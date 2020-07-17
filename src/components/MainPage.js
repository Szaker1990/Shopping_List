import React, {useEffect, useState} from "react";

export const MainPage = () =>{
    const[product, setProduct] = useState({name:"",category: "",quantity: ""});
    const[categories , setCategories] = useState(["Pieczywo","Owoce","Warzywa","Nabiał","Kosmetyki"]);
    const[productName, setProductName] = useState("");
    const[productQuantity, setProductQuantity] = useState(1);
    const[kilos,setKilos] = useState(true);
    const[productCategory, setProductCategory] = useState(categories[0]);
    const[listOfProducts, setListOfProducts] = useState([]);
    const[warnings,setWarnings] = useState([])


    const handleNameChange = (e) =>{
        setProductName(e.target.value);
    }
    const handleCategoryChange = (e) =>{
        setProductCategory(e.target.value);
    }
    const handleKilosChange = () =>{
        setKilos(!kilos)
    }
    const handleQuantityChange = (e) =>{
        setProductQuantity(e.target.value)
    }

    const addProduct = () =>{

       let newProduct = {
           name: productName,
           category: productCategory,
           quantity: kilos ? `${productQuantity} Kg`: `${productQuantity} sztuk`

        }


        setProduct(newProduct)
    }
    useEffect(()=>{
        addProduct()
    },[productName,productCategory,kilos,productQuantity])

    const handleAddProduct = (e) =>{
        e.preventDefault()
        const newErrors = [];
        if(product.name.length<1){newErrors.push("Nazwa Produktu musi zawierac wiecej niz 1 znak")}
        setWarnings(newErrors)
        if(newErrors.length>0)return false
        setListOfProducts([...listOfProducts,product])
        resetProduct()

    }


    const resetProduct = () =>{
        setProductName("")
        setProductQuantity(1)

    }


    return(
        <>
            <h1>Witaj w Aplikacji Zakupowej</h1>
            <form onSubmit={handleAddProduct}>
                Podaj nazwe Produktu
                <label>
                    <input value={productName} onChange={handleNameChange}  type={"text"}/>
                </label>
                <label>
                    Wybierz Kategorie
                    <select onChange={handleCategoryChange} >
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                <label>
                    <input value={productQuantity} max={100} min={1} type={"number"} onChange={handleQuantityChange} />
                </label>
                <label>
                    <input type="radio" name="quanity" checked={kilos} value={kilos} onChange={handleKilosChange} />KG
                    <input type="radio" name="quanity" onChange={handleKilosChange} />Sztuk
                </label>
                <input value={"submit"} type={"submit"}/>

            </form>
            {warnings.length > 0 && <ul> {warnings.map( (err, index) => <li id={'warning'} key={index}>
                <i className="fas fa-exclamation" />  {err}</li>)} </ul>}

            <ul>Wszystkie
                {listOfProducts.map((prod,index) => <li key={index}>{prod.name} {prod.quantity} {prod.category}</li>)}
            </ul>

            </>
    )

}