"use client"
import Footer from "../components/Footer";
import Header from "../components/Header";
import ClientPage from "../components/Content";

export default function HomePage() {

    return (
    <div>
        <div>
            <Header/>
                <ClientPage/>
            <Footer/>
        </div>
    </div>

    )

}