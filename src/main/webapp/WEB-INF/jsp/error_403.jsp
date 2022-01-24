<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="ISO-8859-1">
        <title>ERROR 403</title>
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="https://fonts.googleapis.com/css?family=Bungee" rel="stylesheet" />

        <style>
            html {
                height: 100%;
            }

            body {
                background-color: #f4f3f5;
                background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%236ba184' fill-opacity='0.21'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            }

            svg {
                width: 50vw;
            }

            .lightblue {
                fill: #afd359;
            }

            .eye-red {
                cx: calc(455px + 30px * var(--mouse-x));
                cy: calc(310px + 30px * var(--mouse-y));
            }

            .eye-purple {
                cx: calc(335px + 30px * var(--mouse-x));
                cy: calc(430px + 30px * var(--mouse-y));
            }

            .eye-green {
                cx: calc(555px + 30px * var(--mouse-x));
                cy: calc(445px + 30px * var(--mouse-y));
            }

            .eye-wrap {
                overflow: hidden;
            }

            .error-text {
                font-size: 120px;
                font-family: 'Bungee';
            }

            .text-notification {
                font-size: 2em;
                font-family: 'Bungee';
                margin: 0;
                color: #e5164c;
            }

            .text-notification-regresar {
                font-size: 2em;
                font-family: 'Bungee';
                margin: 0;
                color: #f9b700;
                text-decoration: underline;
                cursor: pointer;
            }

            .content-error {
                text-align: center;
                margin-top: 5%;
            }

            .cls-1 {
                fill: #afd359;
            }

            .cls-2 {
                fill: #d9025e;
            }

            .cls-3 {
                fill: #8bbd23;
            }

            .cls-4 {
                fill: #1bb0e0;
            }

            .cls-5 {
                fill: #fff;
            }

            .cls-6 {
                fill: #941e80;
            }

            .cls-7 {
                fill: #e5164c;
            }

            .cls-8 {
                fill: #9e4894;
            }

            .cls-9 {
                fill: #f9b700;
            }

            .cls-10 {
                fill: #1f2a43;
            }

            .cls-11 {
                fill: #ffd733;
            }
        </style>
    </head>

    <body>
        <div class="col-12 content-error">
            <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9">
                <defs>
                    <text id="text-s-4" class="error-text" y="106" x="-5"> 4 </text>
                    <text id="text-s-3" class="error-text" y="106" x="180"> 3 </text>
                </defs>
                <use xlink:href="#text-s-4" x="-0.5px" y="-1px" fill="black"></use>
                <use xlink:href="#text-s-4" fill="#1bb0e0"></use>
                <use xlink:href="#text-s-3" x="-0.5px" y="-1px" fill="black"></use>
                <use xlink:href="#text-s-3" fill="#1bb0e0"></use>
                <svg xmlns="http://www.w3.org/2000/svg" id="mascota" viewBox="0 0 949.28 1077.26" x="-25" y="5"
                    width="50%" height="95%">
                    <g id="Capa_2" data-name="Capa 2">
                        <g id="Capa_1-2" data-name="Capa 1">
                            <path class="cls-8"
                                d="M379.21,577.71c-8.86-3.21-33.72,30.68-37.87,36.46a244.06,244.06,0,0,0,37.14,19C381.1,618.34,387,580.53,379.21,577.71Z" />
                            <path class="cls-9"
                                d="M540,583.15c-8.3,2.53-10.93,42.25-11.64,57.5a219.5,219.5,0,0,0,41.85-18.77C564,609.62,548.15,580.7,540,583.15Z" />
                            <path class="cls-10"
                                d="M593.73,608.67c-1.25-1.36-9.29,5-23.49,13.21,1.67,3.26,2.67,5.35,2.67,5.35l-44.75,19.32s.06-2.26.23-5.9A199.88,199.88,0,0,1,453.52,650a238.18,238.18,0,0,1-75-16.83c-.65,3.65-1.1,5.92-1.1,5.92L340.74,615l.6-.83c-9.85-6.09-15.27-10.12-16.36-8.9-3.27,3.64,33.11,47.89,114.57,56C545.58,671.87,597,612.28,593.73,608.67Z" />
                            <path class="cls-10"
                                d="M377.38,639.1s.45-2.27,1.1-5.92a244.06,244.06,0,0,1-37.14-19l-.6.83Z" />
                            <path class="cls-10"
                                d="M572.91,627.23s-1-2.09-2.67-5.35a219.5,219.5,0,0,1-41.85,18.77c-.17,3.64-.23,5.9-.23,5.9Z" />
                        </g>
                    </g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="mascota" viewBox="0 0 949.28 1077.26" x="137" y="-11"
                    width="50%" height="95%">
                    <g id="Capa_2" data-name="Capa 2">
                        <g id="Capa_1-2" data-name="Capa 1">
                            <path class="cls-2"
                                d="M712.15,282.6l144.12,98.33c33.2-50.91,46.26-142.52,41.29-189.47-9.14-86.39-65.76,107.84-185.41,91.14" />
                        </g>
                    </g>
                </svg>
                <g id="robot">
                    <svg xmlns="http://www.w3.org/2000/svg" id="mascota" viewBox="0 0 949.28 1077.26" x="65" width="50%"
                        height="95%">
                        <defs>
                            <clipPath id="white-clip-red">
                                <circle id="white-eye-red" fill="#fff" cx="470" cy="325" r="50" />
                            </clipPath>
                            <clipPath id="eye-clip-red">
                                <circle id="eyef-red" class="eye-red" clip-path="url(#white-clip-red)" fill="#fff"
                                    stroke="#e5164c" stroke-width="30" stroke-miterlimit="15" cx="470" cy="325"
                                    r="40" />
                            </clipPath>
                            <clipPath id="white-clip-purple">
                                <circle id="white-eye-purple" fill="#fff" cx="350" cy="445" r="50" />
                            </clipPath>
                            <clipPath id="eye-clip-purple">
                                <circle id="eyef-purple" class="eye-purple" clip-path="url(#white-clip-purple)"
                                    fill="#fff" stroke="#941e80" stroke-width="30" stroke-miterlimit="15" cx="470"
                                    cy="325" r="40" />
                            </clipPath>
                            <clipPath id="white-clip-green">
                                <circle id="white-eye-green" fill="#fff" cx="570" cy="460" r="50" />
                            </clipPath>
                            <clipPath id="eye-clip-green">
                                <circle id="eyef-green" class="eye-green" clip-path="url(#white-clip-green)" fill="#fff"
                                    stroke="#8bbd23" stroke-width="30" stroke-miterlimit="15" cx="470" cy="325"
                                    r="40" />
                            </clipPath>
                        </defs>
                        <g id="Capa_2" data-name="Capa 2">
                            <g id="Capa_1-2" data-name="Capa 1">

                                <path class="cls-1"
                                    d="M949.28,602.61C949.28,340.48,736.78,128,474.64,128a473.46,473.46,0,0,0-173.56,32.74c123.85,13,421,110.14,523.33,168.94,61.76,35.52,54.32,83.74.15,158.06C784.85,542.19,597.73,681.47,562,714.25c1.83-1.67-8.8,18.54-11.14,26.64,35.68-2.52,113.89-10.35,106-9.86,6.8-.41,32.95-38.47,45.81-32.07,14.7,7.31-29.55,36.8-18.12,43.2,14.76,8.27,31.15-23.31,42.39-35.4,9.79-10.54,34.72-20.94,37.1-1.5,5.4,44-164.28,91.25-211.56,107.76.61,10.7,1.53,20.21,2.9,26.29,2.11,11.36,13,53.08,16,78.26S570,983.4,539.62,1003c6.67,23.19,7.27,58.14,7.27,58.14a117.29,117.29,0,0,1,18.7,7.44C784.22,1026.12,949.28,833.65,949.28,602.61Z" />
                                <path class="cls-2"
                                    d="M386.38,185.63,231.64,187c-14.45-59,26.41-137,57.08-172.87,56.43-66-10.44,117.55,97.66,171.48" />
                                <path class="cls-2"
                                    d="M712.15,282.6l144.12,98.33c33.2-50.91,46.26-142.52,41.29-189.47-9.14-86.39-65.76,107.84-185.41,91.14" />
                                <path class="cls-3"
                                    d="M435.91,1040.23c-11.58,0-15.66-.64-26.54-1.89-2.47,11.26-4.88,22.68-6.84,33.47a478.78,478.78,0,0,0,67.55,5.42c-2.06-12.32-4.8-25.65-7.63-38.78C451.56,1039.66,447.49,1040.26,435.91,1040.23Z" />
                                <path class="cls-1"
                                    d="M300.92,917c2.42-27.35,14.19-66.85,16.33-78.19a4.19,4.19,0,0,0-5.46-4.5c-8.79,3.53-36.92,20.74-44.15,26.7,7.3,4.67,5.36,12.74,3.15,19.11-3.38,9.72-12.81,15.49-22.11,14.11-8,14.89-25.27,22.72-40.75,17-36-13.36-29.28-50.16-17.15-65.54,31.75-40.3,110.51-121.71,120.7-132.21-19.34-35.72-37.55-78.74-53.87-125.12C218.07,476,189.53,344.41,182.36,251.89a109.33,109.33,0,0,1,.63-23.76C71.62,315,0,450.43,0,602.61c0,209.91,136.26,388,325.15,450.62.61-11.53,2.36-34.11,7.21-50.67C302,982.87,298.5,944.39,300.92,917Z" />
                                <path class="cls-4"
                                    d="M275,159.26c-57.42.69-86.48,29.55-92,68.87a474.1,474.1,0,0,1,118.09-67.42A228.94,228.94,0,0,0,275,159.26Z" />
                                <path class="cls-4"
                                    d="M539.62,1003c30.41-19.57,34.77-60.21,31.77-85.4s-13.92-66.9-16-78.26c-1.37-6.08-2.29-15.59-2.9-26.29,47.28-16.51,217-63.78,211.56-107.76-2.38-19.44-27.31-9-37.1,1.5-11.24,12.09-27.63,43.67-42.39,35.4-11.43-6.4,32.82-35.89,18.12-43.2-12.86-6.4-39,31.66-45.81,32.07,7.87-.49-70.34,7.34-106,9.86,2.34-8.1,13-28.31,11.14-26.64,35.77-32.78,222.89-172.06,262.6-226.54,54.17-74.32,61.61-122.54-.15-158.06C722.1,270.85,424.93,173.71,301.08,160.71A474.1,474.1,0,0,0,183,228.13a109.33,109.33,0,0,0-.63,23.76c7.17,92.52,35.71,224.12,75.25,336.47,16.32,46.38,34.53,89.4,53.87,125.12-10.19,10.5-89,91.91-120.7,132.21-12.13,15.38-18.89,52.18,17.15,65.54,15.48,5.75,32.71-2.08,40.75-17,9.3,1.38,18.73-4.39,22.11-14.11,2.21-6.37,4.15-14.44-3.15-19.11,7.23-6,35.36-23.17,44.15-26.7a4.19,4.19,0,0,1,5.46,4.5c-2.14,11.34-13.91,50.84-16.33,78.19s1.1,65.84,31.44,85.53c-4.85,16.56-6.6,39.14-7.21,50.67a471.36,471.36,0,0,0,77.38,18.58c2-10.79,4.37-22.21,6.84-33.47,10.88,1.25,15,1.88,26.54,1.89s15.65-.57,26.54-1.78c2.83,13.13,5.57,26.46,7.63,38.78l4.56,0a477.27,477.27,0,0,0,91-8.71,117.29,117.29,0,0,0-18.7-7.44S546.29,1026.16,539.62,1003ZM640.86,458.86a71.78,71.78,0,1,1-71.64-71.93A71.89,71.89,0,0,1,640.86,458.86ZM469.79,251.43a71.78,71.78,0,1,1-71.93,71.64A71.86,71.86,0,0,1,469.79,251.43ZM278.92,443.9a71.79,71.79,0,1,1,71.64,71.92A71.87,71.87,0,0,1,278.92,443.9ZM439.55,661.29c-81.46-8.13-117.84-52.38-114.57-56,1.09-1.22,6.51,2.81,16.36,8.9,4.15-5.78,29-39.67,37.87-36.46,7.77,2.82,1.89,40.63-.73,55.47a238.18,238.18,0,0,0,75,16.83,199.88,199.88,0,0,0,74.87-9.36c.71-15.25,3.34-55,11.64-57.5,8.12-2.45,23.93,26.47,30.21,38.73,14.2-8.17,22.24-14.57,23.49-13.21C597,612.28,545.58,671.87,439.55,661.29Z" />
                                <path class="cls-5"
                                    d="M469.5,395a71.78,71.78,0,1,0-71.64-71.91A71.84,71.84,0,0,0,469.5,395Zm.23-118.42a46.48,46.48,0,0,1,19.1,4.16A24.16,24.16,0,0,0,471,286.06c-10.71,8.94-11.55,25.57-1.9,37.18S495.25,337,506,328.08a24.15,24.15,0,0,0,8.57-17.42,46.62,46.62,0,1,1-44.8-34.1Z" />

                                <path class="cls-5"
                                    d="M422.49,444.18a71.79,71.79,0,1,0-71.93,71.64A71.86,71.86,0,0,0,422.49,444.18Zm-118.43-.24a46.67,46.67,0,0,1,68.72-41A24.3,24.3,0,0,0,352.94,408c-10.71,8.92-11.55,25.56-1.88,37.17S377.24,459,388,450.05a24,24,0,0,0,8.39-15.65,46.64,46.64,0,1,1-92.28,9.54Z" />
                                <path class="cls-5"
                                    d="M497.3,458.58a71.78,71.78,0,1,0,71.92-71.65A71.87,71.87,0,0,0,497.3,458.58Zm71.87-46.51a46.33,46.33,0,0,1,20.61,4.9,24.23,24.23,0,0,0-19,5.22c-10.71,8.94-11.55,25.57-1.88,37.17s26.19,13.78,36.89,4.85a24.1,24.1,0,0,0,8.51-16.84,46.61,46.61,0,1,1-45.1-35.3Z" />
                                <path class="cls-6"
                                    d="M397.35,444.13a46.55,46.55,0,0,0-1-9.73A24,24,0,0,1,388,450.05c-10.71,8.93-27.23,6.75-36.89-4.84S342.23,417,352.94,408A24.3,24.3,0,0,1,372.78,403a46.64,46.64,0,1,0,24.57,41.18Z" />
                                <path class="cls-7"
                                    d="M469.55,369.86a46.52,46.52,0,0,0,45-59.2A24.15,24.15,0,0,1,506,328.08c-10.71,8.93-27.22,6.75-36.9-4.84S460.25,295,471,286.06a24.16,24.16,0,0,1,17.87-5.34,46.64,46.64,0,1,0-19.28,89.14Z" />
                                <path class="cls-8"
                                    d="M379.21,577.71c-8.86-3.21-33.72,30.68-37.87,36.46a244.06,244.06,0,0,0,37.14,19C381.1,618.34,387,580.53,379.21,577.71Z" />
                                <path class="cls-9"
                                    d="M540,583.15c-8.3,2.53-10.93,42.25-11.64,57.5a219.5,219.5,0,0,0,41.85-18.77C564,609.62,548.15,580.7,540,583.15Z" />
                                <path class="cls-10"
                                    d="M593.73,608.67c-1.25-1.36-9.29,5-23.49,13.21,1.67,3.26,2.67,5.35,2.67,5.35l-44.75,19.32s.06-2.26.23-5.9A199.88,199.88,0,0,1,453.52,650a238.18,238.18,0,0,1-75-16.83c-.65,3.65-1.1,5.92-1.1,5.92L340.74,615l.6-.83c-9.85-6.09-15.27-10.12-16.36-8.9-3.27,3.64,33.11,47.89,114.57,56C545.58,671.87,597,612.28,593.73,608.67Z" />
                                <path class="cls-10"
                                    d="M377.38,639.1s.45-2.27,1.1-5.92a244.06,244.06,0,0,1-37.14-19l-.6.83Z" />
                                <path class="cls-10"
                                    d="M572.91,627.23s-1-2.09-2.67-5.35a219.5,219.5,0,0,1-41.85,18.77c-.17,3.64-.23,5.9-.23,5.9Z" />
                                <path class="cls-3"
                                    d="M569,505.35a46.46,46.46,0,0,0,45.29-58,24.1,24.1,0,0,1-8.51,16.84c-10.7,8.93-27.23,6.76-36.89-4.85s-8.83-28.23,1.88-37.17a24.23,24.23,0,0,1,19-5.22A46.62,46.62,0,1,0,569,505.35Z" />
                                <path class="cls-11" d="M656.84,731l.06.07C657.56,731,657.58,731,656.84,731Z" />
                                <path class="cls-4"
                                    d="M684.53,742.16c-11.43-6.4,32.82-35.89,18.12-43.2-12.86-6.4-39,31.66-45.81,32.07.74,0,.72,0,.06.07C665.16,742.06,684.53,742.16,684.53,742.16Z" />
                            </g>
                        </g>
                        <g class="eye-wrap" style="visibility: hidden;">
                            <use xlink:href="#white-eye-red"></use>
                            <use xlink:href="#eyef-red"></use>
                        </g>
                        <g class="eye-wrap" style="visibility: hidden;">
                            <use xlink:href="#white-eye-purple"></use>
                            <use xlink:href="#eyef-purple"></use>
                        </g>
                        <g class="eye-wrap" style="visibility: hidden;">
                            <use xlink:href="#white-eye-green"></use>
                            <use xlink:href="#eyef-green"></use>
                        </g>
                    </svg>
                </g>
                <circle class="lightblue" cx="16" cy="25" r="2.5" id="tornillo" />
                <use xlink:href="#tornillo" x="42"></use>
                <use xlink:href="#tornillo" x="42" y="75"></use>
                <use xlink:href="#tornillo" x="185" y="37"></use>
                <use xlink:href="#tornillo" x="220" y="7"></use>
                <use xlink:href="#tornillo" x="220" y="20"></use>
                <use xlink:href="#tornillo" x="230" y="45"></use>
                <use xlink:href="#tornillo" x="230" y="65"></use>
            </svg>
            <h1 class="text-notification">No tienes permisos para ingresar</h1>
            <h1 class="text-notification-regresar" id="btnRegresar">Regresar</h1>
        </div>
    </body>
    <script>
        var root = document.documentElement;
        var eyefRed = document.getElementById('eyef-red');
        var cxRed = document.getElementById("eyef-red").getAttribute("cx");
        var cyRed = document.getElementById("eyef-red").getAttribute("cy");
        var eyefPurple = document.getElementById('eyef-purple');
        var cxPurple = document.getElementById("eyef-purple").getAttribute("cx");
        var cyPurple = document.getElementById("eyef-purple").getAttribute("cy");

        var eyefGreen = document.getElementById('eyef-green');
        var cxGreen = document.getElementById("eyef-green").getAttribute("cx");
        var cyGreeen = document.getElementById("eyef-green").getAttribute("cy");

        document.addEventListener("mousemove", evt => {
            var all = document.getElementsByClassName('eye-wrap');
            for (var i = 0; i < all.length; i++) {
                all[i].style.visibility = 'visible';
            }
            let x = evt.clientX / innerWidth;
            let y = evt.clientY / innerHeight;

            root.style.setProperty("--mouse-x", x);
            root.style.setProperty("--mouse-y", y);

            cxRed = 455 + 30 * x;
            cyRed = 310 + 30 * y;
            eyefRed.setAttribute("cx", cxRed);
            eyefRed.setAttribute("cy", cyRed);

            cxPurple = 455 + 30 * x;
            cyPurple = 310 + 30 * y;
            eyefPurple.setAttribute("cx", cxRed);
            eyefPurple.setAttribute("cy", cyRed);

            cxGreen = 455 + 30 * x;
            cyGreen = 310 + 30 * y;
            eyefGreen.setAttribute("cx", cxRed);
            eyefGreen.setAttribute("cy", cyRed);

        });

        document.addEventListener("touchmove", touchHandler => {
            let x = touchHandler.touches[0].clientX / innerWidth;
            let y = touchHandler.touches[0].clientY / innerHeight;

            root.style.setProperty("--mouse-x", x);
            root.style.setProperty("--mouse-y", y);
        });

        var regresar = document.getElementById('btnRegresar');
        regresar.addEventListener("click", function () {
            window.history.back();
        }, false);

    </script>

    </html>