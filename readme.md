## Source
   git clone https://github.com/gemeni80it/gcp-app-engine.git
## Deploy/Run
 ### root directory : 
    adrianmarin_se@cloudshell:~ (hale-post-251906)$ unzip backend.zip -d backend

 ## cd backend/
    npm i

 ####  run cloud shell
    gcloud beta functions deploy backend --trigger-http  --runtime=nodejs8

 ### back to root
    adrianmarin_se@cloudshell:~/backend (hale-post-251906)$ cd ..

### Deploy 
   npm run deploy

## Extra 
   git add .
   git commit -am "Init"
   git push -u origin master