import React from 'react';
import ReactDOM from 'react-dom';
import {SWRConfig} from "swr";
import './index.css';
import Root from './routes/index'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// see: https://stackoverflow.com/questions/57261540/warning-received-true-for-a-non-boolean-attribute-jsx-zeit-styled-jsx/66285652#66285652
const _JSXStyle = require('styled-jsx/style').default;
if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}

toast.configure({
  hideProgressBar: true,
  theme: "colored",
});

const fetcher = (...args) => fetch(...args)
.then(res => res.json());

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
        value={{
          fetcher: fetcher,
        }}
    >
      <Root />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
