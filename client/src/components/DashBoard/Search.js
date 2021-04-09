import Axios from 'axios';
import React from 'react'
import Loader from '../Loader';
const Search = ({users,fetchByName,search,query,searchQuery,setSearchQuery,checkExitFee}) => { 
 
    const filterUsers = (users, query) => {
        if (!query) {
            return users;
        }

        return users.filter((user) => {
            const usersName = user.name.toLowerCase()
            const userphone = user.cell.toString();
            const useraddress = user.address.toLowerCase();
            const useRollNumber = user.rollNumber.toString();
            return usersName.includes(query) || userphone.includes(query) || useraddress.includes(query) || useRollNumber.includes(query);
        });
    };
    const filtereduserss = filterUsers(users, searchQuery);

    return (

        <div className="app">
            <div className="row ml-1" >
                <div className="col-12">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        class="form-control"
                        placeholder="Search  by name,address,phone,roll-Number"
                        name="s"
                    />
                </div>
            </div>
            <div className="row" >
                {searchQuery &&
                    <ul>
                        {filterUsers ? filtereduserss.map((user) => (
                            <li key={user._id} 
                                className="btn btn-sm-primary"
                                onClick={() =>fetchByName(user)}>
                                <small>{user.name}{" "} {user.cell} {" "}{user.rollNumber}</small></li>
                        )) : <Loader />}
                    </ul>
                }
            </div>
        </div>



    );
};

export default Search;
