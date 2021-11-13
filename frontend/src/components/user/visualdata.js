import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function VisualData() {

    const [expense, setexpense] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/expense/getall', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                var x = []
                result.expense.map(ele => {
                    if (ele.productId != null) {
                        x.push(ele)
                    }
                })
                setexpense(x)
            }).catch(err => {
                console.log('errr=', err)
            })


    }, [])
    return (
        <div>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={expense} margin={{ right: 100 }}>
                    <Line dataKey="count" stroke="green" activeDot={{ r: 8 }} />
                    <Line dataKey="productId.cost" stroke="red" activeDot={{ r: 8 }} />
                    <CartesianGrid />
                    <XAxis dataKey="created_at" interval={"preserveStartEnd"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VisualData