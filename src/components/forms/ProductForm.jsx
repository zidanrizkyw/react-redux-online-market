import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const ProductFormSchema = z.object({
    name: z.string().min(3, "Product Name has to be between 3 and 80 characters").max(80, "Usernmae has to be between 3 and 80 characters"),
    price: z.coerce.number().min(10000, "Price cannnot be under Rp 10.000"),
    stocks: z.coerce.number().min(1, "stocks has to be minimum 1"),
    imageUrl: z.string().url("Use a valid URL")
})

export const ProductForm = (props) => {
    const {onSubmit, loadingState, titleForm, buttonField, defaultName, defaultPrice, defaultStock, defaultImageUrl} = props

    const form = useForm({
            defaultValues: {
                name: defaultName ? defaultName : "",
                price: defaultPrice ? defaultPrice : 0,
                stocks: defaultStock ? defaultStock : 0,
                imageUrl: defaultImageUrl ? defaultImageUrl : "",
            },
            resolver: zodResolver(ProductFormSchema)
        })

    return(
        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=' max-w-[640px] w-full'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-bold">{titleForm}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Name</FormLabel>
                                                <FormControl>
                                                    { /* Your form field */}
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    { /* Your form field */}
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="stocks"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stocks</FormLabel>
                                                <FormControl>
                                                    { /* Your form field */}
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Image</FormLabel>
                                                <FormControl>
                                                    { /* Your form field */}
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button disabled={loadingState} type="submit" className="w-full">{buttonField}</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
    )

}