# Imgur API Upload and Load

## References
* [Imgur API：upload, load 上傳、讀取 心得筆記](https://auguston.github.io/imgur-api-upload-load/index.html)
* [How to use curl with exec nodejs](https://stackoverflow.com/questions/27189849/how-to-use-curl-with-exec-nodejs)

## Development
```cmd
npm i
npm run dev 
```

## Heroku
1. Commit
```
git add -A
git commit -m "Upload to Heroku"
```
2. Upload to Heroku  
```cmd
heroku apps:create
git push -u heroku
```
3. Set Heroku config environment variables
```cmd
heroku cofig:set ALBUM=${ALBUM} TOKEN=${TOKEN}
```