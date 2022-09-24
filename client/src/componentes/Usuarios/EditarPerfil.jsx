import React from "react"

const EditarPerfil = ()=>{
    return (
        <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
            <form  className="justify-content-center align-items-center text-center">
                <h1>Editar datos</h1>


                    <div>

                        <label htmlFor="firstName">nombre</label>
                        <input className='d-block  m-1 border-0 form-control' type="text"  id='firstName' name='firstName' placeholder='User Name' autoComplete='off'   required/>
                       
                    </div>



                    <div>
                        <label htmlFor="lastName">Segundo nombre</label>                
                        <input className='d-block  m-1 border-0 form-control' type="text"  placeholder='Last Name' id='lastName' name='lastName' required/>
                        

                    </div>

                    
                    <div>
                        <label htmlFor="foto">Avatar</label>
                        <input className='d-block  m-1 border-0 form-control' type="text"   name='avatar' id='foto' placeholder='foto'  required/>
                    </div>



               </form>
        </div>
    )
}
export default EditarPerfil