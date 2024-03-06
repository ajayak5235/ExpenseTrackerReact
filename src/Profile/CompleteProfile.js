import { useRef } from "react"
import { Button, Form ,FormLabel} from "react-bootstrap"
import { NavLink } from "react-router-dom"

const CompleteProfile = () =>{


const fullnameRef = useRef()
const imgRef = useRef()

const updateHandler = async(event) =>{
    event.preventDefault()
 
    const fullNameEntered = fullnameRef.current.value;
    const imgUrlEntered = imgRef.current.value;
 
    console.log(fullNameEntered, imgUrlEntered)

   
   


    
    try{
        const token = localStorage.getItem('token')
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc',{
            method:'POST',
            body:JSON.stringify({
                // FullName: fullNameEntered,
                // ImgURL: imgUrlEntered,
                idToken: token,
                displayName: fullNameEntered, // Set the user's new display name
                photoUrl: imgUrlEntered, // Set the user's new photo URL
                 // Leave empty if you don't want to delete any attributes
                returnSecureToken: true

            }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }


}

return <>
<div style={{margin:'auto', justifyContent:'space-between'}} className="d-flex flex-row">
<p>Winner never quite, Quitters never win</p>
<div style={{ backgroundColor:'#ccc', borderRadius: '15px', border: '2px solid white',width:'auto', }} className="d-flex flex-row">
    <p>Your profile is 64% completed. A complete Profile has highe chance of landing a job</p>
    <NavLink to='*'>Complete now</NavLink>
</div>
</div>
  
<div style={{margin:'auto',marginTop:'25px',padding:"10px", backgroundColor:'#ccc'}} >
    <div className="d-flex " style={{justifyContent:'space-between'}} >
    <h1 >Contact Details</h1>
    <Button variant="light" style={{ borderColor: 'red', color: 'red' }}>Cancel</Button>

    </div>
 
     <Form onSubmit={updateHandler} style={{textAlign:'center', marginRight:'50px', justifyContent:'center' }} className="d-flex  ">
        
        <FormLabel className="mx-1">
            Full Name:
        </FormLabel>
        <input type='text' id='fullname' required ref={fullnameRef} ></input>
        <FormLabel className="mx-2">
            Propfile Photo URL:
        </FormLabel>
        <input type='text' id='photoURL' required ref={imgRef}></input>
        <br></br>
        <Button  type='submit'  className="mx-3">Update</Button>
    </Form>
    







</div>
</>
}
export default CompleteProfile