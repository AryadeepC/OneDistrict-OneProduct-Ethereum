import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductTimeline from './ProductTimeline';

const ProductPage = () => {
    const { pid } = useParams();
    console.log("main", pid);
    return (
        <>
            <ProductTimeline productId={pid} />
        </>
    )
}

export default ProductPage