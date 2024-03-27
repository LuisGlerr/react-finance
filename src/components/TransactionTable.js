import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function TransactionTable({ txns }) {
  const [transaction, setTransaction] = useState([]);
  
  const [tableCategory, setTableCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState("");

  const [tableHealthy, setTableHealthy] = useState(false);

  const [tableAccount, setTableAccount] = useState(false);

    const urlBackend = `https://nest-finance.onrender.com`;

    const fnaccount = async () => {
        const response = await axios.get(`${urlBackend}/transactions/account`);
        setTransaction(response.data);
        setTableAccount(true)
    };

    const fnreturn = async () => {
        
        fetchData()
        setTableHealthy(false);
        setTableCategory(false);
        setTableAccount(false)
    };

    const fnhealthy = async () => {
        const response = await axios.get(`${urlBackend}/transactions/health`);
        
        console.log('response ', response.data)
        
        setTransaction(response.data.data);
        setTableHealthy(true);
        
        if(response.data.isHealthy) setValueHealthy(true)
    };

    const fnCategory = async () => {
        console.log('valueCategory ', valueCategory)
        const response = await axios.get(`${urlBackend}/transactions/categoria/${valueCategory}`);
        setTransaction(response.data);
        setTableCategory(true)
    };

    const fetchData = async () => {
        const response = await axios.get(`${urlBackend}/transactions`);
        setTransaction(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
            <label className="mr-10">Filter by Category</label>
            <input
            onChange={(e) => {
                setValueCategory(e.target.value);
            }}
            />
            <button onClick={fnCategory} className="small">
            Filter
            </button>
        </section>
        <section className="layout-row align-items-center justify-content-center">
            <button onClick={fnhealthy} className="small">
            Check financial health
            </button>
        </section>
        <section className="layout-row align-items-center justify-content-center">
            <button onClick={fnaccount} className="small">
            Total Amount by Account
            </button>
        </section>

        <div className="card mt-50">
            { tableCategory ?
                
                <table className="table">
                <thead>
                    <tr className="table">
                    <th className="table-header">Category</th>
                    <th className="table-header">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(transaction)} */}
                    {transaction.map((item, j) => (
                    <tr key={j}>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                    </tr>
                    ))}
                </tbody>
                </table>

                : 

                tableHealthy ?

                <table className="table">
                <thead>
                    <tr className="table">
                    <th className="table-header">Type</th>
                    <th className="table-header">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(transaction)} */}
                    {transaction.map((item, j) => (
                        <tr key={j}>
                            <td>{item.type}</td>
                            <td>{item.totalAmount}</td>
                        </tr>
                        ))
                    }
                </tbody>
                </table>

                :

                tableAccount ?

                <table className="table">
                <thead>
                    <tr className="table">
                    <th className="table-header">Account Type</th>
                    <th className="table-header">Account Name</th>
                    <th className="table-header">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(transaction)} */}
                    {transaction.map((item, j) => (
                        <tr key={j}>
                            <td>{item.account_type}</td>
                            <td>{item.name}</td>
                            <td>{item.totalAmount}</td>
                        </tr>
                        ))
                    }
                </tbody>
                </table>

                :

                <table className="table">
                <thead>
                    <tr className="table">
                    <th className="table-header">Category</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">Type</th>
                    <th className="table-header">
                        <span id="amount">Status</span>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log(transaction)} */}
                    {transaction.map((item, j) => (
                    <tr key={j}>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            }
        </div>
        <section className="layout-row align-items-center justify-content-center">
            <button onClick={fnreturn} className="small">
                Return
            </button>
        </section>
        </div>
    );
}
