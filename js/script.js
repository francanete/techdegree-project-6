/**   Global Variables   **/

const itemsPerPage = 9;


/**   showPage function 
Creates and appends necessary elemnts to display all students profiles.
@param {array of objects} list - an array of objects stores all students data.
@param {Number} page - indicates the first page to be displayed at the initial "students page"
**/


function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

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
         img.src = list[i].picture.medium;
         divStudentDetails.insertAdjacentElement('beforeend', img);

         const name = document.createElement('h3');
         name.textContent = `${list[i].name.first} ${list[i].name.last}`;
         divStudentDetails.insertAdjacentElement('beforeend', name);

         const email = document.createElement('span');
         email.className = 'email';
         email.textContent = list[i].email;
         divStudentDetails.insertAdjacentElement('beforeend', email);

         const divJoinedDetails = document.createElement('div');
         divJoinedDetails.className = 'joined-details';
         li.insertAdjacentElement('beforeend', divJoinedDetails);

         const dateJoined = document.createElement('span');
         dateJoined.className = 'date';
         dateJoined.textContent = `Joined ${list[i].registered.date}`;
         divJoinedDetails.insertAdjacentElement('beforeend', dateJoined);

      }
   } 
}



/**   showPage function 
Creates and appends necessary elemnts needed for the pagination buttons.
@param {array of objects} list - an array of objects stores all students data.
**/

function addPagination(list) {
   const numOfPages = Math.ceil((list.length / itemsPerPage ));
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      const buttonLi = document.createElement('li');
      linkList.insertAdjacentElement('beforeend', buttonLi);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${[i]}`;
      buttonLi.insertAdjacentElement('beforeend', button);
   }

   const firstBtn = document.querySelector('.link-list li button');
   firstBtn.className = 'active';

   linkList.addEventListener('click', (e) => {
      if ( e.target.tagName === 'BUTTON' ) {
         activeBtn = document.querySelector('.active');
         activeBtn.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
}


/**  searchPage function  
 Create and appends the search feature at the top of the page
 **/

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
searchPage();


/** Event listener to add functionality to the Searh Component **/

const search = document.getElementById('search');

search.addEventListener('keyup', (e) => {
   const searchName = e.target.value.toLowerCase();
   const notFound = document.querySelector('.header h2');
   const filteredCharacters = data.filter((data) => {
      return (
         data.name.first.toLowerCase().includes(searchName) ||
         data.name.last.toLowerCase().includes(searchName)
         );
      });
      
   if (filteredCharacters.length === 0) {
      notFound.textContent = "No results found";
   } else {
      notFound.textContent = "Students";
   }
   showPage(filteredCharacters, 1);
   addPagination(filteredCharacters);
});