# 트러블슈팅

## 요청을 받을 때 쿠키를 확인하지 못하는 현상

Express에서 클라이언트가 쿠키와 함께 요청을 보낼 때, 서버에서 쿠키를 읽기 위해서는 req.cookies에 접근하면 된다.

```js
export const getAdmin = (req, res) => {
    console.log(req.cookies);
    // ...
};
```

해당 동작을 위해서는 먼저 쿠키 파서를 미들웨어로 추가해야 한다. 

Express에서는 cookie-parser 라이브러리를 사용하여 요청의 쿠키를 파싱할 수 있다.

### 1. cookie-parser 설치
```shell
npm install cookie-parser
```

### 2. Express 앱에 cookie-parser 미들웨어 추가
```js
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// 쿠키 파서 미들웨어 추가
app.use(cookieParser());
```