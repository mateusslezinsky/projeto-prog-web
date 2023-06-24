import {Outlet} from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <main>
            <Header/>
            <div className={"outlet"}>
                <Outlet/>
            </div>
        </main>
    );
}
