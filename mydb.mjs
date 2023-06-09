import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv'

dotenv.config();
// console.log(process.env.S3_BUCKET);
// console.log(process.env.SECRET_KEY);


const
  salt = 'mySuper%SecretSalt!*&^%$#', // TODO move to .env-file 
  // connection = await createConnection('mysql://user:111@192.168.100.4/myforum'),
  connection = await createConnection('mysql://user:111@localhost/myforum'),
  // connection = await createConnection(`mysql://golddragon:${process.env.DB_PASS}@${process.env.DB_HOST}/myforum`),

  testUserQ = await connection.prepare(`
    SELECT id 
    FROM users   
    WHERE login = ? AND psw =  PASSWORD(CONCAT('${salt}',?))`),

  getUserDataQ = await connection.prepare(`
  SELECT id, login, realname 
  FROM users
  WHERE id = ?`),

  newSessionQ = await connection.prepare(`
  INSERT INTO sessions (userId,secret) values(?,?)`),

  getSessionUserIdQ = await connection.prepare(`
    SELECT users.id 
    FROM sessions JOIN users ON users.id = sessions.userId 
    WHERE secret = ? `),

  deleteSessionQ = await connection.prepare('DELETE from sessions where secret=?'),

  getAllPostsQ = await connection.prepare(`
    SELECT posts.id, posts.title, posts.body, posts.time, users.realname  
    FROM posts 
    JOIN users ON users.id = posts.userId
    ORDER by posts.time`),

  newPostQ = await connection.prepare(`
    INSERT INTO posts (title,body,userId) values(?,?,?)`),

  addNewUserQ = await connection.prepare(`
  INSERT INTO myforum.users (login, psw, realname) VALUES (?,PASSWORD(CONCAT('${salt}',?)),?)`),

  DB = {
    async delOnlineUser(uid = null) { await deleteSessionQ.execute([uid]); },

    async getUserByCookie(secret) {
      const [users] = await getSessionUserIdQ.execute([secret]);
      // console.log('getUserByCookie',users);
      return users?.[0]?.id;
    },

    async getUserData(id) {
      const [users] = await getUserDataQ.execute([id]);
      return users?.[0];

    },

    async loginUser(login, pass) {
      const [users] = await testUserQ.execute([login, pass]);
      if (login && pass && 1 === users.length) {
        const
          [user] = users,
          secret = this.newUID();
        // console.log('loginUser',user.id,secret);
        await newSessionQ.execute([user.id, secret]);
        return [user.id, secret];
      }
      return [null, null];
    },

    newUID() { return '' + Math.random(); },

    async getAllPosts() {
      console.log('\t🐌 getAllPosts');
      const [posts] = await getAllPostsQ.execute();
      return posts;
    },

    /**
    * @param args {[title:string, body:string, userId:number]}
    */
    async newPost(...args) {
      // console.log(args);
      await newPostQ.execute(args);
    },

    /**
    * @param argsNewUser {[newusername:string, newpsw:number, realname:string]}
    */
    async addNewUser(...argsNewUser) {
      await addNewUserQ.execute([...argsNewUser]);
    },
  };

export default DB;