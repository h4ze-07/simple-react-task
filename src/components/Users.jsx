import React, { useEffect, useState } from 'react';
import axios from 'axios';
import photoCover from '../assets/photo-cover.svg';

const API = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const Users = () => {
    const [usersToShow, setUsersToShow] = useState([]);

    function fetchUsers(query) {
        axios.get(API + query).then(res => {
            const users = res.data.users;
            console.log(users);
            setUsersToShow([...users]);
        })
    } 

    useEffect(() => {
        fetchUsers('/users?count=6');
    }, [])

    return (
        <section className='users'>
            <h2 className='users-heading'>Working with GET request</h2>
            <div className='users-cards'>
            {
                usersToShow.length > 0 ? 
                    usersToShow.map(user => (
                        <div key={user.id} className='users-card'>
                            <img src={user.photo ? user.photo : photoCover} alt="user photo" />
                            <h3>{user.name}</h3>
                            <p>{user.position}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                        </div>
                    ))
                    :
                    <h2>Loading...</h2>
            }
            </div>
            <button className='users-button'>Show more</button>
        </section>
    )
}

export default Users