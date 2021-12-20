import React, {Component} from 'react';
import './papers.css';



class Papers extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Papers</h2>
        </div>
      </div>
    )
  }

  drawWebsites(){
    var gitLogo = <i className="fab fa-github"></i>

    var paper1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2017_01.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>Control of nonlinear, complex and black-boxed greenhouse system with reinforcement learning</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2017_01.pdf" target="_blank"  rel="noreferrer" download>
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
    
    var paper2 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2019_01.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>ODE Network Model for Nonlinear and Complex Agricultural Nutrient Solution System</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2019_01.pdf" target="_blank"  rel="noreferrer" download>
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

    var paper3 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2019_02.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>Machine Learning Approach to Remove Ion Interference Effect in Agricultural Nutrient Solutions</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2019_02.pdf" target="_blank"  rel="noreferrer" download>
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

    var paper4 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2020_01.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>Nutrient Solution Management System for Smart Farms and Plant Factory</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2020_01.pdf" target="_blank"  rel="noreferrer" download>
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

    var paper5 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2020_02.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>Deep learning method to remove chemical, kinetic and electric artifacts on ISEs</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2020_02.pdf" target="_blank"  rel="noreferrer" download>
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

    var paper6 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2020_03.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>Mathematical Model and Simulation for Nutrient-Plant Interaction Analysis</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2020_03.pdf" target="_blank"  rel="noreferrer" download>
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

    var paper7 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/ICTC2017_02.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>GAN-D: Generative adversarial networks for image deconvolution</h5></p>
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
                  var dummy = document.createElement("textarea");
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
              <a href="https://github.com/needleworm/mlproject" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/ICTC2017_02.pdf" target="_blank"  rel="noreferrer" download>
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
    
    var paper8 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/BMC_SB_2018.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>The phenotype control kernel of a biomolecular regulatory network</h5></p>
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
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Choo, SM., Ban, B., Joo, J.I. et al. The phenotype control kernel of a biomolecular regulatory network. BMC Syst Biol 12, 49 (2018). https://doi.org/10.1186/s12918-018-0576-8'
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
              <a href="https://github.com/needleworm/nc2" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/BMC_SB_2018.pdf" target="_blank"  rel="noreferrer" download>
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
    
    var paper9 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/papers/2021_nlp.png" alt="projectimage"/>
      <div className="projectText">
        <p><h5>A Survey on Awesome Korean NLP Datasets</h5></p>
          <p className="bookDescription">
            <strong>Byunghyun Ban</strong>(2021)<br/>
            Preprints
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
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Ban, Byunghyun. "A Survey on Awesome Korean NLP Datasets." arXiv preprint arXiv:2112.01624 (2021).'
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
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/paperPdf/2021_nlp.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://www.preprints.org/manuscript/202110.0247/v1" target="_blank"  rel="noreferrer">
                Preprints.org
                <i className="fas fa-external-link-alt"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://arxiv.org/abs/2112.01624" target="_blank"  rel="noreferrer">
                arXiv
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="websitesContainer">
        {paper9}
        {paper6}
        {paper5}
        {paper4}
        {paper3}
        {paper2}
        {paper1}
        {paper7}
        {paper8}
      </div>
    )
  }

  render() {
    return (
      <section id="papers" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawWebsites()}
      </section>
    );
  }
}
  
export default Papers;