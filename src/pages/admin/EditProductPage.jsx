import { ProductForm } from "@/components/forms/ProductForm"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { AxiosInstance } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const EditProductPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [editProductIsLoading, setEditProductIsLoading] = useState(false)

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        imageUrl: "",
        stocks: 0,
        id: 0,
    });

    const fetchProductById = async () => {
        try {
            const response = await AxiosInstance.get(`/products/${params.productId}`)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditProduct = async (values) => {
        try {
            setEditProductIsLoading(true)
            await AxiosInstance.patch("/products/" + params.productId, {
                name: values.name,
                price: values.price,
                stocks: values.stocks,
                imageUrl: values.imageUrl,
            })
            alert("Product Edited")
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        } finally {
            setEditProductIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProductById()
    }, [])

    return (
        <AdminLayout title="Edit Product" description="Editing Product">
            <div className="flex justify-center">
                {
                    product.id ? (
                        <ProductForm
                            onSubmit={handleEditProduct}
                            loadingState={editProductIsLoading}
                            titleForm={`Edit Product ${product.name}`}
                            buttonField="Edit Product"
                            defaultName={product.name}
                            defaultPrice={product.price}
                            defaultStock={product.stocks}
                            defaultImageUrl={product.imageUrl}
                        />
                    ) : null
                }

            </div>
        </AdminLayout>
    )
}

export default EditProductPage
