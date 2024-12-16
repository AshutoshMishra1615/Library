// const library =[];
// function Book(name,author,pages){
//     this.name =name;
//     this.author = author;
//     this.pages=pages;

// }
// function addBookTOTheLibrary(name,author,pages){
//     const name=new Book(name,author,pages);
//     library.push(name);
// }
document.addEventListener('DOMContentLoaded', function() {
    // Library array to store books
    const library = [];

    // Book constructor
    function Book(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
    }

    // Function to render books in the grid
    function renderBooks() {
        const bookGrid = document.getElementById('bookGrid');
        bookGrid.innerHTML = ''; // Clear existing books

        library.forEach(function(book, index) {
            const bookCard = document.createElement('div');
            bookCard.classList.add(
                'bg-white', 
                'rounded-lg', 
                'shadow-md', 
                'p-6', 
                'transform', 
                'hover:scale-105', 
                'transition', 
                'duration-300'
            );
            bookCard.innerHTML = `
                <h3 class="text-xl font-bold mb-2 text-primary">${book.name}</h3>
                <p class="text-gray-600 mb-1">Author: ${book.author}</p>
                <p class="text-gray-500">Pages: ${book.pages}</p>
                <button 
                    data-index="${index}" 
                    class="delete-book mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Delete
                </button>
            `;
            bookGrid.appendChild(bookCard);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-book').forEach(function(button) {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                library.splice(index, 1);
                renderBooks();
            });
        });
    }

    // Function to add book to library
    function addBookToLibrary() {
        const name = document.getElementById('bookName').value;
        const author = document.getElementById('bookAuthor').value;
        const pages = document.getElementById('bookPages').value;

        if (name && author && pages) {
            const newBook = new Book(name, author, parseInt(pages));
            library.push(newBook);
            renderBooks();

            // Reset form and hide modal
            document.getElementById('bookName').value = '';
            document.getElementById('bookAuthor').value = '';
            document.getElementById('bookPages').value = '';
            document.getElementById('addBookModal').classList.add('hidden');
        } else {
            alert('Please fill in all fields');
        }
    }

    // Event Listeners
    document.getElementById('showAddBookModal').addEventListener('click', function() {
        document.getElementById('addBookModal').classList.remove('hidden');
        document.getElementById('addBookModal').classList.add('flex');
    });

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('addBookModal').classList.add('hidden');
        document.getElementById('addBookModal').classList.remove('flex');
    });

    document.getElementById('submitBook').addEventListener('click', addBookToLibrary);

    // Close modal when clicking outside
    document.getElementById('addBookModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
            this.classList.remove('flex');
        }
    });

    // Add an initial book
    library.push(new Book('Harry Potter', 'JK Rowling', 696));
    renderBooks();
});