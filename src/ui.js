class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add'; //default state
    }


    //show posts
    showPosts(posts){
        let output = ``;

        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                  <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                    </div>
                </div>
            `;
        });

        this.post.innerHTML = output;
    }

    //display alert message
    showAlert(message, className) {
        this.clearAlert();

        //create fdiv
        const div = document.createElement('div');
        //add class
        div.className = className;

        //add text
        div.appendChild(document.createTextNode(message));
        
        //get parent
        const container = document.querySelector('.postsContainer');
        
        //Get posts
        const posts = document.querySelector('#posts');

        //insert alert
        container.insertBefore(div, posts);

        //timout
        setTimeout(()=>{
            this.clearAlert();
        }, 3000);
    }

    //clear alert messages
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        
        if(currentAlert) {
            currentAlert.remove();
        }
    }

    //clear input fields
    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
        this.idInput.value = '';
    }

    //fill form for edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        //change form state
        this.changeFormState('edit');
    }

    //changes form state
    changeFormState(type){
        if(type === 'edit') {
            this.postSubmit.textContent = 'Update post';
            this.postSubmit.className = 'btn btn-warning btn-block';
            
            //create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel edit'));

            //get parent for button insertion
            const cardForm = document.querySelector('.card-form');
            //get element to insert before
            const formEnd = document.querySelector('.form-end');

            //insert cancel button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Submit';
            this.postSubmit.className = 'btn btn-primary btn-block';

            //remove cancel button if there
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // //clear id from hidden field
            // this.clearIdField();

            //clear fields
            this.clearFields();
            
        }
    }
}

export const ui = new UI();