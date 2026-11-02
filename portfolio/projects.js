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
    id: 'knockout-league',
    title: 'Knockout League',
    role: 'Senior Game Designer',
    org: 'Grab Games',
    type: 'Game',
    tags: ['Systems Design', 'Gameplay Design'],
    color: '#f28a30',
    image: 'imgs/knockout-league.jpg',
    video: 'https://www.youtube.com/watch?v=eq3kdirrZjQ',
    technology: 'Unreal',
    summary: 'Redesigned gameplay and systems for the Mixed Reality update of the VR boxing game Knockout League.',
    description: [
      "At Grab Games, I contributed to the development of the Mixed Reality update for Knockout League, an arcade-style boxing game available on Meta Quest. I joined the project during its later stages of development, where I focused primarily on adapting existing gameplay systems to accommodate the updated experience.",

      "One of my primary responsibilities was redesigning the game's scoring system to better align with the revised fight mechanics. With changes to how fights played out in the Mixed Reality version, the existing scoring system needed adjustments to ensure it accurately reflected player performance and the updated gameplay experience.",

      "In addition to this work, I contributed bug fixes and assisted with validating the release candidate, testing the updated experience to identify issues and ensure the game was functioning as intended ahead of release.",

      "This project gave me experience working within an established game late in its development cycle, adapting existing systems to evolving design requirements, and supporting the final stages of production through implementation, testing, and quality assurance."
    ],
    links: [{ label: 'Knockout League', url: 'https://knockoutleaguevr.com/' }]
  },
  {
    id: 'fang-and-fortress',
    title: 'Fang and Fortress',
    role: 'Team Lead & Designer',
    org: 'IGDA California Clash Game Jam',
    type: 'Game',
    tags: ['Technical Design', 'Level Design', 'Gameplay Design'],
    color: '#ee4b5a',
    image: 'imgs/fang-and-fortress.png',
    technology: ['Godot', 'GDScript'],
    summary: 'A stealth and tower defense hybrid where you turn villagers into vampires to help defend your castle. I led a team of five to 3rd place among Los Angeles entries for this one-week jam.',
    description: [
      "Fang and Fortress is a hybrid stealth and tower defense game made for the IGDA California Clash game jam, a collaboration between the Los Angeles, San Francisco, and San Diego IGDA chapters. I led a team of five through the one-week game jam. The game placed 3rd out of all Los Angeles submissions.", 
      
      "As team lead, I came up with the concept for the game. The theme for the game jam was \"Strength in Numbers,\". My idea was to make a game where you play a vampire whose castle is under threat from a mob of angry villagers. Each night, you sneak around biting unsuspecting villagers to turn them into vampires while the mob slowly marches toward your castle. When the mob arrives, the game shifts into tower defense, and the villagers you converted help defend the castle. The loop repeats until the mob overwhelms you or you hold them off for three nights.",
      
      "Beyond the concept and leading the team, I did all of the level design. We chose a 2D top-down isometric art direction. I used a tileset from our 2D artist to build both an exterior village environment and the castle interior.",

      "I also programmed the tower defense portion of the game. This was my first game made in Godot, so I had to learn the engine, the GDScript language, and build something worth submitting, all within a single week. In the end, I was very proud of what my team and I were able to acomplish, especially since we took home 3rd place in our chapter!",
    ],
    links: [{ label: 'Play on itch.io', url: 'https://cindyandcode.itch.io/fang-and-fortress' }]
  },
  {
    id: 'numbers-game',
    title: 'The Numbers Game',
    role: 'Game Designer',
    org: 'Embodied, Inc.',
    type: 'Game',
    tags: ['Content Design', 'Interaction Design', 'Conversation Design'],
    color: '#29d3e6',
    image: 'imgs/numbers-game.png',
    video: 'https://www.youtube.com/watch?v=MrL_SfcXrN8',
    technology: 'ChatScript, Python, Proprietary Visual Scripting Tools',
    summary: "The opening mission in the Moxie robot's Sportsmanship mission set. Teaching kids what it means to be a good sport.",
    description: [
      "As a Game Designer at Embodied, I created interactive daily missions for Moxie, an AI companion robot for kids. These missions were designed to teach social-emotional learning (SEL) concepts through engaging activities and interactions. I designed several mission sets, each consisting of 7-10 interconnected missions centered around a particular SEL topic.",

      "The Numbers Game was the introductory mission in a mission set focused on sportsmanship. To establish the learning objectives for this mission, I collaborated with child development and therapy experts to determine what we wanted users to understand and practice. We identified four key goals: introduce a definition of sportsmanship, give users an opportunity to practice it, demonstrate examples of both good and poor sportsmanship, and encourage users to come up with examples of their own.",

      "To accomplish these goals, I designed a number-guessing, see video above. This provided a natural way to introduce sportsmanship concepts while giving users an opportunity to put them into practice. Rather than simply explaining what good sportsmanship looks like, the game allowed users to experience it firsthand through their interactions with Moxie.",

      "I also designed the Numbers Game to be replayable outside of the mission. Since daily missions were intended to be completed only once, I wanted users to be able to return to the game whenever they wanted to play with Moxie again. This helped extend the value of the experience beyond its original educational purpose.",

      "In addition to designing the gameplay and interactions, I was responsible for implementing the mission using Python, ChatScript, and Embodied's proprietary visual scripting tools. I also implemented Moxie's vocal performance, body animations, facial expressions, and on-screen visual effects to bring the experience to life.",

      "The Numbers Game is an example of how I approached designing educational content for Moxie: finding opportunities to teach meaningful concepts through play rather than relying on direct instruction. By combining social-emotional learning objectives with a replayable game, I was able to create an experience that was both educational and entertaining."
    ],
    links: []
  },
  {
    id: 'lightbar-poem',
    title: 'The Light Bar Poem',
    role: 'Game Designer',
    org: 'Embodied, Inc.',
    type: 'Game',
    tags: ['Content Design', 'Interaction Design', 'Conversation Design', 'User Experience'],
    color: '#4cc76a',
    image: 'imgs/light-bar.png',
    video: 'https://www.youtube.com/watch?v=99jz0r7-_3U',
    technology: 'ChatScript, Python, Proprietary Visual Scripting Tools',
    summary: "A short, memorable interaction that taught kids to wait their turn when talking to the Moxie robot, and reduced number of interruptions.",
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
    role: 'Solo Developer',
    org: 'USC Capstone Project',
    type: 'Game',
    tags: ['Narrative Design', 'Quest Design'],
    color: '#a65bf0',
    image: 'imgs/prosperos-island.png',
    video: 'https://www.youtube.com/watch?v=cHhquuhIp68',
    technology: 'Neverwinter Nights 2 toolset',
    summary: "A fantasy RPG adaptation of Shakespeare's The Tempest, built as a Neverwinter Nights 2 mod.",
    description: [
      "Prospero's Island was my senior capstone project at the University of Southern California, where I earned a bachelor's degree in Narrative Studies with a minor in Video Game Design and Management. Wanting to combine my interests in storytelling and game development, I set out to adapt William Shakespeare's The Tempest into an RPG.",

      "I brought this concept to life by creating a playable mod for Neverwinter Nights 2 using the Electron Toolset. As a solo project, I was responsible for every aspect of development, from designing the quests and scripting gameplay to sculpting 3D environments and directing in-game cutscenes.",

      "One of the biggest design challenges was adapting a traditionally linear narrative into an interactive experience without sacrificing the story's central themes and characters. I wanted players to feel that their decisions mattered while still preserving the essence of Shakespeare's original work.",

      "To accomplish this, I designed a quest structure in which player choices influenced the story's outcome. Rather than simply guiding players through a recreation of the play, I used the interactive nature of RPGs to give them agency in how the story unfolded.",

      "Prospero's Island was an opportunity to bring together my interests in narrative design and game development while gaining hands-on experience across the entire game development process. It also reinforced my interest in RPGs as a storytelling medium and the unique opportunities they provide for creating interactive narratives."
    ],
    links: []
  },
  {
    id: 'plasticity',
    title: 'Plasticity',
    role: 'User Researcher',
    org: 'USC Games',
    type: 'Game',
    tags: ['User Experience'],
    color: '#4a7cf0',
    image: 'imgs/plasticity.jpg',
    video: 'https://www.youtube.com/watch?v=iDxRe_7rUQE',
    technology: 'Unity, Typeform',
    summary: 'Served as a User Researcher for this cinematic platformer. Ran over 100 playtests in eight months.',
    description: [
      "Plasticity was an advanced game project I was a part of at the University of Southern California. The game is a cinematic platformer about a young girl named Noa, who explores and decides the future of her post-oil, plastic-ridden world. I served as one of three user researchers on a 30-person development team.",

      "Throughout our eight months of development, my team and I conducted playtests multiple times a week, ultimately running over 100 playtest sessions. This was more than any other development team at USC.",

      "My responsibilities included collecting player feedback, analyzing playtest data, and communicating findings to the design team. By identifying usability issues, areas of confusion, and opportunities for improvement, I helped inform design decisions and shape the overall player experience.",

      "One example was a recommendation to introduce a diegetic tutorial to help players better understand the game's controls. Through playtesting, we identified opportunities to improve how the game communicated its mechanics to players. My team and I advocated for an approach that integrated tutorial information directly into the game world rather than relying solely on traditional instructional prompts.",

      "Working on Plasticity gave me valuable experience in evaluating games through the eyes of players and translating research findings into actionable design recommendations. It also reinforced the importance of iterative development and incorporating player feedback throughout the design process."
    ],
    links: [{ label: 'Play on Steam', url: 'https://store.steampowered.com/app/1069360/Plasticity/' }]
  }
];
