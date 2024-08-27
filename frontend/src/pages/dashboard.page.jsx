import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../axios';
import Button from '../components/Button';


const DashboardPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [user, setUser] = useState(()=> {
    const data = window.localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });
  const [amount, setAmount] = useState(0);

  useEffect(()=> {
    if(!user) {
      navigate('/signin');
      return;
    };

    AxiosInstance.get('/account/balance', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => setAmount(res.data.balance))
      .catch(err => {
        const error = err.response?.data;
        if(error?.message) alert(error?.message);
      });
  }, []);
  
  useEffect(()=> {
    if(!user) {
      navigate('/signin');
      return;
    };
    
    AxiosInstance.get(`/user/search?filter=${search}`, {
      headers: {
        Authorization: 'Bearer ' + user.token,
      }
    })
      .then((res)=> {
        const data = res.data;
        setSearchedUsers(data?.users);
      })
      .catch((err)=> {
        const error = err.response?.data;
        // if(error?.message) alert(error?.message);
        console.log(error);
      });
  }, [search]);

  function handleLogout() {
    window.localStorage.removeItem('user');
    navigate('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Payment App</h1>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">{user?.firstName}</span>
          <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/50" alt="" />
          <button type='button' onClick={handleLogout} className='w-20'>Log out</button>
        </div>
      </header>
      <main className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Your balance: ₹{amount}</h2>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            placeholder="Search user to send money"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {searchedUsers?.length > 0 && (
          <div className='flex flex-col gap-4'>
          {
            searchedUsers.map(user=> <SearchedUser key={user._id} user={user} />)
          }
          </div>
        )}
      </main>
    </div>
  );
};

const SearchedUser = ({user})=> {
  const navigate = useNavigate();
  
  function handleSendMoneyButton (){
    navigate(`/send?id=${user._id}&name=${user.firstName}`, {
      state: {
        receiver: user
      }
    });
  }
  
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/50" alt="" />
        <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
      </div>
      <Button type="button" onClick={handleSendMoneyButton}>
        Send Money
      </Button>
    </div>
  );
}


export default DashboardPage;
