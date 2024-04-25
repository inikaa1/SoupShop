import Layout from "@/components/layout";
import {useEffect, useState} from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2';
import withAdminProtection from "@/hoc/withAdminProtection";

function Categories(){
    const [isEditing,setIsEditing] = useState(null);
    const [name, setName] = useState("");
    const [categories,setCategories] = useState([]);
    const [parent,setParent] = useState("");
    const [swalProps,setSwalProps] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [properties,setProperties] = useState([]);

    async function deleteCategory(category) {
        Swal.fire({
            title: `Delete Category "<b>${category.name}</b>"`,
            text: 'Are you sure you want to delete this category?',
            icon: 'warning',
            iconColor:"#C44D51",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'btn-red mr-1',
                cancelButton: 'btn-primary ml-1',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
            axios.delete("/api/categories?id="+category._id)
            .then(() => {
                refreshCategories();
            })
        }
        });
    }
    function removeProperty(index){
        setProperties(prev =>{
                const newProperties = [...prev];
                return newProperties.filter((p,pIndex)=> {
                    return pIndex !== index ;
                });
            });
    }
    function updatePropertiesName(property, newName,index){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties
        });
    }

    function updatePropertiesValues(property, newValues,index){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        });
    }
    function updateProperties(){
        setProperties(prev => {
            return [...prev,{name: "",values:""}]
        })
    }
    function refreshCategories(){
        axios.get("/api/categories").then(result => {
            setCategories(result.data);
        });
    }
    useEffect(()=>{
        refreshCategories();
    },[])
    async function saveCategory(ev){
        ev.preventDefault();
        let data = { name };
        if (properties.length > 0){
            data.properties = properties.map(p=> ({name:p.name, values: typeof p.values === 'string' ? p.values.split(',') : p.values.join(",").split(",")}));
        }else{
            data.properties = [];
        }
        if(isEditing){
        if (parent === "0") {
            data.parent = null;
        } else {
            data.parent = parent;
        }
            data._id = isEditing._id
            await axios.put("/api/categories", data);
            setIsEditing(null);
        }else{
            if(name){
                if (parent === "0" || !parent) {
                    data.parent = null;
                    await axios.post("/api/categories", { name });
                } else {
                    data.parent = parent;
                    await axios.post("/api/categories", data);
                }
            }
            
        }
        setName("");
        setParent("");
        setProperties([]);
setShowForm(false)
        refreshCategories();
    }
    function editCategory(categoryObj){
        setIsEditing(categoryObj);
        setName (categoryObj.name);
        setParent(categoryObj.parent?._id || "0");
        setProperties(categoryObj.properties || []);
    }
    return(
        <Layout>
            {!isEditing && !showForm && (<table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            Category Name
                        </td>
                        <td>
                            Parent Category
                        </td>
                        <td>
                            {/* Intentionally Empty */}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td className="w-48">
                                <div className="sm:text-right max-sm:text-center">
                                    <button onClick= {() => editCategory(category)} className="btn-primary sm:mr-2 max-sm:mb-1">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteCategory(category)}  className="btn-red">
                                        Delete
                                    </button>
                                    <SweetAlert2 {...swalProps}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>)}
            {(showForm || isEditing) &&  (
                <>
                    <label>{isEditing ? "Edit Category": "New Category"} </label>
                <form onSubmit = {saveCategory} >
                <div className="flex gap-1">
                    <input className="mb-0" type="text" placeholder={"Category Name"} value={name} onChange={ev => setName(ev.target.value)}/>
                    <select className="mb-0" value={parent} onChange={ev => setParent(ev.target.value)}>
                        <option value ={"0"}> No Parent Category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option  key = {category._id} value = {category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>                   
                <label className="mt-1 text-lg">Properties</label>
                <div className="flex gap-1 my-2 ">
                    <button type= "button" onClick = {updateProperties} className="btn-primary text-mg">
                        Add Property
                    </button> 
                    
                </div>      
                {properties?.length > 0 && properties.map((property,index) => (
                        <div key={index} className="flex gap-1 mb-2 max-sm:flex-col">
                            <input className="mb-0 max-sm:mb-1" type="text" value = {property.name} onChange={ev => updatePropertiesName(property,ev.target.value,index)} placeholder="Property Name"/>
                            <input className= "mb-0 max-sm:mb-1"type="text" value = {property.values} onChange={ev => updatePropertiesValues(property,ev.target.value,index)}placeholder="Property Values"/>
                            <button type="button" onClick = {() => removeProperty(index)} className="btn-red">Remove</button>
                        </div>
                    ))}
                
                <button type="submit" className="btn-primary mt-1 mr-1">Save</button>
                <button onClick ={() => {setIsEditing(null); setName(""); setParent("0");setProperties([]);setShowForm(false)}}type="button" className="btn-red mt-1 ml-1">Cancel</button>
                </form>
                </>
            )}
            {!showForm && !isEditing &&(
                <button onClick={() => setShowForm(true)}className="btn-primary mt-3">
                    Add New Category
                </button>
            )}
        </Layout>
    )
}
export default withAdminProtection(Categories);
