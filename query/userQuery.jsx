import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { debounce } from 'lodash';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';

export default function UserQuery( query, pageNumber, type ) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [news, setNews] = useState([]);
    const [hasMores, setHasMores] = useState(false);
    const [noMore, setNoMore] = useState(false);
    const [noPosts, setNoPosts] = useState('');
    //const router = useRouter();

    const [ globalPageNum, setGlobalPageNum ] = useState(1); 

    const { user } = useAuth();

    const bearer_token = `Bearer ${user.token}`;

    const config = {
      headers: {
        'Authorization': bearer_token
      }
    };

   
  
    // useEffect(() => {
    //   setNews([]);
    // }, [query]);
  
    useEffect(() => {
      setLoading(true);
      setError(false);
  
      const fetchData = async () => {
        try {
            const response =  await axios.get(`/news-list?paginate=1`, config);
            //console.log(response)
            setNews(response.data);
            setLoading(false);
        } catch (error) {
          setError(true);
        }
      };
  
      fetchData();
  
    }, []);

    return { loading, error, news };
}