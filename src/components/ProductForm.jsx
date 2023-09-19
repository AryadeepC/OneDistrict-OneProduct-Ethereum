import { useState } from 'react';
import { ethers } from 'ethers';
import '../styles/ProductForm.css';
import { conf } from "./tx-config"
import { useNavigate } from 'react-router-dom';
const { contractAddress, contractAbi, privateKey } = conf;

const ProductForm = () => {
    const navigate = useNavigate();
    // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_HTTP_ENDPOINT);
    const signer = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = new ethers.Contract(contractAddress, contractAbi, signer);

    const [checkpoint, setCheckpoint] = useState({
        checkpointId: 0,
        productId: 0,
        location: '',
        description: '',
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("in method")

            const transaction = await contractWithSigner.addCheckpoint(
                checkpoint.checkpointId,
                checkpoint.productId,
                checkpoint.location,
                checkpoint.description
            );

            console.log('Transaction hash:', transaction.hash);

            // Wait for the transaction to be mined (optional)
            await transaction.wait();
            console.log('Transaction confirmed.');
            navigate("/")
        } catch (error) {
            console.error('Error calling state-changing method:', error);
        }
        // console.log("out of method");
        setCheckpoint({
            checkpointId: 0,
            productId: 0,
            location: '',
            description: '',
        });
    };


    return (
        <div className="form-section">
            <h2>Checkpoint Reached</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="checkpointId">Checkpoint ID</label>
                    <input
                        type="number"
                        id="checkpointId"
                        autoComplete='off'
                        value={checkpoint.checkpointId}
                        onChange={(e) => setCheckpoint(prev => ({ ...prev, checkpointId: e.target.value }))}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={checkpoint.location}
                        autoComplete='off'
                        onChange={(e) => setCheckpoint(prev => ({ ...prev, location: e.target.value }))}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <input
                        type="number"
                        id="product"
                        autoComplete='off'
                        value={checkpoint.productId}
                        onChange={(e) => setCheckpoint(prev => ({ ...prev, productId: e.target.value }))}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={checkpoint.description}
                        onChange={(e) => setCheckpoint(prev => ({ ...prev, description: e.target.value }))}
                        autoComplete='off'
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button className='home' onClick={e => {
                    e.preventDefault();
                    navigate("/", {
                        replace: true
                    })
                }}>Home</button>
            </form>
        </div>
    );
}

export default ProductForm;
