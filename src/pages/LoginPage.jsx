import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosInstance } from "@/lib/axios"
import { useDispatch } from "react-redux"
import { GuestPage } from "@/components/guard/GuestPage"

const loginFormSchema = z.object({
    username: z.string().min(3, "Usernmae has to be between 3 and 16 characters").max(16, "Usernmae has to be between 3 and 16 characters"),
    password: z.string().min(8, "Your password needs more than 8 characters or more"),
})


const LoginPage = () => {

    const dispatch = useDispatch()

    const form = useForm({
        defaultValues: {
            usernmae: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema),
        reValidateMode: "onSubmit",

    })

    const [isChecked, setIsChecked] = useState(false)

    const handleLogin = async (values) => {
        try {
            const response = await AxiosInstance.get("/user", {
                params: {
                    username: values.username,
                    password: values.password,
                }
            })

            if (!response.data.length) {
                alert("Username or password is wrong")
                return
            }
            if (response.data[0].password !== values.password) {
                alert("Username or password is wrong")
                return
            }

            alert(`Succesfully log in as ${response.data[0].username}`)
            dispatch({
                type: "USER_LOGIN",
                payload: {
                    username: response.data[0].username,
                    id: response.data[0].id,
                    role: response.data[0].role
                }
            })

            localStorage.setItem("current-user", response.data[0].id)
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GuestPage>
            <main className="px-4 py-8 flex flex-col justify-center items-center h-[80vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome Back!</CardTitle>
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
                                                <Input {...field} type={isChecked ? "text" : "password"} id="password" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <Checkbox id="show-password" onCheckedChange={(checked) => setIsChecked(checked)} />
                                    <Label htmlFor="show-password">Show Password</Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col space-y-4 w-full">
                                    <Button disabled={!form.formState.isValid} type="submit">Login</Button>
                                    <Link to="/register"><Button variant="link" className="w-full">Sign up</Button></Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </main>
        </GuestPage>

    )
}

export default LoginPage
