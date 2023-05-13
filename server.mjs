import { createServer } from 'node:http';
import { serve, send } from 'micro';

import getGenFunction, { _404 } from './pugrouter.mjs';
import { URLSearchParams } from 'node:url';
import { parse as parseCookie } from 'cookie'; // https://www.npmjs.com/package/cookie
import DB from './mydb.mjs';


const
  port = 3333,
  server = createServer(serve(async (request, response) => {
    console.log((new Date()).toLocaleTimeString(), request.method, request.url, 'HTTP/' + request.httpVersion);
    let allPosts = await DB.getAllPosts();
      
    const
      genFunction = getGenFunction(request),
      postData = 'POST' === request.method ? await getAndParsePostBody(request) : null,
      cookies = parseCookie(request.headers.cookie || ''),
      user = await getUser(cookies, postData, response, allPosts);

    // console.log(allPosts);

    // await addNewPost();
    allPosts = await DB.getAllPosts();
    if (genFunction) return genFunction({ user, allPosts });

    send(response, 404, _404);
  }));
server.listen(port, () => console.log('server start at http://localhost:' + port));

async function getAndParsePostBody(request) {
  // обработка POST запроса  сложнее чем GET, необходимо асинхронно работать с nodejs Stream см. https://habr.com/ru/post/479048/
  // суть в том что request это экземпляр класса http.ClientRequest см https://nodejs.org/api/http.html#http_class_http_clientrequest
  // который, в свою очередь наследован от Readable Stream см https://nodejs.org/api/stream.html#stream_stream
  // пример из документации: https://nodejs.org/api/stream.html#stream_api_for_stream_consumers
  // еще пример: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
  request.setEncoding('utf8'); // Get the data as utf8 strings. If an encoding is not set, Buffer objects will be received.    
  const body = await new Promise(resolve => {
    let buff = '';
    request
      .on('data', chunk => buff += chunk)
      .on('end', () => resolve(buff));
  });
  return new URLSearchParams(body); //  🌟 применили интерфейс URLSearchParams() для POST form data
}

async function getUser(cookies, searchParams, response, allPosts) { // получаем пользователя по cookies и данным html-формы
  let userId = null; // главное в этой функции
  if (Object.keys(cookies).length > 0) console.log('\t cookies: ', cookies);

  // ✔ ЧИТАЕМ cookies
  if (cookies.uid) { // проверим не залогинен ли уже пользователь?
    const testUserId = await DB.getUserByCookie(cookies.uid);
    if (testUserId) {
      userId = testUserId;
      console.log(`\t клиент предъявил валидный cookie uid, id = ${userId}`);
    }
  }
  // ✔ ОБРАБОТЧИК ФОРМ !!! 
  if (searchParams) {
    console.log(`\t form data: ${searchParams}`);
    const
      username = searchParams.get('username'),
      psw = searchParams.get('psw'),

      title = searchParams.get('title'),
      body = searchParams.get('body'),

      [id, secret] = await DB.loginUser(username, psw);

    if ('registration' === searchParams.get('action')) {
      const newusername = searchParams.get('newusername');
      const realname = searchParams.get('realname');
      const newpsw = searchParams.get('newpsw');
      await DB.addNewUser(newusername, realname, newpsw);
    }

    if ('addpost' === searchParams.get('action')) {
      let nextPostNumber = allPosts.length + 1;
      const userId = await DB.getUserByCookie(cookies.uid);
      if (title && body) {
        await DB.addNewPost(userId, nextPostNumber, title, body);

      }
    }

    // console.log('if',username ,psw , id , secret);
    if (username && psw && id && secret) {
      userId = id,
        response.setHeader('Set-Cookie', `uid=${secret}`);
      // responseHeaders['Set-Cookie'] = [`uid=${UID}`];  // ✔ УСТАНАВЛИВАЕМ клиенту cookie
      console.log(`\t login! id = ${userId}`);
    }
    if ('logout' === searchParams.get('action')) {  // если пожелаешь мы тебя разлогиним
      console.log(`\t logout! id=${userId}`);
      await DB.delOnlineUser(cookies.uid);
      userId = null;
      response.setHeader('Set-Cookie', `uid=${cookies.uid};Max-Age=0`);
      // responseHeaders['Set-Cookie'] = ['uid=;Max-Age=0']; // ✔ УДАЛЯЕМ cookie у клиента
    }
  }
  if (userId) return await DB.getUserData(userId);
  return null;
}