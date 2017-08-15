import React from 'react';

export default class Landing extends React.Component{
	render(){
		return(
			<div>
				<div class="container-fluid my-jumbotron gradient-green-bg vertical-center">
					<div class="container">
						<h1>
							Tru<b>Recruit</b>
						</h1>
						<p class="jumbotron-subtitle">A new way to network resume</p>
					</div>
				</div>

				<div class="container-fluid instruction">
					<div class="container how-it-works-area">
						<h1 class="how-it-works-text">How it works</h1>
						<div class="row">
							<div class="col s4 instruction-card-container">
								<div class="instruction-card drop-shadow-dark">
									<img src={require('../imgs/resume.png')} alt="" class="center-block responsive-img"></img>
									<p class="text-center">1. Prospective candidates sign up and upload a copy of their resume to our website. </p>
								</div>
							</div>
							<div class="col s4 instruction-card-container">
								<div class="instruction-card drop-shadow-dark">
									<img src={require("../imgs/platform.png")} alt="" class="center-block responsive-img"></img>
									<p class="text-center">2. Prospective candidates save a QR code provided by us.</p>
								</div>
							</div>
							<div class="col s4 instruction-card-container">
								<div class="instruction-card drop-shadow-dark">
									<img src={require("../imgs/phone.png")} alt="" class="center-block responsive-img"></img>
									<p class="text-center">3. Recruiters takes notes and rate resumes after scanning a candidate's QR code. </p>
								</div>
							</div>
						</div>
					</div>
				</div>
		
				<div class="container-fluid ">
					<div class="row">
						<div class="col s2"><p><b>TruRecruit 2017</b></p></div>
						<div class="col s1"><p><a href="./contact.html"><b>Contact Us</b></a></p></div>
					</div>
				</div>
			</div>
		)
	}
}