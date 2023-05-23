import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Box,Card,Chip,TextField } from '@mui/material';
import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Search = () => {

    const [key, setKey] = useState('');
    const [results, setResults] = useState([]);

    const apiUrl = 'http://localhost:3000/search';


    

    // Debounced version of the search function
    const debouncedSearch = debounce(async () => {
        try {
            const response = await axios.get(`${apiUrl}/${key}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 500); // 500ms delay

    useEffect(() => {
        if (key) {
            debouncedSearch();
        } else {
            setResults([]); // clear results when the search bar is empty
        }

        // Clean up the debounce function when component is unmounted
        return () => {
            debouncedSearch.cancel();
        }
    }, [key]); // This effect runs whenever the key state changes

    return (
        // <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Box display="flex" flexDirection="column" justifyContent="center"  style={{ height: '100vh' }}>
            <Box display="flex" justifyContent="center" alignItems="center" >
                <TextField
                    style = {{display:"flex",justifyItems:"center"}}
                    label="Search..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
            </Box>
            <div>
                {key ?
                    results.length > 0 ? (
                        results.map((result, index) => (
                            <Card key={index} style = {{width:"300px",height:"150px",display:"inline-block",padding:'20px 40px',margin:"50px 20px 20px 30px"}}>
                                <h3>{result.name}</h3>
                                <p>Category: {result.category.toLowerCase() == "starters" || result.category.toLowerCase() == "main course" || result.category.toLowerCase() == "dessert" ? <Chip label = {result.category} style={{color:"white",backgroundColor: "#5dbb63"}} /> : result.category.toLowerCase() == "less spicy" ? <Chip label = {result.category} style={{color:"white",backgroundColor: "#fe8484"}} /> :  result.category.toLowerCase() == "spicy" ? <Chip label = {result.category} style={{color:"white",backgroundColor: "#ba0000"}} />  :  result.category.toLowerCase() == "very spicy" ? <Chip label = {result.category} style={{color:"white",backgroundColor: "#6b0000"}} /> : <Chip label = {result.category} style={{color:"black",backgroundColor: "#ffffff7"}} />} </p> {/*} isCountryName(result.category) === true ? <Chip label = {result.category} style={{color:"white",backgroundColor: "#007bff"}} /> : "" }</p>*/}
                                {result.tags != null? <p>Tags: <Chip label = {result.tags?.map(tag => tag.name)} /></p> : "" }
                            </Card>
                        ))
                    ) : (
                        <p style = {{textAlign:"center"}}>No results found</p>
                    )
                : ""//<p>Empty Result</p>
                }
            </div>
        </Box>
    );
};

export default Search;
