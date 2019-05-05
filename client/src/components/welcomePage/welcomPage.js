import React, { Component } from 'react'
import LoginForm from '../Au/Login'
import SingUpForm from '../Au/Register'
import { Navbar,Nav,Button, Container,Col,Modal} from 'react-bootstrap';

import './style.css'
import './welcomPage.css'
import { connect } from 'react-redux'
import { logoutUser } from '../../globalStore/actions/authActions'
var store = require('store')

 class welcomPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false,
      redirect:false,
      modalSignUp:false,
      modalLogin:false,
    };
  }
  componentDidMount(){
    this.props.logoutUser()
    store.set('payload',null)
  }
   handleClick() {
  
    this.setState({ modalSignUp: false }) 
    this.setState({ modalLogin: false })
  }

fontStyle(){
  return{
    color:'black'
}
}

onClickSignin= () => this.setState({ modalShow: true });

  render() {
    let modalLogin = () => {this.setState({ modalLogin: true }) 
    this.setState({ modalSignUp: false })};
    let modalSignUp = () => {this.setState({ modalLogin: false }) 
    this.setState({ modalSignUp: true })};
      let displayLogin= this.state.modalLogin ? {display:'block'} :{display:'none'};
      let displaySingUp= this.state.modalSignUp ? {display:'block'} :{display:'none'};
    return (
        

                        
            
                <div style={{backgroundColor:'white'}}>
                                <Navbar collapseOnSelect expand="lg"   style={{backgroundColor:'white'}} >
        <Navbar.Brand href="#home" className="Navbar-Brand"> <div style={{
         
           fontSize:35
        }} >LirtenHub</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Container>
         <Col></Col>
         <Col>
        <Nav fill  defaultActiveKey="/home" >
  <Nav.Item style={{pading:5}}>
    <Nav.Link href="/home">Help</Nav.Link>
  </Nav.Item>
  <Nav.Item style={{pading:5}}>
    <Nav.Link eventKey="link-1">  About US</Nav.Link>
  </Nav.Item>
  <Nav.Item style={{pading:5}}>
   <Button onClick={modalLogin}  variant="outline-secondary"> Sing in</Button>
  </Nav.Item>
  <Nav.Item>

  </Nav.Item>
</Nav></Col>
</Container>
       
      </Navbar>

                       <div  className="Bg-image2">

<svg repeatCount id ="logo" width="1157" height="832" viewBox="0 0 1157 832" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M252.552 436.518C247.107 431.409 246.53 422.39 251.15 416.404C255.77 410.418 263.937 409.7 269.382 414.888C274.827 419.996 275.405 429.015 270.785 435.001C266.082 440.907 257.997 441.626 252.552 436.518Z" stroke="black" stroke-width="4" stroke-miterlimit="10"/>
<path d="M22.625 296.922C47.2925 297.72 71.8775 298.518 96.545 299.316C144.395 300.832 192.245 302.429 240.013 303.945C271.858 304.983 303.785 306.02 335.63 307.058C336.538 307.058 337.445 307.138 338.353 307.138C339.425 307.138 336.703 306.579 338.188 307.218C341.9 308.894 345.613 310.57 349.325 312.166C366.733 319.988 384.058 327.73 401.465 335.552C442.138 353.75 482.81 371.947 523.4 390.145C528.185 392.3 532.888 394.375 537.673 396.53C539.57 397.329 541.385 395.892 542.457 394.375C558.71 370.431 574.962 346.487 591.215 322.462C619.595 280.639 647.975 238.896 676.355 197.073C687.163 181.11 697.97 165.227 708.777 149.264C706.137 148.466 703.58 147.668 700.94 146.949C697.887 178.317 694.917 209.764 691.865 241.131C686.997 291.414 682.13 341.777 677.345 392.061C676.19 403.714 675.117 415.447 673.962 427.1C673.632 430.931 677.427 433.165 679.737 435.241C686.667 441.466 693.597 447.692 700.527 453.997C722.225 473.552 743.922 493.106 765.62 512.661C766.28 510.107 766.857 507.473 767.517 504.919C750.77 512.661 734.022 520.323 717.275 528.065C678.087 546.103 638.982 564.142 599.795 582.26C554.832 603.011 509.787 623.763 464.825 644.515C430.588 660.318 396.268 676.122 362.03 691.925C353.285 695.916 344.623 699.986 335.878 703.977C337.61 705.095 339.343 706.132 341.075 707.25C333.155 677.878 325.318 648.506 317.398 619.054C304.115 569.649 290.833 520.164 277.55 470.758C273.755 456.711 269.96 442.584 266.165 428.536C265.505 426.222 265.093 422.79 262.948 421.592C260.39 420.156 257.75 418.719 255.193 417.202C220.378 397.728 185.48 378.173 150.665 358.698C113.375 337.787 76.085 316.955 38.795 296.044C34.175 293.41 29.5551 290.856 24.8526 288.222C19.9851 285.508 15.7775 293.569 20.5625 296.283C45.3125 310.171 70.145 323.979 94.895 337.867C136.558 361.172 178.22 384.478 219.883 407.864C232.918 415.127 245.87 422.39 258.905 429.654C258.245 428.696 257.585 427.818 257.008 426.86C264.928 456.232 272.765 485.604 280.685 515.055C293.968 564.461 307.25 613.946 320.532 663.351C324.657 678.756 328.783 694.16 332.99 709.644C333.568 711.879 336.043 713.874 338.188 712.916C354.935 705.174 371.683 697.512 388.43 689.77C427.618 671.732 466.723 653.694 505.91 635.576C550.873 614.824 595.918 594.072 640.88 573.32C675.118 557.517 709.437 541.714 743.675 525.91C752.42 521.92 761.082 517.849 769.827 513.858C772.385 512.661 774.447 508.59 771.725 506.116C743.427 480.575 715.047 455.035 686.75 429.494C684.935 427.898 683.12 426.222 681.305 424.625C681.718 425.743 682.13 426.78 682.543 427.898C685.595 396.53 688.565 365.083 691.618 333.716C696.485 283.433 701.352 233.07 706.137 182.786C707.292 170.894 708.447 158.922 709.602 147.029C710.097 141.841 703.91 141.442 701.765 144.715C685.512 168.659 669.26 192.604 653.007 216.628C624.627 258.451 596.248 300.194 567.868 342.017C557.06 357.98 546.252 373.863 535.445 389.826C537.012 389.108 538.58 388.389 540.23 387.671C510.86 374.502 481.572 361.412 452.202 348.242C416.067 332.04 379.932 315.917 343.798 299.715C342.065 298.917 340.415 297.959 338.518 297.879C335.713 297.799 332.825 297.72 330.02 297.64C315.665 297.161 301.228 296.682 286.873 296.283C240.343 294.767 193.813 293.25 147.2 291.813C109.58 290.616 71.8775 289.419 34.2575 288.142C30.4625 287.982 26.5851 287.902 22.7901 287.743C17.1801 287.424 17.18 296.762 22.625 296.922Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M480.451 256.368C474.181 275.763 467.829 295.078 461.559 314.473C447.039 358.93 432.601 403.387 418.081 447.924C402.076 497.09 386.071 546.176 370.066 595.342C359.176 628.704 348.369 661.987 337.479 695.35C336.076 699.739 334.591 704.129 333.189 708.519C331.374 714.186 339.459 716.58 341.356 710.993C347.626 691.598 353.979 672.283 360.249 652.888C374.769 608.431 389.206 563.974 403.726 519.438C419.731 470.352 435.736 421.186 451.741 372.02C462.631 338.657 473.439 305.374 484.329 272.012C485.731 267.622 487.216 263.232 488.619 258.842C490.351 253.175 482.266 250.781 480.451 256.368Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M229.123 155.49C216.665 175.204 204.125 194.918 191.668 214.632C165.268 256.296 138.868 297.959 112.55 339.543C88.955 376.736 65.4425 414.01 41.8475 451.204C35.9075 460.542 29.9675 469.96 24.0275 479.298C22.955 480.974 23.45 483.529 24.6875 484.965C45.725 508.191 66.6801 531.417 87.7176 554.564C117.665 587.607 147.613 620.73 177.56 653.774C180.943 657.525 184.408 661.276 187.79 665.107C190.1 667.661 193.895 666.304 194.803 663.032C204.208 631.425 213.613 599.819 222.935 568.212C235.805 524.873 248.675 481.453 261.545 438.114C262.618 434.442 263.69 430.851 264.763 427.179C265.34 425.264 264.763 423.029 264.598 421.113C263.03 405.949 261.38 390.784 259.813 375.539C254.45 324.936 249.17 274.334 243.808 223.811C241.498 201.782 239.188 179.753 236.878 157.645C236.218 151.738 227.803 151.659 228.463 157.645C231.763 189.092 235.063 220.459 238.363 251.906C243.478 300.513 248.593 349.041 253.708 397.648C254.45 404.432 255.11 411.216 255.853 418.001C256.018 419.836 256.265 421.672 256.43 423.588C256.595 424.944 256.183 426.301 256.76 424.306C253.873 433.964 250.985 443.701 248.098 453.359C234.073 500.529 220.048 547.7 206.023 594.87C199.505 616.74 193.07 638.609 186.553 660.478C188.863 659.76 191.255 659.121 193.565 658.403C172.528 635.177 151.573 611.951 130.535 588.804C100.588 555.761 70.6401 522.638 40.6926 489.594C37.3101 485.843 33.845 482.092 30.4625 478.261C30.71 480.176 30.875 482.012 31.1225 483.928C43.58 464.213 56.12 444.499 68.5775 424.785C94.8951 383.121 121.295 341.538 147.613 299.875C171.208 262.681 194.72 225.407 218.315 188.214C224.255 178.875 230.195 169.457 236.135 160.119C239.518 155.25 232.175 150.621 229.123 155.49Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M335.383 305.781C313.768 338.266 292.153 370.83 270.538 403.315C266.083 409.939 261.71 416.644 257.255 423.268C256.183 424.865 256.678 427.578 257.915 428.935C272.6 444.339 287.368 459.744 302.053 475.148C334.475 509.149 366.98 543.07 399.403 577.071C431.99 611.232 464.66 645.393 497.248 679.554C512.51 695.517 527.772 711.48 542.952 727.443C544.85 729.358 548.315 729.278 549.552 726.485C560.69 701.742 571.745 676.92 582.882 652.177C603.755 605.565 624.71 558.953 645.582 512.421C657.627 485.604 669.673 458.706 681.718 431.888C681.718 431.808 681.8 431.729 681.8 431.649C682.543 429.893 682.625 427.339 681.14 425.982C659.03 406.188 636.837 386.394 614.727 366.6C580.077 335.632 545.427 304.663 510.777 273.695C503.682 267.31 496.505 260.925 489.41 254.62C486.44 251.906 481.82 254.38 478.52 255.418C470.93 257.732 463.34 259.967 455.75 262.282L337.363 298.039C336.043 298.438 334.723 298.837 333.403 299.236C328.123 300.832 330.35 309.772 335.63 308.175C369.95 297.799 404.27 287.423 438.59 277.127C454.842 272.179 471.178 267.31 487.43 262.362C486.028 261.963 484.708 261.563 483.305 261.164C505.415 280.958 527.608 300.753 549.718 320.547C584.368 351.515 619.018 382.483 653.668 413.451C660.845 419.836 667.94 426.221 675.118 432.607C674.87 430.691 674.705 428.855 674.457 426.94C663.32 451.682 652.265 476.505 641.127 501.247C620.255 547.859 599.3 594.471 578.427 641.003C566.382 667.821 554.338 694.718 542.293 721.536C542.293 721.616 542.21 721.696 542.21 721.776C544.438 721.456 546.665 721.137 548.81 720.818C534.125 705.414 519.358 690.009 504.673 674.605C472.25 640.604 439.745 606.683 407.323 572.682C374.735 538.521 342.065 504.36 309.478 470.199C294.215 454.236 278.953 438.273 263.773 422.311C264.02 424.226 264.185 426.062 264.433 427.977C286.048 395.493 307.663 362.928 329.278 330.444C333.733 323.819 338.105 317.115 342.56 310.49C345.86 305.621 338.6 300.992 335.383 305.781Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M534.95 393.657C535.61 421.193 536.353 448.729 537.013 476.265C538.333 528.225 539.653 580.264 540.973 632.224C541.715 662.713 542.54 693.282 543.283 723.771C543.283 723.931 543.283 724.09 543.283 724.25C543.448 730.236 551.863 730.236 551.698 724.25C551.038 696.714 550.295 669.178 549.635 641.642C548.315 589.682 546.995 537.643 545.675 485.684C544.933 455.194 544.108 424.625 543.365 394.136C543.365 393.976 543.365 393.817 543.365 393.657C543.283 387.671 534.785 387.671 534.95 393.657Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M355.348 297.241C373.663 263.08 391.978 228.919 410.293 194.759C411.53 192.444 412.768 190.209 414.005 187.894C411.778 188.214 409.55 188.533 407.405 188.852C432.98 212.876 458.638 236.901 484.213 260.925C484.295 261.005 484.378 261.085 484.46 261.164C488.585 264.996 494.608 258.451 490.4 254.62C464.825 230.595 439.168 206.571 413.593 182.547C413.51 182.467 413.428 182.387 413.345 182.307C411.283 180.392 408.23 180.551 406.745 183.265C388.43 217.426 370.115 251.587 351.8 285.747C350.563 288.062 349.325 290.297 348.088 292.612C345.365 297.72 352.625 302.429 355.348 297.241Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M181.108 273.217H203.878V306.579C207.013 303.067 210.065 300.513 213.118 298.997C216.17 297.48 219.8 296.682 224.008 296.682C230.195 296.682 235.063 298.757 238.693 302.908C242.24 307.058 244.055 313.443 244.055 322.063V363.806H221.12V327.73C221.12 323.58 220.46 320.706 219.058 318.95C217.655 317.274 215.758 316.396 213.2 316.396C210.478 316.396 208.168 317.514 206.518 319.828C204.785 322.143 203.96 326.293 203.96 332.279V363.806H181.19V273.217H181.108Z" fill="black" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M320.368 363.886H299.083V353.271C295.948 357.661 292.73 360.773 289.513 362.609C286.295 364.445 282.335 365.403 277.633 365.403C271.363 365.403 266.413 363.327 262.865 359.177C259.318 355.027 257.503 348.642 257.503 340.022V298.199H280.438V334.275C280.438 338.425 281.098 341.299 282.5 343.054C283.903 344.81 285.8 345.688 288.358 345.688C291.08 345.688 293.308 344.571 295.04 342.256C296.773 339.942 297.68 335.791 297.68 329.805V298.199H320.45V363.886H320.368Z" fill="black" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M357.163 330.843C357.163 336.51 358.153 340.58 360.05 343.134C361.948 345.688 364.423 346.965 367.393 346.965C370.115 346.965 372.425 345.688 374.24 343.214C376.055 340.74 377.045 336.51 377.045 330.603C377.045 325.415 376.138 321.584 374.323 319.19C372.508 316.795 370.28 315.518 367.723 315.518C364.588 315.518 362.113 316.795 360.133 319.349C358.153 321.824 357.163 325.655 357.163 330.843ZM334.31 273.217H357.328V304.664C359.638 302.03 362.195 300.034 365.083 298.757C367.97 297.4 371.188 296.762 374.653 296.762C381.913 296.762 387.935 299.635 392.638 305.382C397.34 311.129 399.733 319.349 399.733 330.124C399.733 337.308 398.66 343.613 396.515 349.041C394.37 354.468 391.318 358.618 387.523 361.252C383.728 363.966 379.438 365.323 374.818 365.323C370.858 365.323 367.145 364.365 363.845 362.449C361.37 360.933 358.648 358.219 355.678 354.069V363.806H334.31V273.217V273.217Z" fill="black" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M96.2975 273.057H138.537V408.742H213.86V448.33H96.2975V273.057Z" fill="black" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M239.517 428.137C239.517 439.311 247.685 448.33 257.832 448.33C267.897 448.33 276.148 439.311 276.148 428.137C276.148 416.963 267.98 407.944 257.832 407.944C247.685 407.944 239.517 416.963 239.517 428.137Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M433.062 347.125C433.062 358.299 441.23 367.318 451.377 367.318C461.442 367.318 469.693 358.299 469.693 347.125C469.693 335.951 461.525 326.932 451.377 326.932C441.23 326.932 433.062 335.951 433.062 347.125Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M309.065 410.897C309.642 410.418 309.89 409.62 309.89 408.662C309.89 407.704 309.642 406.986 309.065 406.427C308.487 405.949 307.662 405.629 306.59 405.629H303.62V411.536H306.59C307.662 411.695 308.487 411.376 309.065 410.897ZM309.725 404.033C310.632 404.432 311.292 405.071 311.705 405.869C312.2 406.667 312.365 407.625 312.365 408.742C312.365 409.859 312.117 410.737 311.705 411.536C311.21 412.334 310.55 412.972 309.725 413.371C308.817 413.77 307.827 414.01 306.672 414.01H303.62V418.32H301.062V403.394H306.672C307.827 403.394 308.817 403.554 309.725 404.033Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M326.225 415.446C326.968 414.968 327.545 414.409 327.958 413.531C328.37 412.733 328.535 411.855 328.535 410.817C328.535 409.78 328.37 408.902 327.958 408.104C327.545 407.305 326.968 406.667 326.225 406.188C325.483 405.709 324.658 405.549 323.75 405.549C322.842 405.549 322.017 405.789 321.275 406.188C320.532 406.667 319.955 407.305 319.542 408.104C319.13 408.902 318.882 409.78 318.882 410.817C318.882 411.775 319.13 412.733 319.542 413.531C319.955 414.329 320.532 414.968 321.275 415.446C322.017 415.925 322.842 416.085 323.75 416.085C324.658 416.085 325.483 415.846 326.225 415.446ZM320.037 417.522C318.965 416.883 318.057 415.925 317.397 414.728C316.737 413.531 316.407 412.254 316.407 410.817C316.407 409.381 316.737 408.024 317.397 406.906C318.057 405.709 318.882 404.831 320.037 404.113C321.11 403.474 322.43 403.155 323.75 403.155C325.153 403.155 326.39 403.474 327.463 404.113C328.535 404.751 329.443 405.709 330.103 406.826C330.763 408.024 331.01 409.301 331.01 410.817C331.01 412.254 330.68 413.611 330.103 414.808C329.443 416.005 328.618 416.883 327.463 417.522C326.39 418.16 325.07 418.479 323.75 418.479C322.43 418.559 321.192 418.24 320.037 417.522Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M355.925 403.394L351.387 418.32H348.747L345.365 407.226L341.982 418.32H339.26L334.805 403.394H337.445L340.745 414.728L344.292 403.394H346.602L350.068 414.808L353.532 403.394H355.925Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M370.775 416.005V418.32H360.545V403.394H370.445V405.709H363.103V409.62H369.62V411.855H363.103V416.005H370.775Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M383.892 406.507C383.315 406.028 382.49 405.709 381.417 405.709H378.447V411.695H381.417C382.49 411.695 383.315 411.456 383.892 410.897C384.47 410.338 384.718 409.62 384.718 408.662C384.718 407.704 384.387 406.986 383.892 406.507ZM384.8 418.32L381.995 413.93C381.912 413.93 381.665 413.93 381.5 413.93H378.447V418.32H375.89V403.394H381.5C382.655 403.394 383.727 403.634 384.552 404.033C385.46 404.432 386.12 405.071 386.532 405.869C387.027 406.667 387.193 407.625 387.193 408.742C387.193 409.859 386.945 410.817 386.45 411.615C385.955 412.414 385.213 413.052 384.305 413.451L387.44 418.4H384.8V418.32Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M402.537 416.005V418.32H392.39V403.394H402.29V405.709H394.865V409.62H401.465V411.855H394.865V416.005H402.537Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M413.345 416.005C414.335 416.005 415.16 415.766 415.902 415.367C416.645 414.968 417.222 414.329 417.635 413.531C418.047 412.733 418.212 411.855 418.212 410.817C418.212 409.78 418.047 408.902 417.635 408.104C417.222 407.305 416.645 406.747 415.902 406.348C415.16 405.949 414.335 405.709 413.345 405.709H410.127V416.005H413.345V416.005ZM407.652 403.394H413.427C414.83 403.394 416.067 403.714 417.222 404.352C418.295 404.991 419.203 405.869 419.78 406.986C420.358 408.104 420.687 409.46 420.687 410.897C420.687 412.414 420.358 413.691 419.78 414.808C419.203 415.925 418.295 416.803 417.222 417.442C416.15 418.08 414.83 418.4 413.427 418.4H407.652V403.394Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M309.619 442.772C309.619 441.335 308.629 440.617 306.731 440.617H302.689V444.927H306.731C308.629 444.927 309.619 444.209 309.619 442.772ZM302.606 434.312V438.462H306.154C307.061 438.462 307.721 438.302 308.216 437.903C308.711 437.584 308.959 437.025 308.959 436.387C308.959 435.668 308.711 435.19 308.216 434.87C307.721 434.551 307.061 434.312 306.154 434.312H302.606ZM311.516 440.697C311.929 441.335 312.176 442.134 312.176 443.091C312.176 444.368 311.764 445.406 310.856 446.124C309.949 446.843 308.629 447.162 306.896 447.162H300.131V432.157H306.484C308.051 432.157 309.289 432.476 310.196 433.194C311.104 433.913 311.516 434.87 311.516 436.068C311.516 436.786 311.351 437.504 311.021 438.063C310.691 438.622 310.279 439.101 309.701 439.42C310.526 439.579 311.104 440.058 311.516 440.697Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M321.546 441.814V447.082H318.989V441.894L313.708 432.157H316.348L320.309 439.42L324.351 432.157H326.826L321.546 441.814Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M335.583 432.157H338.14V444.767H345.153V447.162H335.583V432.157Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M350.963 432.157H348.406V447.162H350.963V432.157Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M363.869 435.269C363.291 434.79 362.466 434.471 361.394 434.471H358.424V440.457H361.394C362.466 440.457 363.291 440.218 363.869 439.659C364.446 439.1 364.694 438.382 364.694 437.424C364.776 436.546 364.446 435.828 363.869 435.269ZM364.859 447.162L362.054 442.772C361.971 442.772 361.724 442.772 361.559 442.772H358.506V447.162H355.949V432.157H361.559C362.714 432.157 363.786 432.396 364.611 432.795C365.519 433.194 366.179 433.833 366.591 434.631C367.086 435.429 367.251 436.387 367.251 437.504C367.251 438.622 367.004 439.579 366.509 440.378C366.014 441.176 365.271 441.814 364.364 442.213L367.499 447.162H364.859Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M374.735 434.551H370.28V432.157H381.747V434.551H377.292V447.162H374.735V434.551Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M395.596 444.767V447.162H385.366V432.157H395.266V434.471H387.923V438.382H394.441V440.697H387.923V444.767H395.596Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M410.988 432.157V447.162H408.925L401.418 437.025V447.162H398.943V432.157H401.005L408.513 442.293V432.157H410.988Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
<path d="M224.338 168.659C218.893 163.551 218.315 154.532 222.935 148.546C227.555 142.56 235.723 141.841 241.168 147.029C246.613 152.137 247.19 161.156 242.57 167.143C237.868 173.049 229.783 173.767 224.338 168.659Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M21.0575 304.663C15.6125 299.555 15.035 290.536 19.655 284.55C24.275 278.564 32.4425 277.846 37.8875 283.034C43.3325 288.142 43.91 297.161 39.29 303.147C34.67 309.133 26.5025 309.851 21.0575 304.663Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M19.325 492.548C13.88 487.439 13.3025 478.42 17.9225 472.434C22.5425 466.448 30.71 465.73 36.155 470.918C41.6 476.026 42.1775 485.045 37.5575 491.031C32.855 496.937 24.6875 497.656 19.325 492.548Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M19.325 492.548C13.88 487.439 13.3025 478.42 17.9225 472.434C22.5425 466.448 30.71 465.73 36.155 470.918C41.6 476.026 42.1775 485.045 37.5575 491.031C32.855 496.937 24.6875 497.656 19.325 492.548Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M182.345 672.69C176.9 667.581 176.323 658.562 180.942 652.576C185.562 646.59 193.73 645.872 199.175 651.06C204.62 656.168 205.197 665.187 200.577 671.173C195.957 677.159 187.79 677.798 182.345 672.69Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M182.345 672.69C176.9 667.581 176.323 658.562 180.942 652.576C185.562 646.59 193.73 645.872 199.175 651.06C204.62 656.168 205.197 665.187 200.577 671.173C195.957 677.159 187.79 677.798 182.345 672.69Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M402.125 197.153C396.68 192.045 396.102 183.026 400.722 177.04C405.342 171.054 413.51 170.335 418.955 175.523C424.4 180.631 424.977 189.65 420.357 195.637C415.737 201.623 407.57 202.261 402.125 197.153Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M530.742 404.512C525.297 399.404 524.72 390.385 529.34 384.398C533.96 378.412 542.127 377.694 547.572 382.882C553.017 387.99 553.595 397.009 548.975 402.995C544.355 408.902 536.187 409.62 530.742 404.512Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M530.742 404.512C525.297 399.404 524.72 390.385 529.34 384.398C533.96 378.412 542.127 377.694 547.572 382.882C553.017 387.99 553.595 397.009 548.975 402.995C544.355 408.902 536.187 409.62 530.742 404.512Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M534.95 621.528C529.505 616.42 528.927 607.401 533.547 601.415C538.167 595.429 546.335 594.711 551.78 599.899C557.225 605.007 557.802 614.026 553.182 620.012C548.48 625.918 540.395 626.636 534.95 621.528Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M464.907 653.454C459.462 648.346 458.885 639.327 463.505 633.341C467.218 628.632 477.282 627.594 481.737 631.824C487.182 636.933 487.76 645.952 483.14 651.938C478.437 657.844 470.27 658.562 464.907 653.454Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M464.907 653.454C459.462 648.346 458.885 639.327 463.505 633.341C467.218 628.632 477.282 627.594 481.737 631.824C487.182 636.933 487.76 645.952 483.14 651.938C478.437 657.844 470.27 658.562 464.907 653.454Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M566.795 347.444C561.35 342.336 560.772 333.317 565.392 327.331C569.105 322.622 579.17 321.584 583.625 325.814C589.07 330.923 589.647 339.942 585.027 345.928C580.407 351.914 572.24 352.632 566.795 347.444Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M379.107 569.409C373.662 564.301 373.085 555.282 377.705 549.296C381.417 544.587 391.483 543.549 395.938 547.78C401.383 552.888 401.96 561.907 397.34 567.893C392.638 573.799 384.47 574.517 379.107 569.409Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M379.107 569.409C373.662 564.301 373.085 555.282 377.705 549.296C381.417 544.587 391.483 543.549 395.938 547.78C401.383 552.888 401.96 561.907 397.34 567.893C392.638 573.799 384.47 574.517 379.107 569.409Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M477.777 268.747C472.332 263.639 471.755 254.62 476.375 248.634C480.995 242.647 489.162 241.929 494.607 247.117C500.052 252.225 500.63 261.244 496.01 267.23C491.39 273.137 483.222 273.855 477.777 268.747Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M693.35 166.664C687.905 161.556 687.327 152.536 691.947 146.55C696.567 140.564 704.735 139.846 710.18 145.034C715.625 150.142 716.202 159.161 711.582 165.147C706.88 171.133 698.712 171.772 693.35 166.664Z" fill="#C7C7C7" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M670.415 440.109C664.97 435.001 664.392 425.982 669.012 419.996C673.632 414.01 681.8 413.292 687.245 418.479C692.69 423.588 693.268 432.607 688.648 438.593C683.945 444.579 675.86 445.217 670.415 440.109Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M670.415 440.109C664.97 435.001 664.392 425.982 669.012 419.996C673.632 414.01 681.8 413.292 687.245 418.479C692.69 423.588 693.268 432.607 688.648 438.593C683.945 444.579 675.86 445.217 670.415 440.109Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M603.507 592.955C598.062 587.846 597.485 578.827 602.105 572.841C606.725 566.855 614.892 566.137 620.337 571.325C625.782 576.433 626.36 585.452 621.74 591.438C617.037 597.424 608.87 598.143 603.507 592.955Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M603.507 592.955C598.062 587.846 597.485 578.827 602.105 572.841C606.725 566.855 614.892 566.137 620.337 571.325C625.782 576.433 626.36 585.452 621.74 591.438C617.037 597.424 608.87 598.143 603.507 592.955Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M540.395 729.997C535.115 725.048 534.537 716.269 538.992 710.442C542.54 705.813 552.357 704.855 556.73 708.926C562.01 713.874 562.587 722.654 558.132 728.48C553.595 734.307 545.675 734.945 540.395 729.997Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M540.395 729.997C535.115 725.048 534.537 716.269 538.992 710.442C542.54 705.813 552.357 704.855 556.73 708.926C562.01 713.874 562.587 722.654 558.132 728.48C553.595 734.307 545.675 734.945 540.395 729.997Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M328.37 716.189C323.09 711.24 322.513 702.46 326.968 696.634C330.515 692.005 340.333 691.047 344.705 695.117C349.985 700.066 350.563 708.846 346.108 714.672C341.488 720.499 333.568 721.137 328.37 716.189Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M328.37 716.189C323.09 711.24 322.513 702.46 326.968 696.634C330.515 692.005 340.333 691.047 344.705 695.117C349.985 700.066 350.563 708.846 346.108 714.672C341.488 720.499 333.568 721.137 328.37 716.189Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
<path d="M758.773 516.731C753.493 511.783 752.915 503.003 757.37 497.177C760.917 492.548 770.735 491.59 775.107 495.66C780.387 500.609 780.965 509.388 776.51 515.215C771.89 521.041 763.97 521.76 758.773 516.731Z" fill="#C4C4C4" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
</svg>

</div>

<div  style={displaySingUp} className="Bg-text"> <SingUpForm/></div>
<div style={displayLogin} className="Bg-text"> <LoginForm/> </div>
                        <div className="Bg-text1">
                        
<h4>Be... </h4>
<h4>What you want</h4>
<Button onClick={modalSignUp} block size="lg"  variant="outline-secondary" > Join our family</Button>
                        </div>
                
{/* <div className="Bg-text">
      <LoginForm/> </div> */}


                        <script src="app.js"></script>
        </div>

      
    )
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  info:state.info
})
export default connect(mapStateToProps,{logoutUser})(welcomPage)