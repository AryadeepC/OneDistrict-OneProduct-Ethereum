import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductTimeline.css"
import { ethers } from 'ethers';
// import pkg from 'hardhat';
// const { ethers } = pkg;
import { abi } from "../../artifacts/contracts/Traceability.sol/OneDistrictOneProduct.json"

const contractABI = abi;
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const ProductTimeline = () => {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const { pid } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const result = await contract.getCheckpointsByProductId(pid)
                // const result = await contract.getAuthor()
                console.log("timeline", result);
                setEvents(result);
            } catch (error) {
                console.error('Error calling contract method:', error);
            }
        };
        fetchTimeline();
    }, []);


    return (
        <div className="timeline-section">
            <h2>Product Timeline for {pid}</h2>
            <ul className="timeline-list">
                {events.map((event, index) => {
                    var x = new Date(event.timestamp.toNumber())
                    return (
                        <li key={index} className="timeline-item">
                            <div className="timeline-date">{x.toTimeString()}</div>
                            <div className="timeline-date">{event.location}</div>
                            <div className="timeline-event">{event.description}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ProductTimeline;
