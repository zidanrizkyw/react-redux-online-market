import Header from "../components/Header"
import Footer from "../components/Footer"
import { ProductCard } from "../components/ProductCard"

const productRaw = [
    {
        imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/fdcf591cc8bb49df622e0a0198e61233c7005de3_xxl-1.jpg",
        name: "Dark Blue T-Shirt",
        price: 1000000,
        stocks: 10
    },
    {
        imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/78502115352b172788cb416a06bc072baad7bf0e_xxl-1.jpg",
        name: "Denim Jacket",
        price: 20000000,
        stocks: 20
    },
]

const HomePage = () => {
    const products = productRaw.map((product) => {
        return (
            <ProductCard image={product.imageUrl} productName={product.name} price={product.price} stocks={product.stocks} />
        )
    })
    return (
        <>
            <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">

                <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Become a trend-setter with us </h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">Zidan Creation provides you with the finest clothings and ensures your confidence throughout your days</p>
                </div>

                <div className="grid grid-cols-2 gap-4">{products}</div>
            </main>
        </>
    )
}

export default HomePage
