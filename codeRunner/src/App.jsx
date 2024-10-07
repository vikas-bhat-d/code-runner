import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './styles/app.css'
import CEditor from './components/CEditor.jsx';
import PyEditor from './components/PyEditor.jsx';

function App() {
  // const [code, setCode] = useState('');
  // const [language, setLanguage] = useState('c');
  // const [testCases, setTestCases] = useState('');


  // return (
  //     <div>
  //         <select  value={language} onChange={(e) => setLanguage(e.target.value)}>
  //             <option value="c">C</option>
  //             <option value="python">Python</option>
  //             {/* Add more languages as needed */}
  //         </select>
  //         <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Write your code here" />
  //         <textarea value={testCases} onChange={(e) => setTestCases(e.target.value)} placeholder="Enter stdin values here" />
  //         <button onClick={runCode}>Run</button>
  //         <pre>{output}</pre>
  //     </div>


  // );

  const runCode = async () => {
    console.log("requesting");
    try {
      const response = await axios.post('https://675d-117-200-98-70.ngrok-free.app/run', { language, code, testCases });
      setOutput(response.data);
    } catch (error) {
      // console.log(error)
      setOutput(error.response.data)
    }
  };
  const [language, setLanguage] = useState('c')
  const [testCases,setTestCases]=useState('')
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('#include<stdio.h>\nvoid main(){\n//write your c code here\n}')

  const codeHandler = (code) => {
    setCode(code);
  }


  const textareaRef = useRef(null)
  const testCasesRef = useRef(null)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [output]);

  useEffect(() => {
    if (testCasesRef.current) {
      testCasesRef.current.style.height = '50px';
      testCasesRef.current.style.height = `${testCasesRef.current.scrollHeight}px`;
    }
  }, [testCases]);

  return (
    <>
      <div className='language-chooser'>
        <button
          className={language === 'c' ? 'selected' : ''}
          onClick={() => setLanguage('c')}>
          C
        </button>
        <button
          className={language === 'py' ? 'selected' : ''}
          onClick={() => setLanguage('py')}>
          python
        </button>
      </div>

      <div className='code-container'>
        {language === 'c' && <CEditor code={code} codeHandler={codeHandler} />}
        {language === 'py' && <PyEditor code={code} codeHandler={codeHandler} />}
        <div className='output-testcase-container'>
          <textarea
            ref={testCasesRef}
            className='testcase'
            value={testCases}
            placeholder='Enter your test cases here'
          onChange={(e)=>setTestCases(e.target.value)}
          >
          </textarea>

          <textarea ref={textareaRef}
            className='result'
            value={output}
            placeholder='Output will appear here'
            onChange={(e) => setOutput(e.target.value)}
            disabled={true}
          >
          </textarea>
        </div>
      </div>

      <button onClick={runCode}>Run</button>
    </>
  );
}

export default App;
