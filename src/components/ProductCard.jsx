import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"

export const ProductCard = (props) => {
    const { image, price, productName, stocks, id } = props
    const [manyProduct, setManyProduct] = useState(0)

    const addToCard = () => {
        alert("Add to Cart Pressed")
    }

    const increaseProduct = () => {
        if (manyProduct < stocks) {
            setManyProduct(manyProduct + 1)
        } else {
            setManyProduct(manyProduct)
        }

    }
    const decreaseProduct = () => {
        if (manyProduct > 0) {
            setManyProduct(manyProduct - 1)
        } else {
            setManyProduct(manyProduct)
        }

    }

    // Mount
    // useEffect(() => {
    //     alert("Component did mount")
    // }, [])

    // Update/Mount
    // useEffect(() => {
    //     alert("Component did update")
    // }, [manyProduct])

    // unmount
    // useEffect(() => {
    //     return () => {
    //         alert("Component unmount")
    //     }
    // }, [])

    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
            <Link to={`/product/${id}`} className="aspect-square w-full overflow-hidden">
                <img className="w-full" src={image} alt="product" />
            </Link>
            <Link to={`/product/${id}`}>
                <p className="text-md">{productName}</p>
                <p className="text-xl">Rp {price.toLocaleString('id-ID')}</p>
                <p className="text-muted-foreground text-sm">In Stock: {stocks}</p>
            </Link>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Button disabled={manyProduct == 0} onClick={decreaseProduct} size="icon" variant="ghost">
                        <IoIosRemove className="w-6 h-6" />
                    </Button>
                    <p className="text-lg font-bold">{manyProduct}</p>
                    <Button disabled={manyProduct >= stocks} onClick={increaseProduct} size="icon" variant="ghost">
                        <IoIosAdd className="w-6 h-6" />
                    </Button>
                </div>
            </div>
            <Button disabled={stocks <= 0} onClick={addToCard} className="w-full">
                {
                    stocks > 0 ? "Add to Cart" : "Out of Stock" 
                }
                
            </Button>
        </div>
    )
}