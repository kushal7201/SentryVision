import { Table } from 'semantic-ui-react'
import React, { useState, useEffect } from "react";

const getAlerts = async () => {
    const token = localStorage.getItem('token');
    // console.log(`This is the toke: ${token}`)

    const formData = new FormData();
    formData.append('token', token);

    if (!token) {
        console.error('Token not found in local storage');
        return null;
    }

    try {
        const response = await fetch('http://localhost:5000/user/home', {
            method: 'POST',
            body: formData, // Directly pass the FormData object
        });
        if (!response.ok) {
            console.error('Failed to fetch user details:', response.statusText);
            return null;
        }
        const userData = await response.json();
        // const data = userData.payload[0]
        // console.log(userData.payload[0].firstname)
        // firstname= data.firstname
        // localStorage.setItem('user', userData.username)
        // localStorage.setItem('mail', userData.email)
        return await userData;
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        return null;
    }
}


export default function Anomaly() {
    const [data, setData] = useState({ timestamp: [], videos: [] });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getAlerts();
            if (fetchedData) {
                setData(fetchedData);
            }
        };

        fetchData();
    }, []);
    console.log(data)

    const handleTurnOnModel = async () => {
        console.log("Turn on model clicked");
        // Add your logic here to turn on the model

        const token = localStorage.getItem('token');
        // console.log(`This is the toke: ${token}`)

        const formData = new FormData();
        formData.append('token', token);

        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        try {
            const response = await fetch('http://localhost:5000/user/home/turnon', {
                method: 'POST',
                body: formData, // Directly pass the FormData object
            });
            if (!response.ok) {
                if (response.status === 400) {
                    // Extract the error message from the response body
                    const errorData = await response.json();
                    console.error('Failed to fetch user details:', errorData.message);
                } else {
                    console.error('Failed to fetch user details:', response.statusText);
                }
                return null;
            }
            const userData = await response.json();
            // const data = userData.payload[0]
            // console.log(userData.payload[0].firstname)
            // firstname= data.firstname
            // localStorage.setItem('user', userData.username)
            // localStorage.setItem('mail', userData.email)
            return await userData;
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            return null;
        }

    };

    // Function to handle the "Turn off model" button click
    const handleTurnOffModel = async () => {
        console.log("Turn off model clicked");
        // Add your logic here to turn off the model

        const token = localStorage.getItem('token');
        // console.log(`This is the toke: ${token}`)

        const formData = new FormData();
        formData.append('token', token);

        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }

        try {
            const response = await fetch('http://localhost:5000/user/home/turnoff', {
                method: 'POST',
                body: formData, // Directly pass the FormData object
            });
            if (!response.ok) {
                if (response.status === 400) {
                    // Extract the error message from the response body
                    const errorData = await response.json();
                    console.error('Failed to fetch user details:', errorData.message);
                } else {
                    console.error('Failed to fetch user details:', response.statusText);
                }
                return null;
            }
            const userData = await response.json();
            // const data = userData.payload[0]
            // console.log(userData.payload[0].firstname)
            // firstname= data.firstname
            // localStorage.setItem('user', userData.username)
            // localStorage.setItem('mail', userData.email)
            return await userData;
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            return null;
        }

    };

    return (
        <div className="anom-alerts">
            <button type="button" className="animated-fill-on" onClick={handleTurnOnModel}>Turn ON Model</button>
            <button type="button" className="animated-fill-off" onClick={handleTurnOffModel}>Turn OFF Model</button>
            <h2>Alerts</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Sr. No</Table.HeaderCell>
                        <Table.HeaderCell>Time Stamp</Table.HeaderCell>
                        <Table.HeaderCell>Video Link</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.timestamp.map((timestamp, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{timestamp}</Table.Cell>
                            <Table.Cell>
                                {/* Assuming the video link is a static URL with the video ID as a parameter */}
                                <a href={`http://localhost:5000/videos/${data.videos[index]}.mp4`}>Link</a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}