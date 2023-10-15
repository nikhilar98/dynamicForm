import { useState } from 'react'

function App() {

  const type= ['text','password','checkbox','radio','date','tel','time','week','url','range','image','file','color'] 

  const [name,setName] = useState("")
  const [typeId,setTypeId] = useState("")
  const [fields,setFields] = useState([])
  const [options,setOptions] = useState([])

  function handleFieldSubmit(e) { 
      e.preventDefault() 

      const newField= { 
          name,
          type:type[typeId],
          options
      }
      setFields([...fields,newField])
      setOptions([])
  }

  function addOption () { 
    const obj ={ 
      nameAttribute:name,
      optionName:""
    }
    setOptions([...options,obj])
  }

  function handleRemoveOption(index){
      setOptions(options.filter((ele,i)=>{
        return index!=i
      }))
  }

  function handleSubmit(e){
      e.preventDefault() 
      console.log(fields)
  }


  return (
    <div className='forms'>
      <fieldset>
        <legend>Create a field</legend>
        <form onSubmit={handleFieldSubmit}>
          <label>Type : </label>
          <select value={typeId} onChange={(e)=>{setTypeId(e.target.value)}}>
              <option value="">Select input field type</option>
              {
                type.map((ele,i)=>{
                    return <option value={i} key={i}>{ele}</option>
                })
              }
          </select><br/>
          <label>Name : </label>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
          {
            ['checkbox','radio'].includes(type[typeId]) && 
              (
                <div><button type='button' onClick={addOption}>Add a {type[typeId]}</button></div>
              )
          }
          {
            options.map((ele,i)=>{
              return (
                <div key={i}>
                  <input type='text' value={options[i].optionName} onChange={(e)=>{setOptions(options.map((ele,id)=>{if(id==i){return {nameAttribute:name,optionName:e.target.value}} else {return ele}}))}}/>
                  <button type='button' onClick={()=>{handleRemoveOption(i)}}>remove</button>
                </div>
              )
            })
          }
          <input type="submit" value="Add to form" style={{marginTop:"100px"}}/>
        </form>
      </fieldset>

      <fieldset>
        <legend>Form</legend>
        <form onSubmit={handleSubmit}>
          {
            fields.map((ele,i)=>{

              return (
                  <div key={i} className='newField'>
                    <label>{ele.name} : </label>
                    { ele.options.length==0 ? 
                    
                    <><input type={ele.type}/><br /></>
                    :
                      ele.options.map((option,id)=>{
                        return <span key={id}>
                                  <label>{option.optionName}</label>
                                  <input type={ele.type} name={option.nameAttribute}/>
                              </span>
                      })
                    }
                    
                  </div>
              )
            })
          }
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </div>
  )
}

export default App
