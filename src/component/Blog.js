import styling from "../blog.module.css";
import { useState,useRef, useEffect, useReducer} from "react";


export default function Blog(){

    // const [title, setTitle]=useState("");
    // const [content, setContent]=useState("");
    const [formData,setformData]=useState({title:"",content:""})
    // const [blogs,setBlog]=useState([]);
    const [blogs,dispatch]=useReducer(blogReducer,[]);
    const titleRef=useRef(null);
    
    useEffect(()=>{
      titleRef.current.focus();
    },[])

    function handleSubmit(e){
        e.preventDefault();

        // setBlog([{title:formData.title,content:formData.content},...blogs]);
        dispatch({type:'Add',blog:{title:formData.title,content:formData.content}});
        setformData({title:"",content:""})

        titleRef.current.focus();

    }

    function handleTitle(e){
        setformData({title:e.target.value,content:formData.content});
    }

    function handleContent(e){
        setformData({title:formData.title, content:e.target.value});
    }

    function handleDeleteBtn(index){
        // setBlog(blogs.filter((blog,i)=>(i!==index)))
        dispatch({type:"delete",index:index});
    }

    function blogReducer(state,action){
        switch(action.type){
          case "Add":
             return [action.blog,...state];
          case "delete":
             return state.filter((blog,index)=>index!=action.index);
          default:
             return [];
        }
    }

    return (
        <>
            <h1>Write a Blog!</h1>
              <div className={styling.container}>
                <form onSubmit={handleSubmit}>

                   <label className={styling.label}>Title</label><br/>
                   <input className={styling.input} 
                          placeholder="Enter the title here..." 
                          ref={titleRef} 
                          value={formData.title} 
                          onChange={handleTitle}
                    />
                   <hr/>

                   <label className={styling.label}>Content</label><br/>
                   <textarea rows={5} 
                             className={styling.input} 
                             placeholder="Content goes here..." 
                             value={formData.content} 
                             required
                             onChange={handleContent}>
                  </textarea>
                  <hr/>

                   <button className={styling.btn}>Add</button>

                 </form>
               </div>
                <hr className={styling.underline}/>
                <h2>Blogs</h2>
                {
                  blogs.map((blog,index)=>(
                    <div className={styling.blog} key={index}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <button onClick={()=>handleDeleteBtn(index)} className={styling.deleteBtn}>Delete</button>
                    </div>
                  ))}
               
        </>
    )
}