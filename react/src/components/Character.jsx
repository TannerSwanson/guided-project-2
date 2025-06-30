import React, { useState, useEffect } from 'react';

function Character(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('');
            
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
            setError(null);
          } catch (err) {
            setError(err.message);
            setData([]);
          } finally {
            setIsLoading(false);
          }
        };
    
    
        fetchData();
      }, []); 

    return(
        <>
            <p>Map data here</p>
        </>
    );
}