import "../styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

// Containers
import Auth from "../containers/Auth";

// Layout
import Layout from "../Layout/AppLayout";

// Store
import store from "../store";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Auth>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Auth>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
