import React, {Component} from 'react';
import './books.css';


class Books extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  drawBooks(){
    var bookSection1 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/1.jpg" alt="book1" className="bookCoverImage"/>
      <h5><a href="https://needleworm.github.io/bhban_rpa" target="_blank"  rel="noreferrer">
          6개월 치 업무를 하루 만에 끝내는 업무자동화 <i className="fas fa-external-link-alt"></i>
        </a>
        </h5>
      <p className="bookDescription">2020.12. 생능출판사</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970504745&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkclassName=&barcode=9788970504742" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=17665326" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/96360166" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>

    var bookSection2 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/2.jpg" alt="book2" className="bookCoverImage"/>
      <h5>공학자의 오경묵상</h5>
      <p className="bookDescription">2020.11. BOOKK(부크크)</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K112735243&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://pod.kyobobook.co.kr/podBook/podBookDetailView.ink?ejkGb=KOR&barcode=1400000403693" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=17469780" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/95590656" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection3 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/3.jpg" alt="book3" className="bookCoverImage"/>
      <h5>공학자의 지혜묵상</h5>
      <p className="bookDescription">2020.05. BOOKK(부크크)</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K452639642&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://pod.kyobobook.co.kr/podBook/podBookDetailView.ink?ejkGb=KOR&barcode=1400000378984" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=16369629" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/90392271" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection4 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/4.jpg" alt="book4" className="bookCoverImage"/>
      <h5>나는 아직 잊힐 준비가 되지 않았어요</h5>
      <p className="bookDescription">2020.08. BOOKK(부크크)</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K622632023&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://pod.kyobobook.co.kr/podBook/podBookDetailView.ink?ejkGb=KOR&barcode=1400000388044" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=16629718" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/92154589" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection5 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/5.jpg" alt="book5" className="bookCoverImage"/>
      <h5>법대로 합시다</h5>
      <p className="bookDescription">2016.02. 지식과감성#</p>
      <ul className="list-inline">
        <li><a href="http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?LINK=NVE&category=001&barcode=4801159610081" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=10236421" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/30660689" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection6 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/6.jpg" alt="book6" className="bookCoverImage"/>
      <h5>실전 민사소송법</h5>
      <p className="bookDescription">2020.05. BOOKK(부크크)</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K572639625&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://pod.kyobobook.co.kr/podBook/podBookDetailView.ink?ejkGb=KOR&barcode=1400000377208" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=16357665" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/90250538" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>

    var bookSection7 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/7.jpg" alt="book7" className="bookCoverImage"/>
      <h5>코딩하는 공익</h5>
      <p className="bookDescription">2020.04. 세창출판사</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8955866119&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkclassName=&barcode=9788955866117" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=16340073" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/90081924" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection8 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/8.jpg" alt="book8" className="bookCoverImage"/>
      <h5><a href="https://needleworm.github.io/bhban_ai" target="_blank"  rel="noreferrer">
        쉬운 딥러닝 <i className="fas fa-external-link-alt"></i>
        </a>
        </h5>
      <p className="bookDescription">2021.04. 생능출판사</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=269891239" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788970504872&orderClick=LAG&Kc=" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=19007726" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/99552196" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>

    var bookSection9 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/9.jpg" alt="book9" className="bookCoverImage"/>
      <h5><a href="https://needleworm.github.io/financebook" target="_blank"  rel="noreferrer">
          내 자산 자동으로 관리하기 <i className="fas fa-external-link-alt"></i>
        </a>
        </h5>
      <p className="bookDescription">2021.07. 생능출판사</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970504745&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkclassName=&barcode=9788970504742" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=17665326" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/96360166" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>
    
    var bookSection10 = <div className="singleBookContainer">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/10.jpg" alt="book10" className="bookCoverImage"/>
      <h5><a href="https://needleworm.github.io/101" target="_blank"  rel="noreferrer">
          101가지 컴퓨터 활용팁 <i className="fas fa-external-link-alt"></i>
        </a>
        </h5>
      <p className="bookDescription">2021.07. 생능출판사</p>
      <ul className="list-inline">
        <li><a href="https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970504745&start=pnaver_02" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/aladdin.png" className="bookStoreIcon" alt="aladin"/></a></li>
        <li><a href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkclassName=&barcode=9788970504742" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/kyobo.png" className="bookStoreIcon" alt="kyobo"/></a></li>
        <li><a href="https://book.naver.com/bookdb/book_detail.nhn?bid=17665326" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/naver.png" className="bookStoreIcon" alt="naver"/></a></li>
        <li><a href="http://www.yes24.com/Product/Goods/102593399" target="_blank"  rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/stores/yes24.png" className="bookStoreIcon" alt="yes24"/></a></li>
      </ul>
    </div>

    return(
      <div className="bookContainer">
        {bookSection10}
        {bookSection9}
        {bookSection8}
        {bookSection1}
        {bookSection7}
        {bookSection3}
        {bookSection2}
        {bookSection6}
        {bookSection4}
        {bookSection5}
      </div>
    )
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Books</h2>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section id="books" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawBooks()}
      </section>
    );
  }
}
  
export default Books;