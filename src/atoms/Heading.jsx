/* eslint-disable react/prop-types */

function Heading({label, size, weight, color, className, ...props}) {
  const finalClassName = `${size} ${weight} ${color} ${className}`;  
  return <h2 className={finalClassName} {...props}>{label}</h2>;
}

export default Heading