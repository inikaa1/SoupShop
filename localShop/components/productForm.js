import {useState, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({_id, title:currentTitle, description:currentDescription, price: currentPrice, images: currentImages, category:assignedCategory, productProperties: assignedproductProperties, SOH:currentSOH}) {
    const [title, setTitle] = useState(currentTitle || "");
    const [SOH, setSOH] = useState(currentSOH || 0);
    const [description, setDescription] = useState (currentDescription || "");
    const [properties, setProperties] = useState([]);
    const [price,setPrice] = useState(currentPrice || "");
    const [productProperties,setProductProperties] = useState(assignedproductProperties || {});
    const [categories,setCategories] = useState([]);
    const [images,setImages] = useState(currentImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [goBack,setGoBack] = useState(false);
    const [category,setCategory] = useState(assignedCategory || "");
    const router = useRouter();
    useEffect(() => {axios.get("/api/categories").then(result => { setCategories(result.data)})},[]);

    async function saveProduct(ev){
        ev.preventDefault();
        if(price!== "" && title !== ""){
            if(_id){
                let data = {title,description,price, images};
                if(category === "0" || !category){
                    data.category = null;
                    data.productProperties = {};
                }else{
                    data.category = category;
                    data.productProperties = productProperties;
                }
                data.SOH = SOH;
                await axios.put("/api/products",{...data,_id});
            } else{
                let data = {title,description,price, images};
                if(category === "0" || !category){
                    data.category = null;
                    data.productProperties = {};
                }else{
                    data.category = category;
                    data.productProperties = productProperties;
                }
                data.SOH = SOH;
                await axios.post("/api/products", data);
        }
    }
        setGoBack(true);
    }
    if (goBack){
        router.push("/products");
    }
    async function uploadImage(ev){
        setIsUploading(true);
        const files = ev.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for(const file of files){
                data.append("file",file)
            }
            const res =  await axios.post("/api/upload", data)
            setImages(currentImages => {
                return [...currentImages, ...res.data.links];
            })
        }
        setIsUploading(false);
    }
    function updateImageOrder(images){
        setImages(images);
    }
    function changeProductProperties(propertyName,propertyValue){
        setProductProperties(prev => {
            const newProductProperties = {...prev};
            newProductProperties[propertyName] = propertyValue;
            return newProductProperties;
        });
    }
    useEffect(() => {
        const fetchedProperties = [];
        const visitedCategoryIds = new Set();

        function addPropertiesFromCategory(cat) {
            if (cat && !visitedCategoryIds.has(cat._id)) {
                visitedCategoryIds.add(cat._id);
                fetchedProperties.push(...cat.properties);
                if (cat.parent) {
                    addPropertiesFromCategory(categories.find(({ _id }) => _id === cat.parent._id));
                }
            }
        }

        if (categories.length > 0 && category) {
            const selectedCategory = categories.find(({ _id }) => _id === category);
            addPropertiesFromCategory(selectedCategory);
        }

        setProperties(fetchedProperties); // Update the properties state here

    }, [category, categories]);
    return(
            <form onSubmit={saveProduct}>
                <label>Product Name</label>
                <input type = "text" placeholder = "product name" value = {title} onChange = {ev => setTitle(ev.target.value)}/>
                <label> Category</label>
                <select value={category} onChange={ev => {setCategory(ev.target.value);setProductProperties({}); }}>
                    <option value= {"0"}>No Category</option>
                    {categories.length >0 && categories.map(category => (
                        <option key = {category._id} value = {category._id}>{category.name}</option>
                    ))}
                </select>
                {categories.length > 0 && properties.length >0 && (<label>Category Properties</label>)}
                {categories.length > 0 && properties.map((p,index) => (
                    <div key = {index} className="flex gap-1">
                    <div>{p.name}</div>
                    <select value={productProperties[p.name] || ""}  onChange={ev => changeProductProperties(p.name,ev.target.value)}>
                        {p.values.map((v,index) => (
                            <option key = {index} value = {v}>{v}</option>
                        ))}
                    </select>    
                    </div>
                ))}
                <label>Product Description</label>
                <textarea placeholder="description" value = {description} onChange = {ev => setDescription(ev.target.value)}/>
                <label>Product Price(AUD)</label>
                <input type = "number" placeholder = "price" value = {price} onChange = {ev => setPrice(ev.target.value)}/>
                <label>Stock on Hand (SOH)</label>
                <input type = "number" placeholder = "SOH" value = {SOH} onChange = {ev => setSOH(ev.target.value)}/>
                <label>
                    Images
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                    <ReactSortable list={images} setList={updateImageOrder} className="mb-2 flex flex-wrap gap-2">
                    {!!images?.length && images.map(link => (
                        <div key= {link} className="h-32">
                            <img src={link} className="rounded-lg"></img>
                        </div>
                    ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-32 w-32 p-1 flex justify-center items-center ">
                            <Spinner size={60}/> 
                        </div>
                    )}
                    <label className="w-32 h-32 text-center flex flex-col items-center justify-center text-sm gap-1 rounded-lg bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                    <input type="file" className="hidden" onChange={uploadImage} />   
                    </label>
                </div>
                <button type = "submit" className="btn-primary">Save Product</button>
            </form>
    )
}