import { useEffect, useState } from 'react';

function useAuthToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    else{
      console.log("token hi nahi hai ")
    }
  }, []);

  return token;
}

export default useAuthToken;
