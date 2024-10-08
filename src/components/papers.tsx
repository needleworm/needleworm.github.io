import React from 'react';
import './papers.css';


function Papers () {
  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Papers</h2>
        </div>
      </div>
    )
  }

  const drawWebsites = () => {
    let gitLogo = <i className="fab fa-github"></i>
    
    let paper0 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/0.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>대립 신경망을 이용한 심혈관 단층촬영 영상 표지 방법</h5><br/>
          <p className="bookDescription">
            <strong>반병현</strong>(2018)<br/>
            한국과학기술원 (석사학위논문)
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            의료영상 표지기술은 환자로부터 촬영된 엑스선 영상, 자기공명영상 또는 컴퓨터 단층촬영 영상 따위의 의료영상을 탐색하여 의미 있는 부분만 분할 표지하는 것으로 질병을 빠르고 정밀하게 진단하기 위한 보조 수단으로써 각광받고 있다. 종래 기계학습 기반의 의료영상 표지기술은 통계적 추론에 근거하여 표지 대상 구역과 그 외부 구역을 분할하도록 목적함수를 최소화하는 것을 공통적인 철학으로써 공유하는데, 심장 단층촬영 사진으로부터 관상동맥만을 특이적으로 표지하는 등 의료영상 내부의 표지 대상과 비 표지 대상의 비율이 한 쪽으로 치우친 경우 학습에 실패하여 전방위적인 오류를 도출한다. 본 논문에서는 완전연결 컨볼루션 뉴럴 네트워크의 2차원 확률분포 철학을 계승하며 영상 윈도잉 기법을 제안하여 클래스 밸런스 문제를 해결한다. 또한 생성적 대립 신경망이 비 생성적 인공지능의 성능 향상에 기여할 수 있다는 가능성을 제안하며 대립 신경망 학습을 통해 분류 대상의 비율이 극단적으로 치우친 경우에도 강건하게 작동하고, 인간이 발견하지 못 한 관상동맥을 발견한 혁신적인 성능의 의료영상 표지기술을 제안한다. 
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Byung-Hyun Ban. "Cardiac CT image segmentation with adversarial networks." Master\'s Thesis, Korea Advanced Institute of Science and Technology, 2018.'

                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://koasas.kaist.ac.kr/handle/10203/295283" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/1.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>Control of nonlinear, complex and black-boxed greenhouse system with reinforcement learning</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong>*, Soobin Kim (2017)<br/>
              2017 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
              Modern control theories such as systems engineering approaches try to solve nonlinear system problems 
              by revelation of causal relationship or co-relationship among the components; most of those approaches 
              focus on control of sophisticatedly modeled white-boxed systems. We suggest an application of actor-critic 
              reinforcement learning approach to control a nonlinear, complex and black-boxed system. We demonstrated 
              this approach on artificial green-house environment simulator all of whose control inputs have several 
              side effects so human cannot figure out how to control this system easily. Our approach succeeded to maintain 
              the circumstance at least 20 times longer than PID and Deep Q Learning.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban and S. Kim, "Control of nonlinear, complex and black-boxed greenhouse system with reinforcement learning," 2017 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2017, pp. 913-918, doi: 10.1109/ICTC.2017.8190813.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/greenhouse_ai" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/1.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC.2017.8190813" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper2 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/2.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>ODE Network Model for Nonlinear and Complex Agricultural Nutrient Solution System</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong>*, Minwoo Lee, Donghun Ryu (2019)<br/>
              2019 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            In closed hydroponic systems, periodic readjustment of nutrient solution is necessary to continuously 
            provide stable environment to plant roots because the interaction between plant and nutrient solution 
            changes the rate of ions in it. The traditional method is to repeat supplying small amount of premade 
            concentrated nutrient solution, measuring total electric conductivity and pH of the tank only. 
            As it cannot control the collapse of ion rates, recent researches try to measure the concentration of 
            individual components to provide insufficient ions only. However, those approaches use titration-like 
            heuristic approaches, which repeat adding small amount of components and measuring ion density a lot of 
            times for a single control input. Both traditional and recent methods are not only time-consuming, but also 
            cannot predict chemical reactions related with control inputs because the nutrient solution is a nonlinear 
            complex system, including many precipitation reactions and complicated interactions. We present a continuous 
            network model of the nutrient solution system, whose reactions are described as differential equations. 
            The model predicts molar concentration of each chemical components and total dissolved solids with low error. 
            This model also can calculate the amount of chemical compounds needed to produce a desired nutrient solution, 
            by reverse calculation from dissolved ion concentrations.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban, M. Lee and D. Ryu, "ODE Network Model for Nonlinear and Complex Agricultural Nutrient Solution System," 2019 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2019, pp. 996-1001, doi: 10.1109/ICTC46691.2019.8939946.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/nutrient_solution" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/2.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC46691.2019.8939946" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper3 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/3.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>Machine Learning Approach to Remove Ion Interference Effect in Agricultural Nutrient Solutions</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong>*, Minwoo Lee, Donghun Ryu (2019)<br/>
              2019 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            High concentration agricultural facilities such as vertical farms or plant factories consider hydroponic techniques as optimal solutions. Although closed-system dramatically reduces water consumption and pollution issues, it has ion-ratio related problem. As the root absorbs individual ions with different rate, ion rate in a nutrient solution should be adjusted periodically. But traditional method only considers pH and electrical conductivity to adjust the nutrient solution, leading to ion imbalance and accumulation of excessive salts. To avoid those problems, some researchers have proposed ion-balancing methods which measure and control each ion concentration. However, those approaches do not overcome the innate limitations of ISEs, especially ion interference effect. An anion sensor is affected by other anions, and the error grows larger in higher concentration solution. A machine learning approach to modify ISE data distorted by ion interference effect is proposed in this paper. As measurement of TDS value is relatively robust than any other signals, we applied TDS as key parameter to build a readjustment function to remove the artifact. Once a readjustment model is established, application on ISE data can be done in real time. Readjusted data with proposed model showed about 91.6 ~ 98.3% accuracies. This method will enable the fields to apply recent methods in feasible status.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban, D. Ryu and M. Lee, "Machine Learning Approach to Remove Ion Interference Effect in Agricultural Nutrient Solutions," 2019 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2019, pp. 1156-1161, doi: 10.1109/ICTC46691.2019.8939812.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/ion_interference" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/3.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC46691.2019.8939812" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper4 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/4.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>Nutrient Solution Management System for Smart Farms and Plant Factory</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong>*, Janghun Lee, Donghun Ryu, Minwoo Lee, Tae Dong Eom (2020)<br/>
              2020 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            We present an automated system for nutrient solution management. Prior arts usually measure only pH and EC of the nutrient solutions for maintenance. When EC drops, they just simply add concentrated nutrient to the horticulture bed. Such approach can maintain the density of nutrient solution but cannot maintain the rates of individual ion particles. To prevent nutrition related disorders, fertilization methods with ion selective electrodes are widely introduced. This trend measures individual ion concentration of nutrient solution to maintain appropriate nutrient composition by supplying only insufficient ions. Many researchers have suggested ISE based automated fertilization systems. However, they failed to control a chemical artifact called ion interference effect, which becomes greater at higher density. Our system measures individual concentration of multiple ions and add only deficient nutrients, while handling the ion interference effect issue. To ensure the performance of ion selective electrodes, the system also performs fully automated 3-point calibration 24 times a day. A machine learning algorithm is applied on the sensory parts to remove ion interference effect which make measurement of complex solution with ISE almost impossible. With automated calibration and signal processing technology, the system robustly and continuously maintains nutrient condition for plants. We suggest applying this system on closed hydroponic systems such as smart farms or plant factory, to reduce water consumption and to provide more appropriate environment for the crops.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban, J. Lee, D. Ryu, M. Lee and T. D. Eom, "Nutrient Solution Management System for Smart Farms and Plant Factory," 2020 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2020, pp. 1537-1542, doi: 10.1109/ICTC49870.2020.9289192.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/4.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC49870.2020.9289192" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper5 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/5.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>Deep learning method to remove chemical, kinetic and electric artifacts on ISEs</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong> (2020)<br/>
              2020 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            I suggest a deep learning based sensor signal processing method to remove chemical, kinetic and electrical artifacts from ion selective electrodes' measured values. An ISE is used to investigate the concentration of a specific ion from aqueous solution, by measuring the Nernst potential along the glass membrane. However, application of ISE on a mixture of multiple ion has some problem. First problem is a chemical artifact which is called ion interference effect. Electrically charged particles interact with each other and flows through the glass membrane of different ISEs. Second problem is the kinetic artifact caused by the movement of the liquid. Water molecules collide with the glass membrane causing abnormal peak values of voltage. The last artifact is the interference of ISEs. When multiple ISEs are dipped into same solution, one electrode's signal emission interference voltage measurement of other electrodes. Therefore, an ISE is recommended to be applied on single-ion solution, without any other sensors applied at the same time. Deep learning approach can remove both 3 artifacts at the same time. The proposed method used 5 layers of artificial neural networks to regress correct signal to remove complex artifacts with one-shot calculation. Its MAPE was less than 1.8% and R 2 of regression was 0.997. A randomly chosen value of AI processed data has MAPE less than 5% (p-value 0.016).
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban, "Deep learning method to remove chemical, kinetic and electric artifacts on ISEs," 2020 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2020, pp. 1242-1246, doi: 10.1109/ICTC49870.2020.9289389.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/ion_interference" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/5.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC49870.2020.9289389" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper6 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/6.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>Mathematical Model and Simulation for Nutrient-Plant Interaction Analysis</h5><br/>
            <p className="bookDescription">
            <strong>Byunghyun Ban</strong> (2020)<br/>
              2020 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            Differential equation models to understand interaction between plant and nutrient solution are presented. The root cells selectively emit H+ ions with active transport consuming ATPs to establish electrical gradient along the cell membrane. It establishes electrical field with Nernst potential to make positively charged ions outside the cell membrane flow into the root cell. Anion influx is also modulated by H+ ion concentration because plant root cell absorbs negatively charged particles with symport. If an anion collides with H+ cell to make net charge as neutral, at symport channel, it can flow through. In this paper, mathematical models for cation and anion absorption are introduced. Cation absorption model was induced from Ohm's law combined with Goldman's equation. Anion absorption model is similar to chemical reaction rate model. Both models have physiological terms influenced by gene expression pattern, species or phenotypes. Cation model also includes terms for ion's kinetic and electrical properties, growth of plant and interaction between the root and the surroundings. Simulation for 20 different sets of coefficients showed that the physiology-related coefficient has important role on nutrition absorption tendencies of plants.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'B. Ban, "Mathematical Model and Simulation for Nutrient-Plant Interaction Analysis," 2020 International Conference on Information and Communication Technology Convergence (ICTC), Jeju, Korea (South), 2020, pp. 1531-1536, doi: 10.1109/ICTC49870.2020.9289083.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/bh_coefficient" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/6.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC49870.2020.9289083" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let paper7 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/7.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>GAN-D: Generative adversarial networks for image deconvolution</h5><br/>
            <p className="bookDescription">
              Ha Yeon Lee, Jin Myungg Kwak, <strong>Byunghyun Ban</strong>, Seon Jin Na, Se Ra Lee, Heung-Kyu Lee* (2017)<br/>
              2017 International Conference on Information and Communication Technology Convergence (ICTC)
            </p>
          <div className="codeBody">
            <p className="bookDescription">
            We propose new generative adversarial networks for generalized image deconvolution, GAN-D. Most of the previous researches concentrate to specific sub-topic of image deconvolution or generative image deconvolution models with a strong assumption. However, our network restores visual data from distorted images applied multiple dominant degradation problems such as noise, blur, saturation, compression without any prior information. As a generator, we leverage convolutional neural networks based ODCNN [12] which perform generalized image deconvolution with a decent performance, and we use VGGNet [11] to distinguish true/fake of an input image as a discriminator. We devise the loss function of the generator of GAN-D which combines mean square error (MSE) of network output and ground-truth images to traditional adversarial loss of GAN. This loss function and the presence of discriminator reinforces the generator to produce more high-quality images than the original model structured with a single convolutional neural network. During experiments with four datasets, we find that our network has higher PSNR/SSIM values and qualitative results than ODCNN.
            </p>
          </div>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'HY Lee, JM Kwak, B Ban, SJ Na, SR Lee, and HK Lee. "GAN-D: Generative adversarial networks for image deconvolution." 2017 International Conference on Information and Communication Technology Convergence (ICTC). IEEE, 2017.'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/mlproject" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/7.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1109/ICTC.2017.8190958" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper8 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/8.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>The phenotype control kernel of a biomolecular regulatory network</h5><br/>
          <p className="bookDescription">
            Sang-Mok Choo, <strong>Byunghyun Ban</strong>, Ja Il Joo, Kwnag-Hyun Cho* (2018)<br/>
            BMC Systems Biology &nbsp;(SCI)
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            Background<br/>
            Controlling complex molecular regulatory networks is getting a growing attention as it can provide a systematic way of driving any cellular state to a desired cell phenotypic state. A number of recent studies suggested various control methods, but there is still deficiency in finding out practically useful control targets that ensure convergence of any initial network state to one of attractor states corresponding to a desired cell phenotype.<br/><br/>
            Results<br/>
            To find out practically useful control targets, we introduce a new concept of phenotype control kernel (PCK) for a Boolean network, defined as the collection of all minimal sets of control nodes having their fixed state values that can generate all possible control sets which eventually drive any initial state to one of attractor states corresponding to a particular cell phenotype of interest. We also present a detailed method with which we can identify PCK in a systematic way based on the layered network and converging tree of a given network. We identify all candidates for control nodes from the layered network and then hierarchically search for all possible minimal sets by using the converging tree. We show the usefulness of PCK by applying it to cell proliferation and apoptosis signaling networks and comparing the results with other control methods. PCK is the unique control method for Boolean network models that can be used to identify all possible minimal sets of control nodes. Interestingly, many of the minimal sets have only one or two control nodes.<br/><br/>
            Conclusions<br/>
            Based on the new concept of PCK, we can identify all possible minimal sets of control nodes that can drive any molecular network state to one of multiple attractor states representing a same desired cell phenotype.<br/><br/>
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Choo, SM., Ban, B., Joo, J.I. et al. The phenotype control kernel of a biomolecular regulatory network. BMC Syst Biol 12, 49 (2018). https://doi.org/10.1186/s12918-018-0576-8'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/nc2" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/8.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.1186/s12918-018-0576-8" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper9 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/9.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>A Survey on Awesome Korean NLP Datasets</h5><br/>
          <p className="bookDescription">
            <strong>Byunghyun Ban</strong>(2022)<br/>
            2022 13th International Conference on Information and Communication Technology Convergence (ICTC)
          </p>
        <div className="codeBody">
          <p className="bookDescription">
          English based datasets are commonly available from Kaggle, GitHub, or recently published papers. Although benchmark tests with English datasets are sufficient to show off the performances of new models and methods, still a researcher need to train and validate the models on Korean based datasets to produce a technology or product, suitable for Korean processing. This paper introduces 15 popular Korean based NLP datasets with summarized details such as volume, license, repositories, and other research results inspired by the datasets. Also, I provide high-resolution instructions with sample or statistics of datasets. The main characteristics of datasets are presented on a single table to provide a rapid summarization of datasets for researchers.
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'B. Ban, "A Survey on Awesome Korean NLP Datasets," 2022 13th International Conference on Information and Communication Technology Convergence (ICTC), 2022, pp. 1615-1620, doi: 10.1109/ICTC55196.2022.9952930.'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/9.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://ieeexplore.ieee.org/document/9952930" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper10 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/10.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>Mixed Reality Interface for Digital Twin of Plant Factory</h5><br/>
          <p className="bookDescription">
            <strong>Byunghyun Ban</strong>(2022)<br/>
            Preprint (arXiv)
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            An easier and intuitive interface architecture is necessary for digital twin of plant factory. I suggest an immersive and interactive mixed reality interface for digital twin models of smart farming, for remote work rather than simulation of components. The environment is constructed with UI display and a streaming background scene, which is a real time scene taken from camera device located in the plant factory, processed with deformable neural radiance fields. User can monitor and control the remote plant factory facilities with HMD or 2D display based mixed reality environment. This paper also introduces detailed concept and describes the system architecture to implement suggested mixed reality interface.
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Ban, Byunghyun. "Mixed Reality Interface for Digital Twin of Plant Factory." arXiv preprint arXiv:2211.00597 (2022).'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/10.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://arxiv.org/abs/2211.00597" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper11 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/11.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>AI Knows Which Words Will Appear in Next Year's Korean CSAT</h5><br/>
          <p className="bookDescription">
            <strong>Byunghyun Ban</strong>, Jejong Lee, Hyeonmok Hwang (2023)<br/>
            ICTC 2023 (IEEE)
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            A text-mining-based word function categorization method and LSTM-based vocabulary pattern prediction method are introduced in this paper. A preprocessing method based on simple text appearance frequency analysis is first described. This method was developed as a data screening tool but showed 4.35 ~ 6.21 times higher than previous works. An LSTM deep learning method is also suggested for vocabulary appearance pattern prediction method. AI performs a regression with various size of data window of previous exams to predict the probabilities of word appearance in the next exam. Predicted values of AI over various data windows are processed into a single score as a weighted sum, which we call an "AI-Score", which represents the probability of word appearance in next year's exam. Suggested method showed 100% accuracy at the range 100-score area and showed only 1.7% error of prediction in the section where the scores were over 60 points. All source codes are freely available at the authors' 
            <a href="https://github.com/needleworm/bigdata_voca" target="_blank" rel="noreferrer">Git Hub repository. </a>
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = "Ban, Byunghyun, et al. 'AI Knows Which Words Will Appear in Next Year's Korean CSAT.' 2023 14th International Conference on Information and Communication Technology Convergence (ICTC), 2023."
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/11.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://arxiv.org/abs/2211.15426" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://github.com/needleworm/bigdata_voca" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper12 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/12.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>수능 영어시험의 어휘 등장 패턴 분석</h5><br/>
          <p className="bookDescription">
            <strong>반병현</strong>, 이제종, 황현목 (2022)<br/>
            인공지능연구
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            텍스트 마이닝 기법 기반의 어휘 분류 기법과 LSTM을 활용한 어휘 출현 패턴 예측 방법을 소개한다. 단순한 텍스트의 등장 빈도를 기반으로 한 프리프로세싱 기법을 제안하며, 이 기법으로 제작된 어휘 스크리닝 기술은 시중의 베스트셀러 수능 어휘 교재인 워드 마스터 대비 2023년도 수능 시험 적중률이 4.35배 더 높았다. LSTM 딥러닝 기법을 활용한 인공지능 기술도 함께 제안하며, 이 기법 은 수능 시험에서 특정 어휘가 어떤 패턴으로 등장하는지 분석하고 이를 토대로 다음 수능에 출제될 어휘의 목록과 그 등장확률을 예측할 수 있다. AI의 예측값은 여러 크기의 데이터 윈도우를 바탕으로 학습된 추론값을 노멀라이즈한 뒤 가중합 연산하여 구한 것 이며, 저자들은 이 값을 AI-Score라고 부른다. AI-score는 특정 단어가 다음 수능 시험에서 등장할 확률을 의미하며, 논문에서 제안 하는 방법론이 100점으로 분류한 단어들은 2023수능에서 100% 출제되었다. AI-Score가 60점 이상인 영역에서는 불과 1.7%수준의 오차로 수능에 출제될 단어들의 등장 확률을 예측하는 데 성공했다.
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Ban, Byunghyun, et al. (2022). "Analysis on English Vocabulary Appearance Pattern in Korean CSAT." Journal of The Korean Association of Artificial Intelligence Education, 3(3), 15-23'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/12.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="http://aied.or.kr/sub_html/sub02_08.html?pageNm=article&journal=1&code=425485&issue=32270" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://github.com/needleworm/bigdata_voca" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper13 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/13.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>CongNaMul: A Dataset for Advanced Image Processing of Soybean Sprouts</h5><br/>
          <p className="bookDescription">
            <strong>Byunghyun Ban (2023)</strong><br/>
            ICTC 2023
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            We present 'CongNaMul', a comprehensive dataset designed for various tasks in soybean sprouts image analysis. The CongNaMul dataset is curated to facilitate tasks such as image classification, semantic segmentation, decomposition, and measurement of length and weight. The classification task provides four classes to determine the quality of soybean sprouts: normal, broken, spotted, and broken and spotted, for the development of AI-aided automatic quality inspection technology. For semantic segmentation, images with varying complexity, from single sprout images to images with multiple sprouts, along with human-labelled mask images, are included. The label has 4 different classes: background, head, body, tail. The dataset also provides images and masks for the image decomposition task, including two separate sprout images and their combined form. Lastly, 5 physical features of sprouts (head length, body length, body thickness, tail length, weight) are provided for image-based measurement tasks. This dataset is expected to be a valuable resource for a wide range of research and applications in the advanced analysis of images of soybean sprouts. Also, we hope that this dataset can assist researchers studying classification, semantic segmentation, decomposition, and physical feature measurement in other industrial fields, in evaluating their models. The dataset is available at the authors' repository.
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Ban, Byunghyun. (2023). "CongNaMul: A Dataset for Advanced Image Processing of Soybean Sprouts." 2023 14th International Conference on Information and Communication Technology Convergence (ICTC), 2023.'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://arxiv.org/ftp/arxiv/papers/2308/2308.15690.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://arxiv.org/abs/2308.15690" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="http://bhban.kr/data/" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let paper14 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/14.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>FAKER: Full-body Anonymization with Human Keypoint Extraction for Real-time Video Deidentification</h5><br/>
          <p className="bookDescription">
            <strong>Byunghyun Ban*, Hyoseok Lee (2024)</strong><br/>
            ArXiv Preprint
          </p>
        <div className="codeBody">
          <p className="bookDescription">
            In the contemporary digital era, protection of personal information has become a paramount issue. The exponential growth of the media industry has heightened concerns regarding the anonymization of individuals captured in video footage. Traditional methods, such as blurring or pixelation, are commonly employed, while recent advancements have introduced generative adversarial networks (GAN) to redraw faces in videos. In this study, we propose a novel approach that employs a significantly smaller model to achieve real-time full-body anonymization of individuals in videos. Unlike conventional techniques that often fail to effectively remove personal identification information such as skin color, clothing, accessories, and body shape while our method successfully eradicates all such details. Furthermore, by leveraging pose estimation algorithms, our approach accurately represents information regarding individuals' positions, movements, and postures. This algorithm can be seamlessly integrated into CCTV or IP camera systems installed in various industrial settings, functioning in real-time and thus facilitating the widespread adoption of full-body anonymization technology.
          </p>
        </div>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                const citationText = 'Byunghyun Ban and Hyoseok Lee (2024). "FAKER: Full-body Anonymization with Human Keypoint Extraction for Real-time Video Deidentification" ArXiv Preprint, arXiv:2408.11829, 2024.'
                // Clipboard API 사용
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(citationText)
                    .then(() => {
                      alert("Citation is copied to Clipboard!");
                    })
                    .catch(err => {
                      console.error('Failed to copy text: ', err);
                    });
                } else {
                  // Clipboard API를 지원하지 않는 경우, fallback 방법 사용
                  let dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = citationText;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!");
                }
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
            </h5>
            <div className="gitIcons">
              <a href="https://arxiv.org/pdf/2408.11829" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://arxiv.org/abs/2408.11829" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="websitesContainer">
        {paper14}
        {paper13}
        {paper11}
        {paper12}
        {paper10}
        {paper9}
        {paper6}
        {paper5}
        {paper4}
        {paper3}
        {paper2}
        {paper1}
        {paper7}
        {paper8}
        {paper0}
      </div>
    )
  }

  return (
    <section id="papers" className="animated bounceInDown">
        {sectionTitle()}
        {drawWebsites()}
    </section>
  );
}
  
export default Papers;