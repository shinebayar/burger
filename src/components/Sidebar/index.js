import react from "react";
import Shadow from "../General/Shadow";
import Logo from "../Logo";
import Menu from "../Menu";

import css from "./style.module.css";

const SideBar = (props) =>{

    let classes = [css.SideBar, css.Close];

    if(props.isOpen){
        classes = [css.SideBar, css.Open];
    }

    return (
        <div>
            <Shadow show={props.isOpen} onClick={props.toggleSidebar} />
            <div onClick={props.toggleSidebar} className={classes.join(" ")}>
                <div className={css.Logo}>
                    <Logo />
                </div>
                <Menu />
            </div>
        </div>
    );
}

export default SideBar;