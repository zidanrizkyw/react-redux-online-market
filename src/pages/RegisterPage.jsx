import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosInstance } from "@/lib/axios"
import { GuestPage } from "@/components/guard/GuestPage"

const registerFormSchema = z.object({
    username: z.string().min(3, "Usernmae has to be between 3 and 16 characters").max(16, "Usernmae has to be between 3 and 16 characters"),
    password: z.string().min(8, "Your password needs more than 8 characters or more"),
    confirmPassword: z.string().min(8, "Your password needs more than 8 characters or more"),
})
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Password do not match",
                path: ["confirmPassword"],
            })
        }
    })

const RegisterPage = () => {

    const form = useForm({
        defaultValues: {
            usernmae: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(registerFormSchema),
        reValidateMode: "onSubmit",

    })

    const handleRegister = async (values) => {
        try {
            const userResponse = await AxiosInstance.get("user", {
                params: {
                    username: values.username
                }
            })

            if (userResponse.data.length) {
                alert("username already taken")
                return
            }

            await AxiosInstance.post("/user", {
                username: values.username,
                password: values.password,
                role: "user",
            })
            alert(`Username: ${values.username} | Password: ${values.password} | Confirm Password: ${values.confirmPassword}`)
            form.reset()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <GuestPage>
            <main className="px-4 py-8 flex flex-col justify-center items-center h-[90vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-[540px]">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create an Account</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                { /* Your form field */}
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                { /* Your form field */}
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                { /* Your form field */}
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col space-y-4 w-full">
                                    <Button disabled={!form.formState.isValid} type="submit">Register</Button>
                                    <Link to="/login"><Button variant="link" className="w-full">Sign in</Button></Link>

                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>


            </main>
        </GuestPage>

    )
}

export default RegisterPage
