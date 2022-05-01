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
		/*REQUIRED*/this.name = name;
		/*REQUIRED*/this.startDate = startDate;
		/*REQUIRED*/this.endDate = endDate;
		/*REQUIRED*/this.image = image;
		/*REQUIRED*/this.description = description;
		/*REQUIRED*/this.languages = languages;
		/*OPTIONAL*/this.extras = extras;
		/*OPTIONAL*/this.features = features;
		/*OPTIONAL*/this.link = link;
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

//Function to create new Project objects
function createNewProject(name, startDate, endDate, image, description, languages, extras, features, link){
	//Create the object
	var newProject = new Project(name, startDate, endDate, image, description, languages, extras, features, link);
	//Add the new project to the area
	projectList.push(newProject);
}

//Home Page
createNewProject(
	"100 Days of Code Home Page", 
	"4/18/2022", 
	"4/29/2022", 
	"home-page.png",
	"My first project is a home page to store links to all the projects I work on for the challenge.",
	"HTML, CSS, JavaScript",
	null,
	"Mobile First Responsive Design",
	null
);

createNewProject(
	"Project 2", 
	"1/1/2022", 
	"12/31/2022", 
	"Background.jpg",
	"This is where the project description will go.",
	"HTML, CSS, JavaScript, PHP, SQL",
	"JQuery, BootStrap",
	"Mobile First Responsive Design",
	"https://anthonyhenry.github.io/100/"
);

createNewProject(
	"Project 2", 
	"1/1/2022", 
	"12/31/2022", 
	"Background.jpg",
	"This is where the project description will go.",
	"HTML, CSS, JavaScript, PHP, SQL",
	"JQuery, BootStrap",
	"Mobile First Responsive Design",
	"https://anthonyhenry.github.io/100/"
);

for(let i = 0; i < projectList.length; i++)
{
	//Validate Object Properties
	if(projectList[i].name == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: name.")
		break;
	}
	else if(projectList[i].startDate == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: startDate.")
		break;
	}
	else if(projectList[i].endDate == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: endDate.")
		break;
	}
	else if(projectList[i].image == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: image.")
		break;
	}
	else if(projectList[i].description == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: description.")
		break;
	}
	else if(projectList[i].languages == undefined)
	{
		alert("ERROR | Object in projectList[] at position " + i + " missing required property: languages.")
		break;
	}
	else
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
		const imgLink = document.createElement("a");
		const img = document.createElement("img");
		//Set the link src
		imgLink.href = projectList[i].link;
		//Set the image src
		img.src = projectList[i].getImagePath();
		//Give the img the thumbnail class
		img.classList.add("thumbnail");
		//Add the link and image elements
		details.appendChild(imgLink);
		imgLink.appendChild(img);

		//Create paragraph elements for other project details
		addParagraphElement(projectList[i].description);

		addParagraphElement(timeline, "Days", "details-timeline");

		addParagraphElement(projectList[i].languages, "Languages");

		//Only add optional elements if they are in use, null equals undefined
		if(projectList[i].extras != undefined)
		{
			addParagraphElement(projectList[i].extras, "Libraries/Frameworks");
		}

		if(projectList[i].features != undefined)
		{
			addParagraphElement(projectList[i].features, "Features");
		}

		//Create a See Project link for all projets after the first one
		if(projectList[i].link != undefined)
		{
			const link = document.createElement("a");
			link.href = projectList[i].link;
			link.innerText = "See Project"
			details.appendChild(link);
		}
	}
}

function addParagraphElement(contents, section, classToAdd)
{
	//Create a paragraph element
	const p = document.createElement("p");

	//Initialize label as empty for cases where none is supplied
	let label = "";

	//Chcek if a section was supplied
	if(section != undefined)
	{
		label = "<strong>" + section + "</strong>: "
	}

	//Check if a class was supplied
	if(classToAdd != undefined)
	{
		//Apply the class
		p.classList.add("details-timeline");
	}

	//Set the paragraph's content
	p.innerHTML = label + contents;
	
	//Grab all Details elements
	const allDetailElements = document.querySelectorAll("details");

	//Add the paragraph element as a child of the last Details element
	allDetailElements[allDetailElements.length-1].appendChild(p);
}
