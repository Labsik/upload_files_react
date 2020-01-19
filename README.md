# upload_files_react

How to run app:

npm install 

cd upload-app
npm install 

cd ..

npm run dev



TEST TASK:

1. Create empty public git repository.
2. Initialize it with master branch
3. Create dev branch
4. Create Vue/ReactJS app
5. Develop features from ‘App features’ list
6. Push app to dev


   App features:


1. There is a single button ‘Upload files’
2. After User clicks this button, he can select multiple files
3. There must be a validation - files must not be bigger than 1mb. If it’s an image it must be only png or jpg. There must be a warning if file is too big.
After selection we can see files list in the following format:
   1. Filename | file extension | filesize | X 
(where X is cancellation of this particular file upload)
   2. Filename | file extension ...
   [SUBMIT] button

4. Submit button should post files via AJAX request as multipart/form-data  to route BASE_URL/upload
5. Commit and push to develop.


Estimate: 3-4 hours. 
