import React, { useState } from 'react'
import { MDBInput} from 'mdbreact'

function Form({captureFile, createPost}) {
    const [body, setBody] = useState('')

    const handleChange = (e) => {
      e.preventDefault()
      setBody(e.target.value)
    }

    return (
            <div className="form-container ml-auto mx-auto my-5">
              <form onSubmit={(event) => {
                event.preventDefault()
                createPost(body)
              }} >
                <div className="form-group mr-sm-2">
                  <MDBInput
                    onChange={handleChange}
                    type="textarea" 
                    label="Share Your Self" 
                    rows="5" 
                    placeholder="Text here..." 
                    required/>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">
                          Upload
                        </span>
                      </div>
                      <div className="custom-file">
                        <input
                          type='file' 
                          accept=".jpg, .jpeg, .png, .bmp, .gif" 
                          onChange={captureFile}
                          className="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                        />
                        <label className="custom-file-label" id="img-label" htmlFor="inputGroupFile01">
                          Choose file
                        </label>
                      </div>
                    </div>   
                </div>

                <button type="submit" className="btn teal btn-block btn-lg w-50 my-5 mx-auto" style={{borderRadius:"4px"}}>Post!</button>
              </form>
            </div>
    )
}

export default Form
