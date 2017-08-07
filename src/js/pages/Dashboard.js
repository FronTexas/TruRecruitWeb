import React from 'react';

export default class Dashboard extends React.Component{
	render(){
		return ( 
			<div class="dashboard-content">
 				<div class="white-box-container">
		            <div class="personal-information-box hvr-shadow">
		               <div class="user-information">
		                  <img src="http://www.radfaces.com/images/avatars/alan-frog.jpg" alt="" class="profpic"></img>
		                  <div class="name-description-container">
		                     <span class="name">Fahran Kamili</span>
		                     <snap class="description">Engineer</snap>
		                  </div>
		               </div>
		               <div class="portfolio-link-container-container">
		               	<span class="tr-dark-blue-text large-text"><b>Education</b></span>
		                  
		               	<span class="medium-text">UT Austin</span>
		                  

		               	<span class="gray-text">2013-2017</span>
		                  

		               	<span class="gray-text">BS</span>
		                  

		               	 <span class="gray-text">Mathematics</span>
		                   
		                   
							
		               	<span class="tr-dark-blue-text large-text"><b>Employment</b></span>
		               	
		               	<span class="medium-text">Visa</span>
		                  

		                  <span  class="gray-text">Software Engineer Intern</span>     
		                  

		                  <span class="gray-text">May 2016 - August 2016</span>      
		                  

		                  <span  class="gray-text">San Mateo, CA</span>               	
		                  
		               </div>
		               <div class="portfolio-link-container-container">
		                  <div class="portfolio-link-container linkedin">
		                     <i class="fa fa-link portfolio-icon"></i>
		                     <a href="" class="portfolio-link">somewhere.com</a>
		                  </div>
		                  <a href="" class="add-link-button hvr-shadow">+</a>
		               </div>
		            </div>
		            <div class="resume-container">
		               <div class="no-resume-view">
		                  <div class="drag-drop-container">
		                     <i class="fa fa-file-pdf-o pdf-resume-upload-icon">
		                     </i>
		                     <span class="drag-drop-text">Drag and Drop your Resume here!</span>
		                  </div>
		                  <a href="#" class="add-event-button hvr-shadow">
		                  <span>Or browse from your computer</span>
		                  </a>
		               </div>
		               <div class="yes-resume-view">
		                  <div class="resume-preview hvr-shadow"></div>
		                  <div class="qr-code-area">
		                     <div class="qr-code">
		                        <span class="qr-code-explaination">Your Resume QR Code</span>
		                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=forfron@gmail.com&color=00BC96&bgcolor=EEF1F7" alt=""></img>
		                     </div>
		                     <div class="print-or-share-area">
		                      <div class="printshare-container">
		                           <div class="download-resume printshare-button hvr-shadow">
		                              <i class="fa fa-file-pdf-o"></i>
		                              <span>Get Resume With QR Code</span>
		                           </div>
		                        </div>
		                        <div class="printshare-container">
		                           <div class="download-name-tag printshare-button hvr-shadow">
		                              <i class="fa fa-list-alt"></i>
		                              <span>Get Name Tag With QR Code</span>
		                           </div>
		                        </div>
		                        <div class="printshare-container">
		                           <div class="email-qr-code printshare-button hvr-shadow">
		                              <i class="fa fa-envelope"></i>
		                              <span>Email QR Code</span>
		                           </div>
		                        </div>
		                        <div class="printshare-container">
		                           <div class="save-qr-code printshare-button hvr-shadow">
		                              <i class="fa fa-floppy-o"></i>
		                              <span>Save QR Code</span>
		                           </div>
		                        </div>
		                        
		                     </div>
		                  </div>
		               </div>
		            </div>
         		</div>
      		</div>
      	)
	}
}