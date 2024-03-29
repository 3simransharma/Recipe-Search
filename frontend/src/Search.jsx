import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Box,Card,Chip,TextField } from '@mui/material';
import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Search = () => {

    const [key, setKey] = useState('');
    const [results, setResults] = useState([]);

    // const apiUrl = 'http://localhost:3000/search';
    const apiUrl = 'https://recipe-search-backend-api.vercel.app/search/';


    // Debounced version of the search function
    const debouncedSearch = debounce(async (req, res) => {
        try {
            const response = await axios.get(`${apiUrl}${key}`);
            // res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your actual domain for production
            // res.setHeader('Access-Control-Allow-Methods', 'GET');
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            setResults(response.data);
            // res.status(200).json(response.data);

            // const response = await axios.get(apiUrl, { params: { q: key } });
            // const response = await axios.get(`/${key}`);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // res.status(500).json({ error: 'Error fetching data' });
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
            {/* <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}> */}
            <footer style={{
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}>
                Made with ❤️ from <a href="https://github.com/3simransharma/Recipe-Search" target="_blank" rel="noopener noreferrer">GitHub</a>
            </footer>
        </Box>
    );
};

export default Search;
