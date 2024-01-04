import { useEffect, useState } from "react";
import { addHeaderJWT } from "../utils/headerJWT";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
const UserHtml = () => {
  const userState = useSelector((state) => state)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [newLastName, setNewLastName] = useState(false)
  const [newFirstName, setNewFirstName] = useState(false)
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",

      headers: addHeaderJWT(),
    }).then(async (res) => {
      if (res.ok) {
        let tmp = await res.json();
        dispatch({ type: "status/addUser", payload: tmp.body })

      }
    });
  },[]);
  useEffect(() => {
    if (!userState.status.online) {
      Navigate("/sign-in")
    }
  },[userState.status.online])
  
  // data of all accounts => using a mock there, but we need to get it from the back => second part of the project
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      desc: "Available Balance",
      amount: "$2,082.79",
    },
    {
      title: "Argent Bank Savings (x6712)",
      desc: "Available Balance",
      amount: "$10,928.42",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      desc: "Current Balance",
      amount: "$184.30",
    },
  ];
  function modifyUserName(first,last) {
    let tmp = {
      firstName:first,
        lastName:last
    }
    console.log(tmp);
    fetch("http://localhost:3001/api/v1/user/profile",{
      method:"put",
      headers: addHeaderJWT(),
      body:JSON.stringify(tmp)
    }
    )
  }
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userState.status.data
              ? userState.status.data.firstName + " " + userState.status.data.lastName
              : "but you shouldn't be here"}
          </h1>
          {isOpen ? <div className="container-rename">
            <input type="text" onChange={(e)=>setNewFirstName(e.target.value)} placeholder={userState.status.data.firstName} />
            <input type="text" onChange={(e)=>setNewLastName(e.target.value)} placeholder={userState.status.data.lastName} />
            <button onClick={async () =>  {
              
              modifyUserName(newFirstName,newLastName)
              window.location.reload()
              } }>Save</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button></div>
            : <div><button onClick={() => setIsOpen(true)} className="edit-button">Edit Name</button></div>}


        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((el, i) => {
          return (
            <Account
              key={i}
              title={el.title}
              description={el.desc}
              amount={el.amount}
            />
          );
        })}
      </main>
      <footer className="footer"  >
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

const Account = (props) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.title}</h3>
        <p className="account-amount">{props.amount}</p>
        <p className="account-amount-description">{props.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};
export default UserHtml;
