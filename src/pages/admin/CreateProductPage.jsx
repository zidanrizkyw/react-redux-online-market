import { AdminLayout } from '@/components/layout/AdminLayout'
import { AxiosInstance } from '@/lib/axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductForm } from '@/components/forms/ProductForm'


const CreateProductPage = () => {
    const navigate = useNavigate()
    const [createProductIsLoading, setCreateProductIsLoading] = useState(false)

    const handleCreateProduct = async (values) => {
        try {
            setCreateProductIsLoading(true)
            await AxiosInstance.post("/products", {
                name: values.name,
                price: values.price,
                stocks: values.stocks,
                imageUrl: values.imageUrl,
            })
            alert("Product Has Been Added")
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        } finally {
            setCreateProductIsLoading(false)
        }

    }
    return (
        <div>
            <AdminLayout
                title="Create product Page"
                description="Add New Products"
            >
                <div className='flex justify-center'>
                    <ProductForm onSubmit={handleCreateProduct} loadingState={createProductIsLoading} titleForm="Add a new product" buttonField="Create Product"/>
                </div>
            </AdminLayout>
        </div>
    )
}

export default CreateProductPage
