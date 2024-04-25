import { Table} from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import {toast, ToastContainer } from 'react-toastify';

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
                    toast.error(errorData.message, {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.error('Failed to fetch user details:', errorData.message);
                } else {
                    console.error('Failed to fetch user details:', response.statusText);
                }
                return null;
            }
            const userData = await response.json();
            console.log("Turned on model clicked");
            toast.success("Model turned ON successfully!", {
                position: "top-right",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return await userData;
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            return null;
        }

    };

    // Function to handle the "Turn off model" button click
    const handleTurnOffModel = async () => {
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
                    toast.error(errorData.message, {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // console.error('Failed to fetch user details:', errorData.message);
                } else {
                    
                    console.error('Failed to fetch user details:', response.statusText);
                }
                return null;
            }
            const userData = await response.json();
            console.log("Turned off model clicked");
            toast.success("Model turned OFF successfully!", {
                position: "top-right",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return await userData;
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            return null;
        }

    };

    const handleDeleteVideo = async (file) => {
        const token = localStorage.getItem('token');
        // console.log(`This is the toke: ${token}`)
        
        const formData = new FormData();
        formData.append('token', token);
        
        if (!token) {
            console.error('Token not found in local storage');
            return null;
        }
        
        try {
            const response = await fetch(`http://localhost:5000/videos/delete/${file}.mp4`, {
                method: 'DELETE',
                body: formData, // Directly pass the FormData object
            });
            if (!response.ok) {
                console.error('Internal Server Error:', response.statusText);
                return null;
            }
            const userData = await response.json();
            console.log("Video deleted successfully");
            toast.success("Video deleted successfully!", {
                position: "top-right",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload()
            return await userData;
        } catch (error) {
            console.error('Internal Server Error:', error.message);
            return null;
        }

    };

    return (
        <div className="anom-alerts">
            <ToastContainer />
            <button type="button" className="animated-fill-on" onClick={handleTurnOnModel}>Turn ON Model</button>
            <button type="button" className="animated-fill-off" onClick={handleTurnOffModel}>Turn OFF Model</button>
            <h2>Alerts</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Sr. No</Table.HeaderCell>
                        <Table.HeaderCell>Time Stamp</Table.HeaderCell>
                        <Table.HeaderCell>Video Link</Table.HeaderCell>
                        <Table.HeaderCell>Remove Video</Table.HeaderCell>
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
                            <Table.Cell><button type='button' className='animated-fill-off' onClick={()=>handleDeleteVideo(data.videos[index])}>Delete</button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}