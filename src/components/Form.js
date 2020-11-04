import React, { useState } from 'react'
import { MDBInput} from 'mdbreact'

function Form({captureFile, createPost}) {
    const [body, setBody] = useState('')

    const handleChange = (e) => {
      e.preventDefault()
      setBody(e.target.value)
    }
    return (
            <div className="form-container w-50 ml-auto mx-auto my-5">
              <form onSubmit={(event) => {
                event.preventDefault()
                createPost(body)
              }} >
                <div className="form-group mr-sm-2">
                  <MDBInput
                    onChange={handleChange}
                    type="textarea" 
                    label="Body" 
                    rows="5" 
                    placeholder="Text here..." 
                    required/>
                </div>
                <div className="d-flex justify-content-center">
                    <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={captureFile} />     
                </div>

                <button type="submit" className="btn teal btn-block btn-lg w-25 my-5 mx-auto" style={{borderRadius:"4px"}}>Post!</button>
              </form>
            </div>
    )
}

export default Form
