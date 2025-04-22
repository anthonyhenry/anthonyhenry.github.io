class Projects {
    // Creat an empty array of instances
    static instances = [];

    constructor(name, startDate, endDate, image, desc, link, tech)
    {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.image = image;
        this.desc = desc;
        this.link = link;
        this.tech = tech;

        // Add instance to list
        Projects.instances.push(this);
    }

    static getAllInstances()
    {
        return [...Projects.instances];
    }
}

// Create projects here
const HOME_PAGE = new Projects(
    "100 Days of Code Home Page",
    "4/15/2025",
    "4/21/2025",
    "100-home-page",
    "My first project is a home page to store links to all the projects I work on for the challenge.",
    "https://anthonyhenry.github.io/100/",
    "HTML, CSS, Javascript"
)

const ALL_PROJECTS = Projects.getAllInstances();
console.log(ALL_PROJECTS)
console.log(ALL_PROJECTS[0].name)

for(let project of ALL_PROJECTS)
{
    for(let prop in project)
    {
        console.log(project[prop]);
    }
}

// Add projects to site


/*
<details class="responsive-text">
    <summary>
    <span class="arrow"></span>
    <span class="project-title">100 Days of Code Home Page</span>
    <span class="summary-timeline">4/15/2025 - 4/21/2025</span>
    </summary>
    <img src="imgs\project-imgs\100-home-page.png" class="thumbnail">
    <p>My first project is a home page to store links to all the projects I work on for the challenge.</p>
    <p class="details-timeline">
    <strong>Days</strong>: 4/15/2025 - 4/21/2025
    </p>
    <p>
    <strong>Tech</strong>: HTML, CSS, JavaScript
    </p>
</details>
*/