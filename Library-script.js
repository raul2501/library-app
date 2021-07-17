let myLibrary;
let html = '';
let count;
if(!localStorage.getItem('books')) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('books'))
    for (let i = 0; i < myLibrary.length; i++) {
        html += "<tr id = " + `${i}` + ">"
        html += "<td>" + myLibrary[i].title + "</td>";
        html += "<td>" + myLibrary[i].author + "</td>";
        html += "<td>" + myLibrary[i].pages + "</td>";
        html += "<td class="+ `${i}` +" data-id = " + `${i}` + " onclick = change(" + `${i}` + ")>" + myLibrary[i].readstatus + "</td>";
        html += "<td id = 'remove'><a id = " + `${i}` + " href='#' onclick = remove(" + `${i}` + ")> remove </a></td>";
        html += "</tr>"
        count = i;
        console.log(count)
    }
    document.getElementById('table').innerHTML = html;
  }

function Books(title, author, pages, readstatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstatus = readstatus;
}

function getTitle() {
    let title = document.getElementById("title").value
    return title
}

function getAuthor() {
    let author = document.getElementById("author").value
    return author
}

function getPages() {
    let pages = document.getElementById("pages").value
    return pages
}

function getReadstatus() {
    let readstatus = document.getElementById("status").value
    return readstatus
}

function addBooktoLibrary() {

    let titvar = getTitle()
    let authvar = getAuthor()
    let pagevar = getPages()
    let statvar = getReadstatus()

   let newbook = new Books(titvar, authvar, pagevar, statvar)
    myLibrary.push(newbook)
    localStorage.setItem('books', JSON.stringify(myLibrary))
    for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
        html += "<tr id = " + `${i}` + ">"
        html += "<td>" + myLibrary[i].title + "</td>";
        html += "<td>" + myLibrary[i].author + "</td>";
        html += "<td>" + myLibrary[i].pages + "</td>";
        html += "<td class="+ `${i}` +" data-id = " + `${i}` + " onclick = change(" + `${i}` + ")>" + myLibrary[i].readstatus + "</td>";
        html += "<td id = 'remove'><a id = " + `${i}` + " href='#' onclick = remove(" + `${i}` + ")> remove </a></td>";
        html += "</tr>"
    }
    document.getElementById('table').innerHTML = html;

    document.getElementById("title").value = ''
    document.getElementById("author").value = ''
    document.getElementById("pages").value = ''
    document.getElementById("status").value = ''
}

function remove(id) {
    var rem = document.getElementById(id);
    rem.remove();
    myLibrary.splice(id, 1)
    localStorage.setItem('books', JSON.stringify(myLibrary))
}

function change(id) { 
    var stat = document.getElementsByClassName(id)[0]
    let cont = stat.innerHTML
    console.log(cont)
    if (cont == 'Completed') { 
        document.getElementsByClassName(id)[0].innerHTML = 'In-progress'
        myLibrary[id].readstatus = 'In-progress'
        localStorage.setItem('books', JSON.stringify(myLibrary))
        console.log(myLibrary, localStorage)
    }
    else if (cont == 'In-progress') { 
        document.getElementsByClassName(id)[0].innerHTML = 'Queued'
        myLibrary[id].readstatus = 'Queued'
        localStorage.setItem('books', JSON.stringify(myLibrary))
        console.log(myLibrary, localStorage)
    }
    else { 
        document.getElementsByClassName(id)[0].innerHTML = 'Completed'
        myLibrary[id].readstatus = 'Completed'
        localStorage.setItem('books', JSON.stringify(myLibrary))
        console.log(myLibrary, localStorage)
    }
}