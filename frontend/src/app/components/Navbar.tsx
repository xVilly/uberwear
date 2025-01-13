import { useQuery } from '@tanstack/react-query';
import Logo from '../../images/clothes_logo.png';
import Cart from '../../images/cart_icon.png'
// import { parseCurrentUser } from '../../auth/logic';
import { setUserDataThunk, setUserGroup, setUserGroupThunk, UserData } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/mainStore';
import { connect } from 'react-redux';
import {Outlet, useLocation, useNavigate } from 'react-router-dom';
 


function Navbar({userGroup, userData} : {userGroup: string, userData: UserData}) {

    const navigate = useNavigate();
    const location = useLocation();

    // const { isLoading: currentUserLoading } = useQuery<{ result: boolean }>({
    //     queryKey: ["currentUser"],
    //     queryFn: parseCurrentUser,
    //     retry: false,
    //     retryOnMount: false,
    //     enabled: true,
    //     staleTime: 60000
    // })


    const renderCart = () => {
        return (
            <div className="absolute top-5 right-8 cursor-pointer" onClick={() => navigate('/cart')}>
                <img src={Cart} alt="Cart Icon" className="w-10 h-10" />
            </div>
        );
    };

    const renderOffer = () => {
    return (
        <button
            className="absolute top-4 right-24 cursor-pointer"
            onClick={() => navigate('/offer')}
            style={{
                background: '#1E3A5F',
                border: '2px solid #FFBF00',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
        >
           Oferta
        </button>
    );
};

    const renderLoginLabel = () => {
        //if (currentUserLoading) {
        if (false) {
            return (
                <div className="font-light text-2xl">
                    Loading...
                </div>
            )
        }
        if (userGroup.length < 1 || userData.name.length < 1) {
            return (
                <button className= "bg-[#1E3A5F] text-white font-playfair py-2 px-4 rounded-full shadow-md text-xl absolute"  onClick={()=>navigate('/login')}

                  style={{
                        fontFamily: "'Playfair Display', serif",
                        transition: 'all 0.3s ease-in-out', // Smooth transition for all properties
                        border: '2px solid #FFBF00', // Amber border color (adjust thickness as needed)
              }}
      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'} // Type assertion for HTMLButtonElement
      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'} // Reset scale when hover endskkk
      >
                    Zaloguj się
                </button>
            )
        } else {
            return (
                <div className="font-light text-2xl cursor-pointer" onClick={() => userGroup === 'Admin' ? navigate('/admin') : navigate('/account/data')}>
                    Witaj, {userData.name}
                </div>
            )
        }
    }

    const renderAdminButton = () => {
        if (userGroup === 'Admin') {
            return (
                <button className="bg-[#1E3A5F] text-white font-playfair py-2 px-4 rounded-full shadow-md text-xl" onClick={() => navigate('/admin')}>
                    Admin Panel
                </button>
            );
        }
    }

    const renderCourierButton = () => {
        if (userGroup === 'Courier') {
            return (
                <button className="bg-[#1E3A5F] text-white font-playfair py-2 px-4 rounded-full shadow-md text-xl" onClick={() => navigate('/courier')}>
                    Courier Panel
                </button>
            );
        }
    }

    const renderNavbarContent = () => {
        switch (location.pathname) {
            case '/login':
                 return (
                <nav className="sticky left-0 top-0 z-40 max-h-20 min-w-full flex-shrink-0 flex-grow-0 print:hidden">
                <div
                  className="bg-[#1E3A5F] border-b-amber-300 border-b-4 h-full max-h-20 shadow-2xl"
                >
                    <div className="page-container flex h-full items-center text-lg text-white">
                        <div className="flex h-full w-full items-center justify-between">
                            <div className="flex flex-row space-x-8 items-center">
                                <img
                                  src={Logo}
                                  alt="logo"
                                 onClick={()=>navigate('/')}
                                  className="w-24 -mt-3 hover:scale-110 transition-all duration-500 cursor-pointer"
                                />
                                <div className="font-playfair text-2xl">
                                    QuickFit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray w-full max-h-14">
                    <div className="page-container-no-padding py-0.5 pl-24 flex flex-row justify-start items-center space-x-4">
                    </div>
                </div>
            </nav>
                )

            case '/account/data':
            case '/account/orders':
            case '/account/returns':
            case '/account/points':
            case '/account/favbrands':
            case '/cart':
                    return (
                <nav className="sticky left-0 top-0 z-40 max-h-20 min-w-full flex-shrink-0 flex-grow-0 print:hidden">
                <div
                  className="bg-[#1E3A5F] border-b-amber-300 border-b-4 h-full max-h-20 shadow-2xl"
                >
                    <div className="page-container flex h-full items-center text-lg text-white">
                        <div className="flex h-full w-full items-center justify-between">
                            <div className="flex flex-row space-x-8 items-center">
                                <img
                                  src={Logo}
                                  alt="logo"
                                 onClick={()=>navigate('/')}
                                  className="w-24 -mt-3 hover:scale-110 transition-all duration-500 cursor-pointer"
                                />
                                <div className="font-playfair text-2xl">
                                    QuickFit
                                </div>
                                <div className="flex flex-row space-x-8 items-center">
                                {renderCart()}
                                {renderOffer()}
                                {renderAdminButton()}
                                {renderCourierButton()}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray w-full max-h-14">
                    <div className="page-container-no-padding py-0.5 pl-24 flex flex-row justify-start items-center space-x-4">
                    </div>
                </div>
            </nav>
                )
            default:
                return (
                <nav className="sticky left-0 top-0 z-40 max-h-20 min-w-full flex-shrink-0 flex-grow-0 print:hidden">
                <div
                  className="bg-[#1E3A5F] border-b-amber-300 border-b-4 h-full max-h-20 shadow-2xl"
                >
                    <div className="page-container flex h-full items-center text-lg text-white">
                        <div className="flex h-full w-full items-center justify-between">
                            <div className="flex flex-row space-x-8 items-center">
                                <img
                                  src={Logo}
                                  alt="logo"
                                  onClick={() => window.open('')}
                                  className="w-24 -mt-3 hover:scale-110 transition-all duration-500 cursor-pointer"
                                />
                                <div className="font-playfair text-2xl">
                                    QuickFit
                                </div>
                            </div>
                            <div className="flex flex-row space-x-8 items-center">
                                {renderLoginLabel()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray w-full max-h-14">
                    <div className="page-container-no-padding py-0.5 pl-24 flex flex-row justify-start items-center space-x-4">
                    </div>
                </div>
            </nav>
                )

        }
    };
    return (
    <nav>
        {renderNavbarContent()}
    </nav>
    )


}

const mapStateToProps = (state: RootState) => ({ userGroup: state.user.group, userData: state.user.user });

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        setUserGroup: (role: string) =>
            dispatch(setUserGroupThunk(role)),
        setUserData: (data: UserData) =>
            dispatch(setUserDataThunk(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
