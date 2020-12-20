'use strict';

const converterWebP = () => {
    const canUseWebp = () => {
        let elem = document.createElement( `canvas` );
        if ( !!( elem.getContext && elem.getContext( `2d` ) ) ) {
            return elem.toDataURL( `image/webp` ).indexOf( `data:image/webp` ) === 0;
        }
        return false;
    }

    window.onload = () => {
        let images = document.querySelectorAll( `[data-bg]` );
        for ( let i = 0; i < images.length; i++ ) {
            let image = images[i].getAttribute( `data-bg` );
            images[i].style.backgroundImage = `url( ${image} )`;
        }

        let isitFirefox = window.navigator.userAgent.match( /Firefox\/([0-9]+)\./ );
        let firefoxVer = isitFirefox ? parseInt( isitFirefox[1] ) : 0;

        if ( canUseWebp() || firefoxVer >= 65 ) {
            let imagesWebp = document.querySelectorAll( `[data-bg-webp]` );
            for ( let i = 0; i < imagesWebp.length; i++ ) {
                let imageWebp = imagesWebp[i].getAttribute( `data-bg-webp` );
                imagesWebp[i].style.backgroundImage = `url( ${imageWebp} )`;
            }
        }
    };
};
converterWebP();

const toggleMenu = () => {
    const burger = document.querySelector( `.header__burger` ),
        menuLink = document.querySelectorAll( `nav ul > li > a` );

    burger.addEventListener( `click`, () => {
        burger.classList.toggle( `burger--active` );
    });

    let isMobile = {
        Android: () => navigator.userAgent.match( /Android/i ),
        BlackBerry: () => navigator.userAgent.match( /BlackBerry/i ),
        iOS: () => navigator.userAgent.match( /iPhone|iPad|iPod/i ),
        Opera: () => navigator.userAgent.match( /Opera Mini/i),
        Windows: () => navigator.userAgent.match( /IEMobile/i),
        any: () => ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() )
    };

    let body = document.querySelector( `body` );

    if ( isMobile.any() ) {
        body.classList.add( `touch` );

        menuLink.forEach( ( item, index ) => {
            if ( index === 5 || index === 7 || index === 8 ) {
                item.classList.add( `open` );
                item.addEventListener( `click`, () => {
                    const context = item.nextElementSibling;

                    if ( item.classList.contains( `open` ) ) {
                        item.classList.add( `open` );
                        context.style.opacity = `1`;
                        context.style.visibility = `visible`;
                        context.style.transform = `scaleY(1)`;
                    } else {
                        const elements = document.querySelectorAll( `.menu__link, .open` );
                        elements.forEach( element => {
                            const newContext = element.nextElementSibling;
                            newContext.style.opacity = `1`;
                            newContext.style.visibility = `visible`;
                            newContext.style.transform = `scaleY(1)`;
                            element.classList.add( `open` );
                        });
                        context.style.opacity = `0`;
                        context.style.visibility = `hidden`;
                        context.style.transform = `scaleY(0)`;
                    }
                });
            }
        });

    } else {
        body.classList.add( `mouse` );
    }
};
toggleMenu();