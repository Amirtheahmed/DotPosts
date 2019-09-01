import { ihttp } from './ihttp';
import { ui } from './ui';

//Get posts on dom load
document.addEventListener("DOMContentLoaded", getPosts);

//listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

//listen for cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

//listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//get posts from api and show them on list
function getPosts(){
  ihttp.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(error => console.log(error));
}

//submit post
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  //validate input
  if(title === '' || body === '') {
    ui.showAlert("Please fill all the fields", "alert alert-danger");
  }
  else{

    const data = {
      body,
      title
    }

    if(id === '') {
        //Create post
        ihttp.post("http://localhost:3000/posts", data)
        .then(dat => {
          getPosts();
          //show success message
          ui.showAlert("Post Saved", "alert alert-success");
          //clear input fields
          ui.clearFields();
        })
        .catch(error => console.log(error));
    } 
    else {
        //Update post
        ihttp.put(`http://localhost:3000/posts/${id}`, data)
        .then(dat => {
          //show success message
          ui.showAlert("Post Updated", "alert alert-success");
          //change form state
          ui.changeFormState();
          //re display posts
          getPosts();
        })
        .catch(error => console.log(error));
    }
   
  }

}

//enable edit state
function enableEdit(e) {

  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    //fill current form with data for edit
    ui.fillForm(data);

  }
  e.preventDefault();
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}
