
import { ProductCard } from "../components/ProductCard"
import { Button } from "@/components/ui/button"
import { AxiosInstance } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const HomePage = () => {
    const [manyProduct, setManyProduct] = useState([])
    const [productIsLoading, setProductIsLoading] = useState(false)
    
    const userSelector = useSelector((state) => state.user)
    const counterSelector = useSelector((state) => state.counter)

    const products = manyProduct.map((product) => {
        return (
            <ProductCard image={product.imageUrl} productName={product.name} price={product.price} stocks={product.stocks} id={product.id}/>
        )
    })

    const fetchProducts = async () => {
        setProductIsLoading(true)
        try {
            const response = await AxiosInstance.get("/products")
            setManyProduct(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setProductIsLoading(false)
        }
        
    }

    // fetch products data once, when home page is first mounted
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">

                <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Become a trend-setter with us {userSelector.username} {counterSelector.count}</h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">Zidan Creation provides you with the finest clothings and ensures your confidence throughout your days</p>
                </div>
                {
                    productIsLoading ? <p>Loading ...</p> : <div className="grid grid-cols-2 gap-4">{products}</div>
                }
                
            </main>
        </>
    )
}

export default HomePage
