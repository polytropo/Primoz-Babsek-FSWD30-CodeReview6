class Collection {
	constructor (title, author, genre, publisher, type, imageUrl, rating) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.publisher = publisher;
		this.type = type;
		this.imageUrl = imageUrl;
		this.rating = rating;

	}

	// Function to create card with content
	createCard(){
		var mainContent = document.getElementById('mainContent');
		var collectionCard = document.createElement('div');
		collectionCard.className = "col-8 col-md-3 col-lg-2 col-sm-5 mx-auto py-3"
		collectionCard.innerHTML = `
		<div class="card">
			<div class="card-title px-2">
				<span class="text-muted">Type:</span><strong>${this.type}</strong>
			</div>
        	<img src=${this.imageUrl} alt="Image" style="object-fit:contain">
    		<h5 class="px-2"><strong>${this.title}</strong></h5>
        	<p class="px-2"><span class="text-muted ">Author:</span> <strong>${this.author}</strong></p>
            <p class="px-2"><span class="text-muted">Published by:</span> <strong>${this.publisher}</strong></p>
            <p class="px-2"><span class="text-muted">Genre:</span> <strong>${this.genre}</strong></p>
            <p class="px-2"><span class="text-muted">Rating:</span> <strong>${stars(this.rating)}</strong></p>
        </div> 
        `;
    	mainContent.appendChild(collectionCard);
    }
}

// Stored Data
var content = [ new Collection ("Dylan", "Bob Dylan", "rock", "self published", "CD", "img/bobdylan.jpg", 4),
				new Collection ("City Lights", "Charlie Chaplin", "romantic comedy", "United Artists", "DVDs & Comics", "img/citylights.jpg", 2),
				new Collection ("Lawrence of Arabia", "T.E.Lawrence", "historical drama", "Columbia Pictures", "DVD", "img/bobdylan.jpg", 5),
				new Collection ("Diamond Life", "Sade", "smooth soul", "Epic", "CD", "img/diamondlife.jpg", 5),
				new Collection ("Woodwalkers", "Katja Brandis", "belletristik", "bild", "Book", "img/woodwalkers.jpg", 5),
				new Collection ("Foundation", "Isaac Asimov", "fantasy science fiction", "Heyne", "Book", "img/asimov.jpg", 3),
				new Collection ("The Sandman", "Neil Gaiman", "fantasy", "Vertigo", "DVDs & Comics", "img/sandman.jpg", 2),
				new Collection ("Modesty Blaise", "Peter O'Donnell", "mystery", "Titan Books", "Book", "img/modesty.jpg", 3)
];

// Display stored data with create card function
for (var i = 0; i < content.length; i++) {
	content[i].createCard();
}

// Event listener for adding item to collection
document.getElementById("title-form").addEventListener("submit", function(e){
	// Get values from the form
	var title = document.getElementById("title").value,
	author = document.getElementById("author").value,
	selectType = document.getElementById("selectType").value,
	selectGenre = document.getElementById("selectGenre").value,
	publisher = document.getElementById("publisher").value,
	image = document.getElementById("image").value,
	rating = Number(document.getElementById("rating").value);

	// Check that fields aren't  empty 
	if (title ==="" || author ==="" || selectType ==="disabled" || selectGenre ==="disabled" || publisher === "" || image ==="" || rating ===""){
		alert("Fill in al lthe fields!");
		e.preventDefault();
	}else {
		// Check that rating is 1-5
		if (rating < 1 || rating > 5) {
			alert("Enter rating between 1-5!");
			e.preventDefault();
		}else {
			// Check if any of those 2 authos then throw error
			if (author === "Danielle Steel" ||  author === "Roland Emmerich"){
				alert("I do not want to save this")
				e.preventDefault();
			} else {
				// Create new collection and push it into content array
				var newContent = new Collection (title, author, selectGenre, publisher, selectType,'"'+image+'"', rating);
				// content.push(newContent);
				newContent.createCard();
				// Clear input fields
				alert("Item Added to collection");
				clearFields();
			}
		}
		e.preventDefault();
	}
})


//  function to empty input fields after successfull input
function clearFields(){
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("selectType").value = "disabled";
	document.getElementById("selectGenre").value = "disabled";
	document.getElementById("publisher").value = "";
	document.getElementById("image").value = "";
	document.getElementById("rating").value = "";
}

// Function to show stars based on our rating 1-5
function stars(rating) {
	var fullStar = "";
	for(var i = 0; i < rating; i++){
		fullStar += "<span class='fa fa-star checked'></span>";
	}
	var emptyStar = "";
	for(var j = 0; j < (5-rating); j++){
		emptyStar += "<span class='fa fa-star'></span>"
	}
	var myStars = fullStar + emptyStar;
	
	return(myStars);
}



