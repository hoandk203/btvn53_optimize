import publicRoutes from "./routes/publicRoutes.jsx";
import {Route, Routes} from "react-router-dom";

const Layout = publicRoutes.layout;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        {publicRoutes.routes.map(({path, element}, index)=>{
          const Component = element;
          return <Route key={index} path={path} element={<Component/>} />
          })}
      </Route>
    </Routes>
  )
}

export default App
