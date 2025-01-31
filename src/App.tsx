import { RouterProvider } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";
import router from "./router";

function App() {
  return (
    <Web3Provider>
      <RouterProvider router={router} />
    </Web3Provider>
  );
}

export default App;