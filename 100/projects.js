//Create a project list array to store all projects
let projectList = [];

//Set up Project class
class Project{
	//list all properties
	name;
	startDate;
	endDate;
	image;
	description;
	languages;
	extras;
	features;
	link;

	//Set up constructor
	constructor(name, startDate, endDate, image, description, languages, extras, features, link){
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.image = image;
		this.description = description;
		this.languages = languages;
		this.extras = extras;
		this.features = features;
		this.link = link;
	}

	//Method to get project timeline
	getProjectTimeline(){
		if(this.startDate == this.endDate)
		{
			return this.startDate;
		}
		else
		{
			return this.startDate + " - " + this.endDate;
		}
	}

	//Method to get full image path
	getImagePath(){
		let imagePath = "imgs/" + this.image;
		return imagePath;
	}
}

function createNewProject(name, startDate, endDate, image, description, languages, extras, features, link){
	var newProject = new Project(name, startDate, endDate, image, description, languages, extras, features, link);
	projectList.push(newProject);
}

createNewProject(
	"100 Days of Code Home Page", 
	"4/18/2022", 
	"4/26/2022", 
	"home-page.png",
	"My first project is a home page to store links to all the projects I work on for the challenge.",
	"HTML, CSS, JavaScript",
	null,
	"Mobile First Responsive Design",
	"https://anthonyhenry.github.io/100/"
);

for(let i = 0; i < projectList.length; i++)
{
	//Create details and summary elements
	const details = document.createElement("details");
	const summary = document.createElement("summary");
	//Find out what days the project was worked on
	const timeline = projectList[i].getProjectTimeline();
	//Set the HTML for the Summary
	summary.innerHTML = projectList[i].name + "<span class='summary-timeline'>" + timeline + "</span>";
	//Add the details and summary elements to the DOM
	document.querySelector("#projectsList").appendChild(details);
	details.appendChild(summary);

	//Create a link and image element
	const link = document.createElement("a");
	const img = document.createElement("img");
	//Set the link src
	link.href = projectList[i].link;
	//Set the image src
	img.src = "imgs/" + projectList[i].image;
	//Give the img the thumbnail class
	img.classList.add("thumbnail");
	//Add the link and image elements
	details.appendChild(link);
	link.appendChild(img);

	//Create a paragraph element for the description
	const description = document.createElement("p");
	//Fill the element with the object description
	description.innerText = projectList[i].description;
	//Add the description paragraph element
	details.appendChild(description);

	//Create a paragraph element for the description
	const detailsTimeline = document.createElement("p");
	//Give this element the details-timeline class
	detailsTimeline.classList.add("details-timeline");
	//Fill the element with the timeline
	detailsTimeline.innerHTML = "<strong>Days</strong>: " + timeline;
	//Add the description paragraph element
	details.appendChild(detailsTimeline);

	
	// //Create a paragraph to display the project timeiline
	// p.classList.add("details-timeline");
	// p.innerHTML = "<strong>Days</strong>: " + timeline;
	// details.appendChild(p);

	// p.classList.remove("details-timeline");
	// p.innerHTML = "<strong>Languages</strong>: " + projectList[i].languages;
	// details.appendChild(p);

	

	// // let strong = document.createElement("strong");
	// // let link = document.createElement("a");

	

	// //Set the project description
	// description.innerText = projectList[i].description;

	// //Set the days
	// days.classList.add("details-timeline");




	
	
	// details.appendChild(days);
}