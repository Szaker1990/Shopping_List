import React, {useEffect, useState} from "react";

export const MainPage = () =>{
    const[product, setProduct] = useState({name:"",category: "",quantity: ""});
    const[categories , setCategories] = useState(["Pieczywo","Owoce","Warzywa","Nabiał","Kosmetyki"]);
    const[productName, setProductName] = useState("");
    const[productQuantity, setProductQuantity] = useState(0);
    const[kilos,setKilos] = useState(true);
    const[productCategory, setProductCategory] = useState(categories[0]);
    const[listOfProducts, setListOfProducts] = useState([]);


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
        setListOfProducts(prev => prev + product)

    }






    return(
        <>
            <h1>Witaj w Aplikacji Zakupowej</h1>
            <form onSubmit={handleAddProduct}>
                Podaj nazwe Produktu
                <label>
                    <input onChange={handleNameChange} type={"text"}/>
                </label>
                <label>
                    Wybierz Kategorie
                    <select onChange={handleCategoryChange} >
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                <label>
                    <input max={100} min={0} type={"number"} onChange={handleQuantityChange} />
                </label>
                <label>
                    <input type="radio" name="quanity" checked={kilos} value={kilos} onChange={handleKilosChange} />KG
                    <input type="radio" name="quanity" onChange={handleKilosChange} />Sztuk
                </label>
                <input value={"submit"} type={"submit"}/>

            </form>

            </>
    )

}