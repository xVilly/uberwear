import {Outlet, useNavigation, useLocation} from 'react-router-dom';
// import Navbar from './components/Navbar';
// import {Footer} from './components/Footer';
import ScrollToTop from 'react-scroll-to-top';
import Navbar from './components/Navbar';
import {useState} from 'react';
import {ExpandableMenu} from './components/ExpandableMenu';

export function Layout()
{
    const navigation = useNavigation();
        const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
        const location = useLocation();

        const isOfferPage = location.pathname === '/offer';

    return (<>
        <div className="box-border flex flex-col bg-amber-50 ">
            <Navbar
                isSidebarExpanded={isSidebarExpanded}
                setIsSidebarExpanded={setIsSidebarExpanded}
            />

             {isOfferPage && (
                    <ExpandableMenu
                        isExpanded={isSidebarExpanded}
                        setIsExpanded={setIsSidebarExpanded}
                    />
                )}
            <main className="flex-grow">
                {navigation.state === "loading" && <div className="loader loader-centered"/>}
                <div className={`min-h-screen flex flex-col [&>*]:grow ${navigation.state === "loading" ? "loader-bg" : "opacity-100"}`}>
                    <Outlet/>
                </div>
            </main>
            {/* <Footer/> */}
        </div>
        <ScrollToTop smooth className="flex justify-center items-center" viewBox='0 0 256 256'/>
        </>
    )
}
