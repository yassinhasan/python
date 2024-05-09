def email_temp(msg):  
    part1 = """<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns:v="urn:schemas-microsoft-com:vml" height="100%">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
        <!--[if !mso]--><!-- -->
        <link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet">
        <!-- <![endif]-->

        <title>contact me</title>

        <style type="text/css">
            body {
                width: 100%;
                background-color: #ffffff;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                mso-margin-top-alt: 0px;
                mso-margin-bottom-alt: 0px;
                mso-padding-alt: 0px 0px 0px 0px;
            }

            p,
            h1,
            h2,
            h3,
            h4 {
                margin-top: 0;
                margin-bottom: 0;
                padding-top: 0;
                padding-bottom: 0;
            }
            .heading-1 {
                font-size: 32px;
                color: #138496;
                font-family: cursive;
                font-weight: bold;
            }
            span.preheader {
                display: none;
                font-size: 1px;
            }

            html,
            body {
                width: 100%;
                height: 100%;
            }

            tbody {
                margin-top: 8px;
            }

            table {
                font-size: 14px;
                border: 0;
                margin-top: 8px;
            }
            .links1{
                color: #4e72b0;
                margin-right: 8px;
                text-transform: capitalize;
                font-size: 14px;
                font-family: sans-serif;
            }
            .links2{
                color: #138496;
                margin-right: 8px;
                text-transform: capitalize;
                font-size: 14px;
                font-family: sans-serif;
            }
            .links3{
                color: #0b0b0c;
                margin-right: 8px;
                text-transform: capitalize;
                font-size: 14px;
                font-family: sans-serif;
            }
            /* ----------- responsivity ----------- */

            @media only screen and (max-width: 640px) {

                /*------ top header ------ */
                .main-header {
                    font-size: 12px !important;
                }

                .main-section-header {
                    font-size: 28px !important;
                }

                .show {
                    display: block !important;
                }

                .hide {
                    display: none !important;
                }

                .align-center {
                    text-align: center !important;
                }

                .no-bg {
                    background: none !important;
                }

                /*----- main image -------*/
                .main-image img {
                    width: 440px !important;
                    height: auto !important;
                }

                /* ====== divider ====== */
                .divider img {
                    width: 440px !important;
                }

                /*-------- container --------*/
                .container590 {
                    width: 440px !important;
                }

                .container580 {
                    width: 400px !important;
                }

                .main-button {
                    width: 220px !important;
                }

                /*-------- secions ----------*/


                .team-img img {
                    width: 100% !important;
                    height: auto !important;
                }
            }

            @media only screen and (max-width: 479px) {

                /*------ top header ------ */
                .main-header {
                    font-size: 18px !important;
                }

                .main-section-header {
                    font-size: 26px !important;
                }

                /* ====== divider ====== */
                .divider img {
                    width: 280px !important;
                }

                /*-------- container --------*/
                .container590 {
                    width: 280px !important;
                }

                .container590 {
                    width: 280px !important;
                }

                .container580 {
                    width: 260px !important;
                }

                /*-------- secions ----------*/

            }
        </style>
        <!-- [if gte mso 9]><style type=”text/css”>
            body {
            font-family: arial, sans-serif!important;
            }
            </style>
        <![endif]-->
    </head>


    <body class="respond" height="100%">
        <!-- pre-header -->
        <!-- pre-header end -->
        <!-- header -->
        <!-- end header -->

        <!-- big image section -->
        <table width="380" align="center" style="background-color:#000000e6; padding: 8px 16px;
            border-radius: 16px;">
            <tbody width="80%" >
            <tr align="center">
                <td align="center" class="section-img" width="80%">
                    <a href="https://drnull.web.app/" target="_blank"
                        style=" border-style: none !important; display: block; border: 0 !important;"><img
                            src="https://drnull.web.app/images/profile.png"
                            style="display: block; width: 90;height:90px;border-radius:50%; background: #444746;
    padding: 1px;"  width="90" border="0"
                            alt="" /></a>
                </td>
            </tr>
            <tr>
                <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
            </tr> """
    part2 = f"""  
            <tr>
                <td width="80%">
                    <div>
                        <span style="color: #e4e0e0 !important; font-size: 14px; font-family:sans-serif; font-weight:700;"
                            class="">
                            Name :{msg['name']}
                        </span>
                    </div>
                </td>
            </tr>
            """
    part3 = f"""
            <tr> 
                <td width="80%">
                    <div>
                        <span style="color: #e4e0e0 !important; font-size: 14px; font-family:sans-serif; font-weight:700;">
                            Email :{msg['email']}
                         </span>

                     </div>
                </td>
            </tr>
             """

    part4 = f"""
            <tr> 
                <td width="80%" style="width: 80%;"> 
                    <div width="80%" style="width: 80%;" >
                        <span style="color: #e4e0e0; font-size: 14px; font-family:sans-serif; font-weight:700;line-height: 35px;"> 
                            Phone : {msg['phone']}
                        </span>
                    </div>
                </td>
            </tr>
        """
    part5 = """ 
            <tr>
                <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
            </tr>

             """
    part6 = f"""
            <tr>
                <td align="center">
                    <div style="color: #e4e0e0; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;width:100%"width="100%">
                        {msg['msg']}
                    </div> 
                </td>
            </tr>
                """
    part7 =""" 
            <tr>
                <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
            <tr class="hide">
                <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
            <tr>
                <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
            </tr>

            <tr>
                <td height="60" style="border-top: 1px solid #e0e0e0;font-size: 60px; line-height: 60px;">&nbsp;
                </td>
            </tr>

            <tr>
                <!-- logo -->
                <td align="left">
                    <h1 class="heading-1">
                        <span class="color-letter">H</span><span style="color: #fbfbfb;">a</span><span style="color: #fbfbfb;">s</span><span style="color: #fbfbfb;">a</span><span style="color: #fbfbfb;">n</span>
                    </h1>
                </td>
            </tr>
            <tr>
                <td align="left"
                    style="color: #e4e0e0; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 23px;"
                    class="text_color">
                    <div
                        style="color: #e4e0e0; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">

                        Email Me: <br /> <a href="mailto:"
                            style="color: #e4e0e0; font-size: 14px; font-family: 'Hind Siliguri', Calibri, Sans-serif; font-weight: 400;">hasanmeady781@gmil.com</a>

                    </div>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <a href="https://drnull.web.app/"
                        style="border-style: none !important; border: 0 !important; color: #138496 !important;" class="links2">My Website</a>
                    </a>
                </td>
            </tr>

            </tbody>
            </table>

            <!-- end section -->


            </body>

            </html>"""
    return part1+part2+part3+part4+part5+part6+part7