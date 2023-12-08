'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {Fingerprint, Loader2} from "lucide-react";
import AOS from "aos";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const Page = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const router = useRouter();

    const [userName, setUserName] = useState({
        email: 'admin@example.com',
        password: '12345678'
    });
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false);
    const [errorMassage, setErrorMassage] = useState<string>('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const onSubmitButton = async (): Promise<void> => {
        if (!API_URL) {
            return
        }
        if (!userName.email && !userName.password) {
            return
        }
        setError(false);
        setLoader(true)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userName)
        };
        try {
            const response = await fetch(`${API_URL}users/login`, options);
            const data = await response.json();
            if (data?.error) {
                setError(true);
                setErrorMassage(data.message)
            }
            if (data?.fullName) {
                toast.success(`Welcome ${data.fullName}`);
                sessionStorage.setItem('private-chat-admin', JSON.stringify(data));
                setTimeout(() => {
                    router.push(`/admin-chat`)
                }, 1000)


            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            // setError(true);
            // // setErrorMassage(error?.message)
        }
    }

    return (
        <React.Fragment>

            <div className="flex flex-col lg:flex-row  h-full justify-around">
                <div
                    className="flex items-center justify-center pt-15 lg:pt-0 px-10">
                    <div
                        className="flex items-center justify-center lg:justify-start lg:items-start flex-col">
                        <h1 className="text-primary-foreground lg:text-5xl text-3xl mb-4 font-semibold flex items-center"
                            data-aos="fade-up" data-aos-delay="300">
                            <Fingerprint className="w-16 h-16 mr-2"/>
                            Private Chat</h1>
                        <h2 className="text-primary-foreground"
                            data-aos="fade-up" data-aos-delay="500">Secure and
                            Private Chat for Your Peace of Mind.</h2>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center lg:justify-end p-5 lg:p-20">
                    <Card className="lg:p-20 p-0" data-aos="fade-up"
                          data-aos-delay="300">
                        <CardContent className="p-6">
                            <div
                                className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
                                <Fingerprint
                                    className="w-16 h-16 mr-2 lg:mb-3"/>
                                <h1 className="text-4xl font-semibold mb-6">Private
                                    Chat</h1>
                                <div className="bg-gray-200 h-[1px] w-full"/>
                                <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in
                                </h2>
                            </div>
                            {error &&
                                <div
                                    className="bg-red-100 rounded px-2 py-3 mt-5 text-red-500 text-center text-sm">{errorMassage}</div>}

                            <div
                                className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#"
                                      method="POST">
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Input id="email"
                                                   name="email"
                                                   type="email"
                                                   value={userName.email}
                                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName({
                                                       ...userName,
                                                       email: e.target.value
                                                   })}
                                                   className="focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 shadow-sm w-80"
                                                   autoComplete="email"
                                                   placeholder="Enter email..."
                                                   required/>
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            className="flex items-center justify-between">
                                            <label htmlFor="password"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <Input id="password"
                                                   name="password"
                                                type="password"
                                                   value={userName.password}
                                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName({
                                                       ...userName,
                                                       password: e.target.value
                                                   })}
                                                   className="focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 shadow-sm lg:w-80"
                                                   autoComplete="current-password"
                                                   placeholder="***** **** *****"
                                                   required/>
                                        </div>
                                    </div>

                                    <div>
                                        <Button type="button" className="w-full"
                                                disabled={loader}
                                                onClick={onSubmitButton}>
                                            Sign in {loader && <Loader2
                                            className="ms-2 h-4 w-4 animate-spin"/>}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Page;