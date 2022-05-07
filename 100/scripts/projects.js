//Create a project list array to store all projects
let projectList = [];

//Set up Project class
class Project{
	//list all properties
	// name;
	// startDate;
	// endDate;
	// image;
	// description;
	// languages;
	// extras;
	// features;
	// link;

	//Set up constructor
	constructor(name, startDate, endDate, image, description, languages, extras, features, link){
		/*REQUIRED*/this.name = name;
		/*REQUIRED*/this.startDate = startDate;
		/*OPTIONAL*/this.endDate = endDate;
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

	//Method to validate object properties
	validateProperties(){

		//If no end date was given...
		if(this.endDate == undefined)
		{
			//...the start date is the end date
			this.endDate = this.startDate;
		}

		//Make sure all required properties have been filled
		if(this.name == undefined)
		{
			return{
				status: "fail",
				perpetrator: "name"
			};
		}
		else if(this.startDate == undefined)
		{
			return{
				status: "fail",
				perpetrator: "startDate"
			};
		}
		else if(this.image == undefined)
		{
			return{
				status: "fail",
				perpetrator: "image"
			};
		}
		else if(this.description == undefined)
		{
			return{
				status: "fail",
				perpetrator: "description"
			};
		}
		else if(this.languages == undefined)
		{
			return{
				status: "fail",
				perpetrator: "languages"
			};
		}
		//All Required Properties filled in
		else
		{
			return{
				status: "pass",
				perpetrator: null
			};
		}
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
	"4/30/2022", 
	"home-page.png",
	"My first project is a home page to store links to all the projects I work on for the challenge.",
	"HTML, CSS, JavaScript",
	null,
	"Mobile First Responsive Design",
	null
);

createNewProject(
	"Calavera", 
	"5/1/2022", 
	"5/7/2022", 
	"skull.png",
	"For this project I used p5.js to make a colorful skull. The colors used for the skull are randomly selected in a way that prevents the same color from appearing more than once.",
	"HTML, CSS, JavaScript",
	"p5.js",
	null,
	"Projects/Skull"
);

for(let i = 0; i < projectList.length; i++)
{
	//Validate each object
	let validation = projectList[i].validateProperties();

	//Validation Failed
	if(validation.status == "fail")
	{
		//Give an Error
		console.log("ERROR | Object in projectList[] at position " + i + " returned value undefined for property: " + validation.perpetrator + ".");
		break;
	}
	//Validation Passed
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

		//Create an image element
		const img = document.createElement("img");
		//Set the image src
		img.src = "imgs/" + projectList[i].image; 
		//Give the img the thumbnail class
		img.classList.add("thumbnail");

		//Check if a link was supplied
		if(projectList[i].link != undefined)
		{
			//Create a link element
			const imgLink = document.createElement("a");
			//Set the link src
			imgLink.href = projectList[i].link;
			imgLink.target = "_blank";
			//Add the link and image elements
			details.appendChild(imgLink);
			imgLink.appendChild(img);
		}
		else
		{
			//Add the image element as a child of the details element
			details.appendChild(img);
		}

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
			link.target = "_blank";
			link.innerText = "See Project";
			details.appendChild(link);
		}
	}
}

function addParagraphElement(contents, section, classToAdd){
	//Create a paragraph element
	const p = document.createElement("p");

	//Initialize label as empty for cases where none is supplied
	let label = "";

	//Chcek if a section was supplied
	if(section != undefined)
	{
		label = "<strong>" + section + "</strong>: ";
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
