import { Routing } from "../pages"
import { withProviders } from "./providers"
// import AppConfirm from "../_app/common/components/AppConfirm"
import './index.css'



function App() {
  return <Routing />
}

// <AppConfirm />

export default withProviders(App)
