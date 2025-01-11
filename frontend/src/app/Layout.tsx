import {Outlet, useNavigation} from 'react-router-dom';
// import Navbar from './components/Navbar';
// import {Footer} from './components/Footer';
import ScrollToTop from 'react-scroll-to-top';
import Navbar from './components/Navbar';

export function Layout()
{
    const navigation = useNavigation();
    return (<>
        <div className="box-border min-h-full flex flex-col bg-amber-50">
            <Navbar/>
            <main className="overscroll-auto h-full w-full flex-grow">
                {navigation.state === "loading" && <div className="loader loader-centered"/>}
                <div className={`${navigation.state === "loading" ? "loader-bg" : "opacity-100"}`}>
                    <Outlet/>
                </div>
            </main>
            {/* <Footer/> */}
        </div>
        <ScrollToTop smooth className="flex justify-center items-center" viewBox='0 0 256 256'/>
        </>
    )
}
