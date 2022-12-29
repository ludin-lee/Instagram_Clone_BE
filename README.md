# Instagram_Clone_BE 프로젝트 소개
인스타그램 웹 버전을 클론하여 회원가입, 로그인, 게시글, 댓글, 좋아요 CRUD를 구현했습니다.

# 기술 스택
* express
* aws s3
* multer
* jsonwebtoken
* bcrypt
* sequelize
* mysql2
* nodemon
* winston
* morgan
* helmet
* cors
* https
* prettier
* nodemon

# api 설계 및 프로젝트 기획 링크 
[5조 노션링크](https://www.notion.so/subinbaek/5-SA-936a956e52ce4e918c568ce0e0e50e2e)

# ERD 
![Screen Shot 2022-12-29 at 11 37 30 AM](https://user-images.githubusercontent.com/116314838/209896071-81686aa1-62c9-4cd3-a72d-31d0f313307f.png)

# 트러블 슈팅 
- 로그인 상태 유지 및 쿠키 보안 취약점 해결
    
    요구사항:페이지 리로딩시 로그인 상태 유지
    
    원인: 페이지 새로고침 되면 토큰이 유실 됨 
    
    해결 방안(선택지):
    
    1. 세션, 리프레시 토큰 사용 로그인 무한 연장하기 
    2. 토큰을 쿠기에 저장
    
    의견조율:
    
    이미 로그인 구현 방식을 프런트, 백 모두 진행된 상황이라 새롭게 리프레시토큰 적용하기 비효율적이다고 판단함
    
    이번 프로젝트의 목표는 모든 기능구현을 완벽하게 중간에 로직을 변경하면 리스크가 있어서 2번 방법을 채택함. 
    
    해결방법:
    
    클라이언트에서 토큰을 쿠키에 저장하고 페이지를 새로고침 할때 서버로 로그인한 유저의 userId로 토큰 정보를 확인 요청한다. 
    
    백엔드에서는 새로고침 axios요청이 들어올때마다 토큰을 체크하는 api를 만들어 준다. 
    
    토큰이 인증되면 전달 받은 유저정보로 header 에 닉네임, 프로필 이미지를 보여준다.
    
    쿠키로 토큰을 저장하면 모든 요청마다 쿠키가 남아있어 편리하긴 하지만 해커의 XXS 공격에 쉽게 노출 될 수 있다. 쿠키의 보안 취약점을 해결하고자 쿠키세팅시 httpyonly를 적용하고 서버에도 helmet라이브러리를 설치했다. 
    
    - [https://velog.io/@alang/XSS-공격과-쿠키의-HttpOnly](https://velog.io/@alang/XSS-%EA%B3%B5%EA%B2%A9%EA%B3%BC-%EC%BF%A0%ED%82%A4%EC%9D%98-HttpOnly)
- HTTPS 에서 서버와 클라이언트 통신
    
    요구사항: api 서버 https 배포  
    
    원인: 프런트엔드 배포시 Vercel 사용. api 호출시 자동으로 https로 리다이렉트 되면 서버와 통신 오류 발생. 현재 서버는 http로만 사용 가능 
    
    해결 방안 (선택지)
    
    1. 프런트엔드에서 다른 배포 방법을 택한다
    2. 백엔드에서 https 포트도 연결하고, http, https모두 연결될수 있도록 코드 수정한다
    
    의견조율:
    
    현재 보안상의 이유로 https를 사용하는 트렌드가 있기 때문에 2번 방법 채택 
    
    해결 방법: 
    
    https 인증에 필요한 인증서를 설치한다
    
    도메인을 연결한다 
    
    https 443 포트와 4433포트를 연결한다 
    
    - [https://ludin-rich.tistory.com/99](https://ludin-rich.tistory.com/99)
- ORM vs raw query
    
    요구사항: 게시글 전체보기에 댓글카운트와 댓글목록을 불러와야 한다. 
    
    문제/원인: Sequelize 로 view table 생성하려면 migration을 사용해야하는데 현재 프로젝트에서는 migration을 사용하지 않는다
    
    해결 방법:
    
    view table 이 필요한 게시글 전체 조회쪽 코드에서만 ORM과 로쿼리를 혼합해서 사용한다
