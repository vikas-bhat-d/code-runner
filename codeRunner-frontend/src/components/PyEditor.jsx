import React, { useState,useEffect } from "react";

function PyEditor({code,codeHandler}){
    useEffect(()=>{
        codeHandler('def main():\n\t#write your code here\nmain()');
    },[])
    return(
        <div>
            <textarea value={code} className="code-editor" spellCheck="false" onChange={(e)=>{
                codeHandler(e.target.value)}}></textarea>
        </div>
    )
}

export default PyEditor;