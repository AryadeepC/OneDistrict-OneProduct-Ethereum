import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/ProductTimeline.css"
import { ethers } from 'ethers';
import { conf } from "./tx-config"
import Spinner from './Spinner';
const { contractAddress, contractAbi } = conf;

const ProductTimeline = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const provider = new ethers.providers.JsonRpcProvider((import.meta.env.VITE_ALCHEMY_HTTP_ENDPOINT));
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    const { pid } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const result = await contract.getCheckpointsByProductId(pid)
                console.log("timeline", result);
                setLoading(false)
                setEvents(result);
            } catch (error) {
                console.error('Error calling contract method:', error);
            }
        };
        fetchTimeline();
    }, []);


    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <button className='home-timeline' onClick={e => {
                            e.preventDefault();
                            navigate("/", {
                                replace: true
                            })
                        }}>Head back to home</button>
                    </div>
                    <div className="timeline-section">
                        <h2>Timeline for Product {pid}</h2>
                        <ul className="timeline-list">
                            {events.map((event, index) => {
                                var x = new Date(event.timestamp.toNumber())
                                return (
                                    <li key={index} className="timeline-item glide">
                                        <div className="timeline-date">{x.toLocaleTimeString()}  |  {x.toDateString()}</div>
                                        <div className="timeline-date">{event.location}</div>
                                        <div className="timeline-event">{event.description}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
}
export default ProductTimeline;
