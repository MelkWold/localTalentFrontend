import { useState } from 'react';
import SignIn from '../../components/Authenication/SignIn';
import Register from '../../components/Authenication/Register';


export default function AuthPage() {
    const [newUser, setNewUser] = useState(false);

    return(
        <>
            {newUser ? (<Register setNewUser = {setNewUser}/> ) : (<SignIn setNewUser={setNewUser}/>)}
        </>
    );
}