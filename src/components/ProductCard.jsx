export const ProductCard = (props) => {
    const {image, price, productName, stocks} = props
    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden">
                <img className="w-full" src={image} alt="product" />
            </div>
            <div>
                <p className="text-md">{productName}</p>
                <p className="text-xl">Rp {price.toLocaleString('id-ID')}</p>
                <p className="text-muted-foreground text-sm">In Stock: {stocks}</p>
            </div>
        </div>
    )
}