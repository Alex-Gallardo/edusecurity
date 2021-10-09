import React from "react";

// STYLES
import Styles from './NewResource.module.scss'

const NewResource = ()=>{


    return(
        <div className={Styles.box}>
            <section>
                <h3>Sube un video:</h3>
                <p>(La calidad soportada es hasta 720px, no se permiten videos mayores a los 10 min.)</p>
            </section>
            <section></section>
        </div>
    )
}

export default NewResource