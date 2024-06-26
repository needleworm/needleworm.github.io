import React from 'react';
import './lectures.css';


function Media() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Media</h2>
        </div>
      </div>
    )
  }

  const drawLectures = () => {
    let youtube = <i className="fab fa-youtube"></i>
    
    let media1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/fuwZmgKenqs" title="1" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>고무통으로 벼 자동 재배 농장(스마트팜) 만들기... IQ 만점 공대생이 도와주러옴</h5><br/>
            <p className="bookDescription">
              스파트팜의 대가 상상텃밭 CTO의 자동화 농사법 A to Z 강의! 왜 보는지 모르겠는데 빠져들게 됨...
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=fuwZmgKenqs" target="_blank"  rel="noreferrer">
              {youtube} EP 1
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.youtube.com/watch?v=fzp2fg6CekM" target="_blank"  rel="noreferrer">
              {youtube} Cookie 1
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.youtube.com/watch?v=Ni6Q1sENdmI" target="_blank"  rel="noreferrer">
              {youtube} Cookie 2
            </a>
          </div>
        </div>
      </div>
    </div>

    let media2 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/VJpjk8j6zTM" title="2" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>안동에서는 대마가 합법? 대마 농장 운영 중인 사람 직접 만나고 옴</h5><br/>
            <p className="bookDescription">
            대마를 심거나 키우는 건 마약류 관리법에 의해 우리나라 전 국토에서 불법입니다. 하지만 딱 한 군데 예외가 있습니다. 바로 경상북도 안동시입니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=VJpjk8j6zTM" target="_blank"  rel="noreferrer">
              {youtube} 스브스뉴스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media3 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/s0skJO5TfAk" title="3" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>★파워 으쓱★ 여러모로 능력 넘치는 카이스트 출신의 대마 농부 [무엇이든 물어보살]</h5><br/>
            <p className="bookDescription">
            미모의 교사 여자친구가 푹~ 빠진 카이스트 출신 농부! 합법 대마 농장주와 알아보는 대마의 모든 것
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=s0skJO5TfAk" target="_blank"  rel="noreferrer">
              {youtube} KBS N
            </a>
          </div>
        </div>
      </div>
    </div>

    let media4 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/_-ugbwhhApI" title="4" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>카이스트 출신 대학원생이 공익이 되면 일어나는 일?! (feat. 코딩) / 스브스뉴스</h5><br/>
            <p className="bookDescription">
            6개월을 해야 겨우 끝낼 수 있는 엄청난 양의 단순 반복 업무를 받는다면 어떨까요? 상상도 하기 싫은 그런 상황. 고용노동부 안동지청에서 사회복무요원(aka.공익)으로 복무하는 반병현 씨에게 얼마 전 닥쳤던 일입니다. 하지만 그는 카이스트에서 인공지능으로 석사 학위를 받은 능력자였습니다. 그 일을 30분 만에 끝내버렸죠. 이런 이야기를 그는 블로그에 올렸습니다. 그런데 그 글 때문에 병현 씨에게 상상도 못 했던 일이 일어나는데요. 무슨 일이 있었던 걸까요?
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=_-ugbwhhApI" target="_blank"  rel="noreferrer">
              {youtube} 스브스뉴스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media5 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/16hsA3CyM7M" title="5" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>6개월 걸릴 일을 하루 만에 처리한 공익 인터뷰 해주세요</h5><br/>
            <p className="bookDescription">
            한 1년 반쯤 전에 한 공익이 놀라운 일처리 능력을 보여서 청와대까지 불려갔던 적이 있었다. 주인공은 고용노동부 안동지청에서 근무하던 반병현씨. 그는 상사로부터 “3900개가 넘는 등기우편의 13자리 등기번호를 우체국 홈페이지에 일일이 입력한 뒤 전부 인쇄하라”는 업무 지시를 받았는데, 이 단순 반복 작업을 끝내려면 최소 6개월이 필요했지만 병현씨가 이걸 끝내는데 걸린 시간은 단 하루! 카이스트에서 인공지능으로 석사 학위를 받은 공학도 병현씨는 본인이 직접 자동화 소프트웨어를 개발해 업무 시간을 획기적으로 단축시켜 버린 거다. 당시 병현씨는 ‘대한민국을 바꾼 공익’ ‘코딩하는 공익’ 등으로 불리며 화제가 됐었는데, 그 분의 근황을 취재해 달라는 의뢰가 들어와 수소문 끝에 연락이 닿았다. 최근에 소집해제가 됐다는데 요즘 어떻게 지내는지 여쭤봤더니 이 사람 진짜 혀를 내두르게 만들러어러버러러러러러럴룰ㄹㄹ럴라럴(ㄹㅇ 혀내두름)
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=16hsA3CyM7M" target="_blank"  rel="noreferrer">
              {youtube} 취재대행소 왱
            </a>
          </div>
        </div>
      </div>
    </div>

    let media6 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/km083tSB5DA" title="6" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>인공지능은 정말 인간에게 위협적인 존재일까? 인간은 인공지능을 어떻게 활용하면 좋을까?</h5><br/>
            <p className="bookDescription">
            인공지능을 알고리즘과 자율주행, 알파고 정도로만 알고있었다면? 이 영상을 꼭 확인해보세요! 인공지능의 발전 현황, 활용 범위부터 전문가가 아닌 일반인도 어떻게 활용할 수 있을지 정리해보았습니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=km083tSB5DA" target="_blank"  rel="noreferrer">
              {youtube} 패스트캠퍼스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media7 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/media/media7.png" alt="thumbnail"/>
        <div className="projectText">
          <h5>[뉴스토리] 마약이냐 치료제냐…두 얼굴의 대마 / SBS</h5><br/>
            <p className="bookDescription">
            재벌가와 고위층 자제들의 대마초 사건에 이어 배우 유아인까지 대마초 논란에 휘말렸습니다. 사실 태국과 미국의 일부 주, 캐나다까지 대마에 대한 규제를 풀었습니다. 최근에는 의약품 원료로 고부가가치 사업으로까지 부각되고 있습니다. 그래서일까요? 대마초 논란이 빈발하고 해외에서 밀반입되는 대마도 늘고 있습니다. 위험성을 간과하기 쉽지만 전문가들은 대마초가 필로폰이나 코카인 등으로 이어지는 마약 중독의 ‘관문역’을 한다고 경고합니다. 이번주 뉴스토리는 마약과 의약품의 양면성을 가진 대마를 집중 취재했습니다. 
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=ZZ-hkWyVooI" target="_blank"  rel="noreferrer">
              {youtube} SBS 뉴스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media8 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/SC1OfEdxZiM" title="8" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>두 달만에 사용자 1억명...챗GPT, 넌 정체가 뭐니?(반병현 작가 1부)</h5><br/>
            <p className="bookDescription">
              국립중앙과학관과 함께한 챗GPT 특강 시리즈의 첫 번째 영상입니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=SC1OfEdxZiM" target="_blank"  rel="noreferrer">
              {youtube} 국립중앙과학관
            </a>
          </div>
        </div>
      </div>
    </div>

    let media9 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/Z8Y6aqlq8DM" title="9" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>[안될메보] Chat GPT가 가끔 소설을 쓰는 이유 (feat. 반병현 CTO)</h5><br/>
            <p className="bookDescription">
              반병현 CTO는 노래를 부르기 매우 좋아하는 사람으로, 본 채널과 관련 있는 사람입니다
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=Z8Y6aqlq8DM" target="_blank"  rel="noreferrer">
              {youtube} 의학발성 메디컬보이스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media10 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/kpvWDHRxtWc" title="10" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>챗GPT 활용, 벌써 이만큼까지 왔다고?(반병현 작가 2부)</h5><br/>
            <p className="bookDescription">
              국립중앙과학관과 함께한 챗GPT 특강 시리즈의 두 번째 영상입니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=kpvWDHRxtWc" target="_blank"  rel="noreferrer">
              {youtube} 국립중앙과학관
            </a>
          </div>
        </div>
      </div>
    </div>
    
    let producing1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/Bc7MjNjt0FY" title="pd1" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>아이돌 덕질하다가 CG 디자이너 된 사람 ㅋㅋㅋ 정규민 아티스트의 포토샵 라이브 아트워크 쇼</h5><br/>
            <p className="bookDescription">
            제가 프로듀싱한 영상입니다
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=Bc7MjNjt0FY" target="_blank"  rel="noreferrer">
              {youtube}
            </a>
          </div>
        </div>
      </div>
    </div>

    let media11 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/PqrInCQiHEU" title="11" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>Future with ChatGPT </h5><br/>
            <p className="bookDescription">
              신간 "챗GPT, 마침내 찾아온 특이점" 저자 상상텃밭 CTO 반병현 님 인터뷰
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=PqrInCQiHEU" target="_blank"  rel="noreferrer">
              {youtube} Jane Kim
            </a>
          </div>
        </div>
      </div>
    </div>

    let media12 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/iTmhi7LYtvI" title="12" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>챗GPT 인공지능 시대, 앞서가기 위해 필요한 능력은?(반병현 작가 3부)</h5><br/>
            <p className="bookDescription">
              국립중앙과학관과 함께한 챗GPT 특강 시리즈의 세 번째 영상입니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=iTmhi7LYtvI" target="_blank"  rel="noreferrer">
              {youtube} 국립중앙과학관
            </a>
          </div>
        </div>
      </div>
    </div>

    let media13 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/yh6lx62yHTs" title="12" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>[강의 미리보기] 최초/최신 강의! ChatGPT를 활용한 영어 학습</h5><br/>
            <p className="bookDescription">
            나만의 영어 선생님이 되는 ChatGPT! ChatGPT 하나로 영어 마스터 하는 법 알려드립니다. 
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=yh6lx62yHTs" target="_blank"  rel="noreferrer">
              {youtube} 패스트캠퍼스
            </a>
          </div>
        </div>
      </div>
    </div>

    let media14 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/Ot3V2Z17EGo" title="12" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>육각형게임</h5><br/>
            <p className="bookDescription">
              110만 유튜버 <strong>긱블</strong>에서 주최한 대규모 웹예능, <strong>육각형게임</strong>에 출연했습니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=Ot3V2Z17EGo" target="_blank"  rel="noreferrer">
              {youtube} 예고편
            </a>
          </div>
        </div>
      </div>
    </div>
    
    
    return (
      <div className="websitesContainer">
        {media14}
        {media13}
        {media12}
        {media11}
        {media10}
        {media9}
        {media8}
        {producing1}
        {media7}
        {media6}
        {media1}
        {media5}
        {media2}
        {media3}
        {media4}
      </div>
    )
  }

  return (
      <section id="media" className="animated bounceInDown">{sectionTitle()}{drawLectures()}
    </section>
  );
}
  
export default Media;