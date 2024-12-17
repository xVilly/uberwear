import { useQuery } from '@tanstack/react-query';
//import Logo from '../../images/logo.png';
// import { parseCurrentUser } from '../../auth/logic';
import { setUserDataThunk, setUserGroupThunk, UserData } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/mainStore';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar({userGroup, userData} : {userGroup: string, userData: UserData}) {

    const navigate = useNavigate();

    // const { isLoading: currentUserLoading } = useQuery<{ result: boolean }>({
    //     queryKey: ["currentUser"],
    //     queryFn: parseCurrentUser,
    //     retry: false,
    //     retryOnMount: false,
    //     enabled: true,
    //     staleTime: 60000
    // })

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
                <button className="font-light text-2xl cursor-pointer" onClick={()=>navigate('/gate/login')}>
                    Zaloguj
                </button>
            )
        } else {
            return (
                <div className="font-light text-2xl cursor-pointer" onClick={()=>navigate('/gate/login')}>
                    Witaj, {userData.name}
                </div>
            )
        }
    }

    return (
        <nav className="sticky left-0 top-0 z-40 max-h-20 min-w-full flex-shrink-0 flex-grow-0 print:hidden">
            <div className="bg-amber-950 border-b-amber-300 border-b-4 h-full max-h-20 shadow-2xl">
                <div className="page-container flex h-full items-center text-lg text-white">
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="flex flex-row space-x-8 items-center">
                            <img src={""} alt="logo" onClick={()=>window.open('')} className="w-24 hover:scale-110 transition-all duration-500 cursor-pointer"/>
                            <div className="font-light text-2xl">
                                Nazwa Aplikacji
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
