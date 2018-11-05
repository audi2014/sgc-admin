import React from 'react';
import './rate.css'
export const Stars = ({size=25,value,children}) => {

    if(value < 0) value = 0;
    if(value > 5) value = 5;
    return <div>
    	<div className="rate-star-gray" style={{	    	
		    width:5*size,
		    height:size,
		    backgroundSize:`${size}px ${size}px`,
			position: 'absolute',
    	}} />
    	<div className="rate-star" style={{
		    width:value*size,
		    height:size,
		    backgroundSize:`${size}px ${size}px`,
			position: 'absolute',
    	}} />
    	<div style={{
		    width:5*size,
		    height:size,
		    display:'inline-block'
    	}} />
    	{children}
    </div>
}



export default ({value, avg, count, children})=> (
	<Stars value={(+value||0)}>
		{avg > 0 ? 
			<span title="avg">{(+avg||0).toFixed(2)}</span>
		: null}
		{count > 0 ? 
			<span title="count">({(+count||0)})</span>
		: null}
		{children}
	</Stars>
);