import { Routes , Route, BrowserRouter } from "react-router-dom"
import { RepList } from "../features"


const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<RepList />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes