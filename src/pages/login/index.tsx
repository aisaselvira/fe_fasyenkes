import Head from "next/head";
import LoginPage from "@/components/template/login-page"

export default function Login(){
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginPage />
        </>
    )
}