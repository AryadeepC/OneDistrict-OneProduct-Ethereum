import { abi } from "../../artifacts/contracts/Traceability.sol/OneDistrictOneProduct.json"

export const conf = {
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
    privateKey: `0x${import.meta.env.VITE_WALLET_PRIVATE_KEY}`,
    contractAbi: abi,
}
