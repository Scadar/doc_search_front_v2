import { useAppSelector } from "./hooks/redux";
import { authApi } from "./services/authService";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import GlobalLoading from "./components/GlobalLoading";

const App = () => {
    const { user, globalLoading } = useAppSelector(state => state.auth);
    authApi.useFetchProfileQuery();

    const RouteComponent = user ? PrivateRoutes : PublicRoutes;

    if (globalLoading) {
        return <GlobalLoading/>;
    }

    return (
        <RouteComponent/>
    );
};

export default App;