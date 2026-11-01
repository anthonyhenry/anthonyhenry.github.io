/* ------------------------------------------------------------------
   PROJECT DATA. Add a new project by copying an object below.
   - type:        top-level filter ("Game", "Web", ...). The Type filter row appears
                  automatically once you have more than one type.
   - tags:        discipline filters ("Systems Design", "Technical Design", ...).
   - image:       path like "images/fang.jpg". Leave null for a colored tile.
   - video:       optional YouTube link; plays at the top of the project popup.
   - technology:  string or list, e.g. ['Unity', 'C#', 'Figma']. Hidden if empty.
   - description: your write-up. Each string in the list becomes one paragraph.
------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: 'lightbar-poem',
    title: 'The Light Bar Poem',
    role: 'Game Designer',
    org: 'Embodied, Inc.',
    type: 'Game',
    tags: ['Conversation Design', 'UX Design'],
    color: '#4cc76a',
    image: null,
    video: 'https://www.youtube.com/watch?v=99jz0r7-_3U',
    technology: '',
    summary: "A short, memorable poem that taught kids to wait their turn when talking to the Moxie robot, and reduced interruptions.",
    description: [
      "At Embodied, I worked as a game designer creating interactive content for Moxie, an AI companion robot for kids that Time Magazine named one of the best inventions of 2020.",

      "Ever since Moxie's launch, children had trouble not interrupting the robot mid-conversation. A significant part of our user base was kids with mental, behavioral, and developmental disorders, who interrupted especially often. For years the tech team tried to fix it through programming but to no avail. Eventually someone suggested that perhaps this problem could be solved through design instead of through code.",

      "I was assigned with creating an interaction that would teach users how to avoid interrupting Moxie. My goal was to make something that would work well during Moxie's first time user experience, where we tutorialize how to interact with Moxie, and also something that could be revisited if Moxie detected frequent inturruptions. I also knew I wanted to utilize the light bar on Moxie's chest which changes color based on Moxie's state. The light bar is blue while Moxie is listening for a response. It changes to pink when Moxie is preparing to speak.",

      "The idea I ultimately landed on was having Moxie teach users a cute poem about how the light bar works: \"When the light bar is blue, Moxie hears you. If the light bar is pink, let Moxie think.\". During the first time user experience, Moxie introduces this poem as an important lesson to help Moxie be a good conversationalist. You can see this in the video above. In later interactions, if Moxie detects frequent inturruptions from the user, Moxie revists just the poem portion of the interaction, having the user practice reciting the poem with Moxie as a reminder of this important lesson.",
      
      "The interaction was a success. Interruptions went down, and in user testing we saw multiple kids recite the poem to themselves as a reminder of how the light bar works. This was one of the most rewarding projects I worked on at Embodied. Coming up and implementing  the Light Bar Poem was a lot of fun plus it was rewarding to see that something I worked on was able to help solve an issue that seemed to plague the product since launch."
    ],
    links: []
  },
  {
    id: 'prosperos-island',
    title: "Prospero's Island",
    role: 'Game Designer',
    org: 'Personal project',
    type: 'Game',
    tags: ['Narrative Design', 'Quest Design'],
    color: '#a65bf0',
    image: null,
    technology: 'Neverwinter Nights 2 toolset',
    summary: "A fantasy RPG adaptation of Shakespeare's The Tempest, built as a Neverwinter Nights 2 mod.",
    description: [
      "Prospero's Island is a passion project: an adaptation of Shakespeare's The Tempest as a fantasy RPG, built as a mod for Neverwinter Nights 2. I adapted the play into a structure players can explore and act in.",
      "The central design challenge was balancing player agency with a classic story. I designed the quests so that player choices influence character behavior, relationships, and major story events, while respecting the source material. I implemented the quests and dialogue in the NWN2 toolset."
    ],
    links: []
  },
  {
    id: 'fang-and-fortress',
    title: 'Fang and Fortress',
    role: 'Design Lead',
    org: 'IGDA California Clash Game Jam',
    type: 'Game',
    tags: ['Systems Design', 'Level Design', 'Technical Design'],
    color: '#ee4b5a',
    image: null,
    technology: '',
    summary: 'A hybrid stealth and tower defense game made in one week with a small team.',
    description: [
      "Fang and Fortress is a hybrid stealth and tower defense game that I developed with a small team in one week for the IGDA California Clash game jam. I served as design lead and came up with the initial game concept.",
      "Beyond the concept, I designed each of the game's levels, along with the enemies and abilities, and I programmed the tower defense portion of the game."
    ],
    links: [{ label: 'Play on itch.io', url: 'https://cindyandcode.itch.io/fang-and-fortress' }]
  },
  {
    id: 'knockout-league',
    title: 'Knockout League',
    role: 'Game Designer',
    org: 'Grab Games',
    type: 'Game',
    tags: ['Systems Design', 'VR / MR'],
    color: '#f28a30',
    image: null,
    technology: '',
    summary: 'Redesigned the scoring system for the Mixed Reality update of a VR boxing game.',
    description: [
      "I joined Grab Games late in the development of the Mixed Reality update for Knockout League, a VR boxing game.",
      "I fixed bugs while the update was being finished and redesigned the scoring system to better fit the updated fight mechanics."
    ],
    links: [{ label: 'Knockout League', url: 'https://knockoutleaguevr.com/' }]
  },
  {
    id: 'numbers-game',
    title: 'The Numbers Game',
    role: 'Game Designer',
    org: 'Embodied, Inc.',
    type: 'Game',
    tags: ['Conversation Design', 'Educational Design'],
    color: '#29d3e6',
    image: null,
    technology: '',
    summary: "The opening mission in the Moxie robot's Sportsmanship series, teaching kids what it means to be a good sport.",
    description: [
      "The Numbers Game is the opening mission in the Sportsmanship series for Moxie, the social robot for kids made by Embodied, Inc. The goal was to help children understand what it means to be a good sport and to recognize examples of good and poor sportsmanship.",
      "I worked with therapists and child development experts to define the mission's learning goals, then designed a playful number-guessing game in which Moxie models both positive and negative behavior. I also designed the follow-up conversation where Moxie reflects on those actions with the child."
    ],
    links: []
  },
  {
    id: 'plasticity',
    title: 'Plasticity',
    role: 'User Researcher',
    org: 'USC Games',
    type: 'Game',
    tags: ['User Research'],
    color: '#4a7cf0',
    image: null,
    technology: '',
    summary: 'A cinematic platformer. My research team ran over 100 playtests in eight months.',
    description: [
      "Plasticity is a cinematic platformer from USC Games about a young girl named Noa, who explores and decides the future of her post-oil, plastic-ridden world.",
      "I was one of three user researchers on the project. Over the eight-month development schedule, my team conducted more than 100 playtests."
    ],
    links: [{ label: 'Project site', url: 'https://plasticitygame.wixsite.com/about' }]
  }
];
