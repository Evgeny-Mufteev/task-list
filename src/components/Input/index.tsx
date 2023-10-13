import "./style.scss"
import {
  InputHTMLAttributes,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label:string;
}

const Input = (props: InputProps) => {
  const {label, ...restProps} = props;
  
  return (
    <div className="input">
      <label htmlFor="">{label}</label>
      <input type="text" {...restProps} />
    </div>
  )
}

export default Input
