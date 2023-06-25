import {Outlet} from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <main>
            <div className={"header"}>
                <Header/>
            </div>
            <div className={"outlet"}>
                <Outlet/>
            </div>
        </main>
    );
}
