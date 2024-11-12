import React, { useEffect, useState } from "react";

function CEditor({code,codeHandler}){
    useEffect(()=>{
        codeHandler('#include<stdio.h>\nvoid main(){\n//write your c code here\n}');
    },[])
    
    return(
        <div>
            <textarea value={code} className="code-editor" spellCheck="false" onChange={(e)=>{
                console.log(e.target.value);
                
                codeHandler(e.target.value)}}></textarea>
        </div>
    )
}

export default CEditor;