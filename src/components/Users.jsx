import React, { useEffect, useState } from 'react';
import axios from 'axios';
import photoCover from '../assets/photo-cover.svg';
import preloader from '../assets/preloader.svg';
import { API } from '../App';


const Users = () => {
    const [usersToShow, setUsersToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [disablePagination, setDisablePagination] = useState(false);

    async function fetchUsers(query) {
        const res = await axios.get(API + query);
        if (res.status == 200) {
            const users = await Promise.all(
                res.data.users.map(async (item) => {
                    if (await fetchImg(item.photo)) {
                      return item;
                    } else {
                      return { ...item, photo: photoCover };
                    }
                })
            );
            setCurrentPage(res.data.page)
            setLastPage(res.data.total_pages)
            setUsersToShow([...users]);
        }
    } 

    const fetchImg = (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
        });
    };

    const handleButtonClick = async () => {
        try {
          const res = await axios.get(API + `/users?page=${currentPage + 1}`);
          let users = [];
          
          if (res.data.page === 2) {
            users = [...res.data.users.splice(1)];
          } else {
            users = [...res.data.users];
          }
      
          const newUsers = await Promise.all(
            users.map(async (item) => {
              if (await fetchImg(item.photo)) {
                return item;
              } else {
                return { ...item, photo: photoCover };
              }
            })
          );
      
          setUsersToShow([...usersToShow, ...newUsers]);
          setCurrentPage(res.data.page);
          setLastPage(res.data.total_pages);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    useEffect(() => {
        fetchUsers('/users?count=6');
    }, [])

    useEffect(() => {
        if (currentPage == lastPage) {
            setDisablePagination(true);
        }
    }, [currentPage, lastPage])

    return (
        <section className='users'>
            <h2 className='users-heading'>Working with GET request</h2>
            {
            usersToShow.length > 0 
                ?
                <div className='users-cards'>
                    {usersToShow.map(user => (
                        <div key={user.id} className='users-card'>
                            <img src={user.photo ? user.photo : photoCover} alt="user photo" />
                            <h3>{user.name}</h3>
                            <p>{user.position}</p>
                            <p className='user-email' title={user.email}>{user.email}</p>
                            <p>{user.phone}</p>
                        </div>
                    ))}
                </div>      
                :
                <img src={preloader} alt="preloader" className='preloader' />
            }

            <button className='users-button' disabled={usersToShow <= 0 || disablePagination ? true : false}
                onClick={handleButtonClick}
            >Show more</button>
        </section>
    )
}

export default Users