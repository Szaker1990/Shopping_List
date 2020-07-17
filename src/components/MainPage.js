import React, {useState} from "react";

export const MainPage = () =>{
    const[product, setProduct] = useState({name:"",category: "",quanity: ""})
    const[productName, setProductName] = useState("")
    const[productQuanity, setProductQuanity] = useState(0)
    const[productCategory, setProductCategory] = useState("")
    const[listOfProducts, setListOfProducts] = useState([])
    const[categories , setCategories] = useState(["Pieczywo","Owoce","Warzywa","Nabiał","Kosmetyki"])

    const handleNameChange = (e) =>{
        setProductName(e.target.value)
    }
    const handleCategoryChange = (e) =>{
        setProductCategory(e.target.value)
    }



    return(
        <>
            <h1>Witaj w Aplikacji Zakupowej</h1>
            <form>
                Podaj nazwe Produktu
                <label>
                    <input onChange={handleNameChange} type={"text"}/>
                </label>
                <label>
                    <select onChange={handleCategoryChange}>
                        {categories.map((element) => <option value={element} key={element}>{element}</option>)}
                    </select>
                </label>
                <label>
                    <input type={"number"}/>
                </label>

            </form>

            </>
    )

}