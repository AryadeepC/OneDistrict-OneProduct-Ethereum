import { useState } from 'react';
import { ethers } from 'ethers';
import { abi } from "../../artifacts/contracts/Traceability.sol/OneDistrictOneProduct.json"

const contractABI = abi;
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
// const privateKey = '5a111d9dca45a125dbda7404bedea1a76b3aef312a8a6a2edd2b926534fc6fc1';


const ProductForm = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const signer = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);

    // const contract = new ethers.Contract(contractAddress, contractABI, provider);
    // const signer = wallet.provider.getSigner(wallet.address);
    // let contractWithSigner =  contract.connect(signer);
    // const signer = provider.getSigner()
    // const ethWithSigner = contract.connect(signer);
    // const wallet = new ethers.Wallet(privateKey, provider);


    const [checkpointId, setCheckpointId] = useState(0);
    const [productId, setProductId] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("in method")

            const transaction = await contractWithSigner.addCheckpoint(
                checkpointId, productId, location, description
            );

            console.log('Transaction hash:', transaction.hash);

            // Wait for the transaction to be mined (optional)
            await transaction.wait();

            console.log('Transaction confirmed.');
        } catch (error) {
            console.error('Error calling state-changing method:', error);
        }
        console.log("out of method");
        setCheckpointId('');
        setLocation('');
        setDescription('');
        setProductId('')
    };


    return (
        <div className="form-section">
            <h2>Checkpoint Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="checkpointId">Checkpoint ID</label>
                    <input
                        type="number"
                        id="checkpointId"
                        value={checkpointId}
                        onChange={(e) => setCheckpointId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <input
                        type="text"
                        id="product"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
