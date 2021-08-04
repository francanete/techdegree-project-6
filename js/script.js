/**   Global Variables   **/

const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


function showPage(list, page) {
   // create two variables which will represent the index for the first and last student on the page
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

  // select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('ul.student-list');

  // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = '';

   // loop over the length of the `list` parameter
      // inside the loop create a conditional to display the proper students
         // inside the conditional:
         // create the elements needed to display the student information
         // insert the above elements


   for (let i = 0; i < list.length; i++){
      if ( i >= startIndex && i < endIndex ) {
         const li = document.createElement('li');
         li.className = 'student-item cf';

         studentList.insertAdjacentElement('beforeend', li);

         const divStudentDetails = document.createElement('div');
         divStudentDetails.className = 'student-details';
         li.insertAdjacentElement('beforeend', divStudentDetails);

         const img = document.createElement('img');
         img.className = 'avatar';
         img.src = data[i].picture.medium;
         divStudentDetails.insertAdjacentElement('beforeend', img);

         const name = document.createElement('h3');
         name.textContent = `${data[i].name.first} ${data[i].name.last}`;
         divStudentDetails.insertAdjacentElement('beforeend', name);

         const email = document.createElement('span');
         email.className = 'email';
         email.textContent = data[i].email;
         divStudentDetails.insertAdjacentElement('beforeend', email);

         const divJoinedDetails = document.createElement('div');
         divJoinedDetails.className = 'joined-details';
         li.insertAdjacentElement('beforeend', divJoinedDetails);

         const dateJoined = document.createElement('span');
         dateJoined.className = 'date';
         dateJoined.textContent = `Joined ${data[i].registered.date}`;
         divJoinedDetails.insertAdjacentElement('beforeend', dateJoined);

      }
   }
   searchPage()
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil((list.length / itemsPerPage ));

   // select the element with a class of `link-list` and assign it to a variable

   const linkList = document.querySelector('.link-list');

   // set the innerHTML property of the variable you just created to an empty string

   linkList.innerHTML = '';


   // loop over the number of pages needed
      // create the elements needed to display the pagination button
      // insert the above elements


   for (let i = 1; i <= numOfPages; i++) {
      const buttonLi = document.createElement('li');
      linkList.insertAdjacentElement('beforeend', buttonLi);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${[i]}`;
      buttonLi.insertAdjacentElement('beforeend', button);
   }

    // give the first pagination button a class of "active"

    const firstBtn = document.querySelector('BUTTON')
    firstBtn.className = 'active';

    // create an event listener on the `link-list` element
      // if the click target is a button:
         // remove the "active" class from the previous button
         // add the active class to the clicked button
         // call the showPage function passing the `list` parameter and page to display as arguments

   linkList.addEventListener('click', (e) => {
      if ( e.target.tagName === 'BUTTON' ) {
         activeBtn = document.querySelector('.active');
         activeBtn.className = '';
         e.target.className = 'active';
         showPage(data, e.target.textContent);
      }
   });
}


/**  Search Feature  **/

function searchPage() {
   const header = document.querySelector('.header');
   const label = document.createElement('label');
   label.htmlFor = 'search';
   label.className = 'student-search';
   header.insertAdjacentElement('beforeend', label);

   const span = document.createElement('span');
   span.textContent = 'Search by name';
   label.insertAdjacentElement('beforeend', span);

   const input = document.createElement('input');
   input.id = 'search';
   input.placeholder = 'Search by name...';
   label.insertAdjacentElement('beforeend', input);

   const button = document.createElement('button');
   button.type = 'button';
   label.insertAdjacentElement('beforeend', button);
   button.innerHTML = '<img src="img/icn-search.svg" alt="Search icon">';
}


/**  Call functions  **/

showPage(data, 1);
addPagination(data);

