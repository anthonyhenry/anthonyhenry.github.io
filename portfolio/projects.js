/* ------------------------------------------------------------------
   PROJECT DATA. Add a new project by copying an object below.
   - type:  top-level filter ("Game", "Web", ...). The Type filter row appears
            automatically once you have more than one type.
   - tags:  discipline filters ("Systems Design", "Technical Design", ...).
   - image: path like "images/fang.jpg". Leave null for a colored tile.
   - Any field left empty ("" or []) is simply not shown in the case study.
   TODO: fill in challenge / process / outcome / tools / team for each project.
------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: 'prosperos-island',
    title: "Prospero's Island",
    role: 'Game Designer',
    org: 'Personal project',
    type: 'Game',
    tags: ['Narrative Design', 'Quest Design'],
    color: '#a65bf0',
    image: null,
    summary: "A fantasy RPG adaptation of Shakespeare's The Tempest, built as a Neverwinter Nights 2 mod.",
    overview: "As a passion project, I adapted Shakespeare's The Tempest as a fantasy RPG in the form of a mod for Neverwinter Nights 2.",
    technology: 'Neverwinter Nights 2 toolset',
    responsibilities: [
      'Adapted the play into a playable RPG structure',
      'Designed quests where player choices influence character behavior, relationships, and major story events',
      'Implemented the quests and dialogue in the NWN2 toolset'
    ],
    challenge: 'Balancing player agency with a classic narrative, while respecting the source material.',
    process: [], outcome: '', links: []
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
    summary: 'A hybrid stealth and tower defense game made in one week with a small team.',
    overview: 'Fang and Fortress is a hybrid stealth and tower defense game that I developed with a small team for the IGDA California Clash game jam.',
    technology: '',
    responsibilities: [
      'Served as design lead and came up with the initial game concept',
      "Designed each of the game's levels",
      'Designed the enemies and abilities',
      'Programmed the tower defense portion of the game'
    ],
    challenge: '', process: [], outcome: '',
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
    summary: 'Redesigned the scoring system for the Mixed Reality update of a VR boxing game.',
    overview: 'I joined Grab Games late in the development of the Mixed Reality update for Knockout League.',
    technology: '',
    responsibilities: [
      'Fixed bugs late in development of the Mixed Reality update',
      'Redesigned the scoring system to better fit the updated fight mechanics'
    ],
    challenge: '', process: [], outcome: '',
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
    summary: "The opening mission in the Moxie robot's Sportsmanship series, teaching kids what it means to be a good sport.",
    overview: "The Numbers Game is the opening mission in Moxie's Sportsmanship series.",
    technology: '',
    responsibilities: [
      "Collaborated with therapists and child development experts to define the mission's learning goals",
      'Designed a playful number-guessing game in which Moxie models both positive and negative behavior',
      'Designed the follow-up conversation where Moxie reflects on those actions with the child'
    ],
    challenge: 'Helping children understand what it means to be a good sport and recognize examples of good and poor sportsmanship.',
    process: [], outcome: '', links: []
  },
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
    summary: "A short, memorable poem that taught kids to wait their turn when talking to the Moxie robot, and reduced interruptions.",
    overview: "Moxie is an AI companion robot for kids, named one of Time Magazine's best inventions of 2020. A light bar on Moxie's chest changes color with its conversation state: blue means Moxie is listening for a response, and pink means Moxie is thinking and preparing to speak. The Light Bar Poem is an interaction that teaches children what those colors mean, so they know when it's their turn to talk.",
    technology: 'ChatScript, Python, Proprietary Visual Scripting Tools',
    responsibilities: [
      'Was the designer tasked with creating an interaction to teach users how to avoid interrupting Moxie',
      'Met with fellow designers to brainstorm approaches that kids could remember and that Moxie could repeat',
      'Designed the poem-based interaction so Moxie can revisit it whenever it detects a user continually interrupting',
      'Watched user testing to see how children responded to the poem and the light bar'
    ],
    challenge: "Since Moxie launched, children had trouble not interrupting the robot mid-conversation. A significant part of the user base was kids with mental, behavioral, and developmental disorders, who interrupted especially often. For years the tech team tried to solve it through programming. Eventually someone asked whether a technical problem could be solved through design instead.",
    process: [
      "Reframed the problem: instead of only detecting and working around interruptions in code, teach children the behavior that avoids them.",
      "Brainstormed with other designers around two requirements: it had to be something kids could remember, and something repeatable that we could bring back if a child kept interrupting.",
      "Landed on teaching a short poem that ties each light bar color to what the child should do: \"When the light bar is blue, Moxie hears you. If the light bar is pink, let Moxie think.\"",
      "Tested the interaction with users and watched how kids responded."
    ],
    outcome: "It worked. Interruptions went down, and in user testing we saw multiple kids recite the poem to themselves as a reminder of how the light bar works while talking with Moxie. It was one of the most rewarding projects I worked on at Embodied.",
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
    summary: 'A cinematic platformer. My research team ran over 100 playtests in eight months.',
    overview: 'Plasticity is a cinematic platformer about a young girl named Noa, who explores and decides the future of her post-oil, plastic-ridden world.',
    technology: '',
    responsibilities: [
      'Served as one of three user researchers on the project',
      'With my team, conducted over 100 playtests during the eight-month development schedule'
    ],
    challenge: '', process: [], outcome: '',
    links: [{ label: 'Project site', url: 'https://plasticitygame.wixsite.com/about' }]
  }
];
