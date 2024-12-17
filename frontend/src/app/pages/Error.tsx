import { useNavigate, useRouteError } from "react-router-dom";

const defaultError = 503

interface ErrorProps {
    status : number;
}

const routeErrors = {
    400: {title: 'Brak danych', description: 'Brak danych do wyświetlenia'},
    401: {title: 'Brak dostępu', description: 'Strona wymaga zalogowania i odpowiednich uprawnień'},
    404: {title: 'Nie znaleziono strony', description: 'Podstrona nie istnieje, upewnij się czy adres URL jest poprawny'},
    422: {title: 'Nie znaleziono strony', description: 'Podstrona nie istnieje, upewnij się czy adres URL jest poprawny'},
    500: {title: 'Błąd serwera', description: 'Nie otrzymano odpowiedzi ze strony serwera'},
    503: {title: 'Błąd serwera', description: 'Nie otrzymano odpowiedzi ze strony serwera'}
};

/* Route errors are thrown mostly by router operations
    They render a completely new page (full page component) 
    Only error status is shown to the user */
export function RouteError() {
    let routeError: any = useRouteError();

    if (!routeError || !routeError.status) {
        routeError = {status: defaultError}
    }

    return (
        <div className="box-border min-h-full flex flex-col">
            {/* <Navbar/> */}
            <main className="w-full flex-grow page-container">
                <Error status={routeError.status}/>
            </main>
            {/* <Footer/> */}
        </div>
    )
}

export function DataError({status}: ErrorProps) {
    return (<Error status={status}/>)
}

function Error({status}: ErrorProps) {
    const navigate = useNavigate();
    var errorStatus = status;
    if (!Object.keys(routeErrors).includes(status.toString())) {
        errorStatus = defaultError;
    }

    let error = routeErrors[errorStatus as keyof typeof routeErrors]

    return (
        <>
            <div className="py-40">
                <div className="h-full flex flex-col items-center justify-center">
                    <span className="lg:text-4xl md:text-2xl flex justify-start">
                        <h2 className="text-rose-400">{status}</h2>
                        <h2 className="text-slate-700 pl-4 font-semibold text-center">{error.title}</h2>
                    </span>
                    <span className="pt-3 lg:text-2xl md:text-xl text-center text-slate-700">{error.description}</span>
                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors duration-150" onClick={() => {navigate('/')}}>Powrót do strony głównej</button>
                </div>
            </div>
        </>
    )
}