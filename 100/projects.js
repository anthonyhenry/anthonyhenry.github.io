//Create a project list array to store all projects
var projectList = [];

//Set up Project class
class Project{
	//list all properties
	projectName;
	projectStartDate;
	projectEndDate;
	projectLanguages;
	projectFeatures;

	//Set up constructor
	constructor(name, startDate, endDate, languages, features){
		this.projectName = name;
		this.projectStartDate = startDate;
		this.projectEndDate = endDate;
		this.projectLanguages = languages;
		this.projectFeatures = features;
	}

	//Method to get project timeline
	getProjectTimeline(){
		if(this.projectStartDate == this.projectEndDate)
		{
			return this.projectStartDate;
		}
		else
		{
			return this.projectStartDate + " - " + this.projectEndDate;
		}
	}
}

function createNewProject(name, startDate, endDate, languages, features){
	var newProject = new Project(name, startDate, endDate, languages, features);
	projectList.push(newProject)
}

createNewProject("100 Days of Code Home Page", "4/18/2022", "4/18/2022", "HTML. CSS, JavaScript", "Mobile First Responsive Design");

createNewProject("test", "1/1/2022", "12/31/2022", "chatscript", "NLP");
createNewProject("test2", "1/2/2022", "1/1/2023", "C#");


console.log(projectList);