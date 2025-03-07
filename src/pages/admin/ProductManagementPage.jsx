import { AdminLayout } from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AxiosInstance } from '@/lib/axios'
import { ChevronLeft, ChevronRight, Edit, Ellipsis, Trash } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AdminPage } from '@/components/guard/AdminPage'

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [productName, setProductName] = useState("")
    const [deleteProductIsLoading, setDeleteProductIsLoading] = useState(false)
    const [selectedProductIds, setSelectedProductIds] = useState([])

    const handleNextPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) + 1)
        setSearchParams(searchParams)
    }

    const handlePrevPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) - 1)
        setSearchParams(searchParams)
    }

    const fetchProduct = async () => {
        try {
            const response = await AxiosInstance.get("/products", {
                params: {
                    _per_page: 5,
                    _page: Number(searchParams.get("page")),
                    name: searchParams.get("search")
                }
            })
            console.log(response.data)
            setHasNextPage(Boolean(response.data.next))
            setProducts(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const searchProduct = () => {
        if (productName) {
            searchParams.set("search", productName)
            setSearchParams(searchParams)
        } else {
            searchParams.delete("search")
            setSearchParams(searchParams)
        }

    }

    const handleDeleteProduct = async () => {
        const confirmDelete = confirm(`Are You Sure want to delete ${selectedProductIds.length} products?`)

        if (!confirmDelete) return

        const deletePromises = selectedProductIds.map((productId) => {
            return AxiosInstance.delete("/products/" + productId)
        })

        try {
            await Promise.all(deletePromises)
            alert(`Succesfully deleted ${selectedProductIds.length} products`)

            searchParams.set("page", Number(1))
            setSearchParams(searchParams)
            setSelectedProductIds([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnCheckedProduct = (productId, checked) => {
        if (checked) {
            const prevSelectedProductIds = [...selectedProductIds]
            prevSelectedProductIds.push(productId)
            setSelectedProductIds(prevSelectedProductIds)
        } else {
            const productIdIndex = selectedProductIds.findIndex((id) => {
                return id == productId
            })

            const prevSelectedProductIds = [...selectedProductIds]
            prevSelectedProductIds.splice(productIdIndex, 1);
            setSelectedProductIds(prevSelectedProductIds)
        }
    }

    useEffect(() => {
        if (searchParams.get("page")) {
            fetchProduct()
        }
    }, [searchParams.get("page"), searchParams.get("search")])

    useEffect(() => {
        searchParams.set("page", 1)
        setSearchParams(searchParams)
    }, [])

    return (
        <AdminPage>
            <AdminLayout
                title="Product Management Page"
                description="Managing Our Products"
                rightSection={
                    <div className='flex gap-2'>
                        {
                            selectedProductIds.length ? <Button onClick={handleDeleteProduct} variant='destructive'>Delete {selectedProductIds.length} Products</Button> : null
                        } 
                        <Link to="/admin/products/create">
                            <Button>
                                <IoAdd className="h-6 w-6 mr-2" />
                                Add Product
                            </Button>
                        </Link>
                    </div>

                }
            >
                <div className='mb-8'>
                    <Label>Search Product Name</Label>
                    <div className='flex gap-4 mt-3'>
                        <Input value={productName} onChange={(e) => setProductName(e.target.value)} className="max-w-[400px]" placeholder="Search Product" />
                        <Button onClick={searchProduct}>Search</Button>
                    </div>
                </div>
                <Table className="p-4 border rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>ImageUrl</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stocks</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            products.map((product) => {
                                return (
                                    <TableRow>
                                        <TableCell><Checkbox onCheckedChange={(checked) => handleOnCheckedProduct(product.id, checked)} checked={selectedProductIds.includes(product.id)} /></TableCell>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            {
                                                product.imageUrl.length > 10 ? `${product.imageUrl.substring(0, 10)} ...` : product.imageUrl
                                            }
                                        </TableCell>
                                        <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                                        <TableCell>{product.stocks}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/products/edit/${product.id}`}>
                                                <Button variant='ghost' size='icon'>
                                                    <Edit className='w-6 h-6' />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>

                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <Button disabled={Number(searchParams.get("page")) == 1} onClick={handlePrevPage} variant='ghost'><ChevronLeft className='w-6 h-6 mr-2' />Previous</Button>
                        </PaginationItem>

                        <PaginationItem className="mx-8 font-semibold">
                            Page {searchParams.get("page")}
                        </PaginationItem>

                        <PaginationItem>
                            <Button disabled={!hasNextPage} onClick={handleNextPage} variant='ghost'>Next <ChevronRight className='w-6 h-6 ml-2' /></Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </AdminLayout>
        </AdminPage>
    )
}

export default ProductManagementPage 
