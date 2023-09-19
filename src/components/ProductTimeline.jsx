import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/ProductTimeline.css"
import { ethers } from 'ethers';
import { conf } from "./tx-config"
const { contractAddress, contractAbi } = conf;

const ProductTimeline = () => {
    const navigate = useNavigate()

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
                setEvents(result);
            } catch (error) {
                console.error('Error calling contract method:', error);
            }
        };
        fetchTimeline();
    }, []);


    return (
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
                <ul className="timeline-list animate">
                    {events.map((event, index) => {
                        var x = new Date(event.timestamp.toNumber())
                        var unitList = (
                            <li key={index} className="timeline-item">
                                <div className="timeline-date">{x.toLocaleTimeString()}  |  {x.toDateString()}</div>
                                <div className="timeline-date">{event.location}</div>
                                <div className="timeline-event">{event.description}</div>
                            </li>
                        )
                        {/* setTimeout(() => {
                            unitList.classList.add('animate');
                        }, index *1000); */}
                        return unitList;
                    })}
                </ul>
            </div>

        </>
    );
}
export default ProductTimeline;
