export const scenarios = [
  {
    id: 'western-front',
    name: 'The Western Front',
    subtitle: 'WWI · 1914–1918',
    description:
      'Four years of trench warfare carved a scar 700 km across Belgium and France. Neither side could break through — until 1918.',
    factions: [
      {
        id: 'british-entente',
        name: 'British Entente',
        shortName: 'Entente',
        color: '#8B7355',
        accentColor: '#C8A96E',
        flagEmoji: '🇬🇧',
        description:
          'Britain and her allies hold the line. Discipline, industry, and imperial manpower against the German advance.',
      },
      {
        id: 'german-reich',
        name: 'German Reich',
        shortName: 'Germany',
        color: '#5C6B4A',
        accentColor: '#A3B899',
        flagEmoji: '🇩🇪',
        description:
          'The Kaiser\'s armies seek to deliver a swift victory before the Entente can fully mobilise.',
      },
    ],
    briefing:
      'August 1914. The assassination of Archduke Franz Ferdinand has ignited a powder keg. Germany\'s Schlieffen Plan calls for a rapid sweep through Belgium and into France. The Entente must hold the line.',
    historicalOutcome:
      'The Western Front became a static war of attrition. Millions died for gains measured in metres. The armistice came on 11 November 1918.',
    backgroundStyle: {
      sky: '#6B7A5C',
      ground: '#4A3A28',
      midground: '#5C4A2A',
      accent: '#8B6B3A',
    },
    mapLabel: 'Belgium & Northern France',
  },
  {
    id: 'october-revolution',
    name: 'The October Revolution',
    subtitle: 'Russia · 1917–1922',
    description:
      'The Tsar has fallen. Now two visions of Russia fight for dominance: Lenin\'s Bolsheviks promise land, peace, and bread.',
    factions: [
      {
        id: 'red-bolsheviks',
        name: 'Red Army',
        shortName: 'Reds',
        color: '#8B1A1A',
        accentColor: '#CC2936',
        flagEmoji: '🔴',
        description:
          'Lenin\'s Bolsheviks promise a workers\' state. Revolutionary fervour is their greatest weapon.',
      },
      {
        id: 'white-guards',
        name: 'White Guards',
        shortName: 'Whites',
        color: '#E8E0D0',
        accentColor: '#C8B89A',
        flagEmoji: '⬜',
        description:
          'A coalition of monarchists, liberals, and anti-Bolsheviks, supported by foreign powers. They fight to restore order.',
      },
    ],
    briefing:
      'October 1917. The Provisional Government has collapsed. Lenin\'s Bolsheviks seize Petrograd\'s key buildings in a single night. But the civil war is just beginning.',
    historicalOutcome:
      'The Red Army, under Trotsky\'s organisation, defeated the fragmented White forces by 1922, establishing the Soviet Union.',
    backgroundStyle: {
      sky: '#2C3E5A',
      ground: '#8B7355',
      midground: '#6B5A3A',
      accent: '#CC2936',
    },
    mapLabel: 'Petrograd & the Russian Steppe',
  },
  {
    id: 'versailles-discontents',
    name: 'Versailles & Its Discontents',
    subtitle: 'Europe · 1919–1938',
    description:
      'The peace that ended WWI planted the seeds of the next war. Democracies struggle as fascism rises across Europe.',
    factions: [
      {
        id: 'democratic-allies',
        name: 'Democratic Allies',
        shortName: 'Allies',
        color: '#1A3A6B',
        accentColor: '#4A7AC8',
        flagEmoji: '🗳️',
        description:
          'Britain, France, and their allies uphold the Versailles order — but face economic crisis and political fragmentation.',
      },
      {
        id: 'fascist-powers',
        name: 'Fascist Powers',
        shortName: 'Fascists',
        color: '#1A1A1A',
        accentColor: '#8B1A1A',
        flagEmoji: '⚡',
        description:
          'Hitler\'s Germany and Mussolini\'s Italy exploit grievances and nationalist fury to tear up the post-war order.',
      },
    ],
    briefing:
      '1933. Hitler becomes Chancellor of Germany. The Versailles Treaty is being systematically dismantled. Appeasement buys time — but is time running out?',
    historicalOutcome:
      'Appeasement failed. By September 1939, the policy of yielding to Hitler\'s demands had led Europe into a second world war.',
    backgroundStyle: {
      sky: '#4A5568',
      ground: '#2D3748',
      midground: '#4A4040',
      accent: '#8B1A1A',
    },
    mapLabel: 'Central Europe',
  },
  {
    id: 'fall-of-france',
    name: 'Fall of France',
    subtitle: 'WWII · May–June 1940',
    description:
      'In six weeks, the Wehrmacht shattered the French army and forced Britain\'s evacuation at Dunkirk. How did it happen so fast?',
    factions: [
      {
        id: 'franco-british-allies',
        name: 'Franco-British Allies',
        shortName: 'Allies',
        color: '#1A4A6B',
        accentColor: '#4A90C8',
        flagEmoji: '🇫🇷',
        description:
          'France and Britain hold the Maginot Line while German intentions remain unclear. A defensive posture proves fatal.',
      },
      {
        id: 'wehrmacht-1940',
        name: 'Wehrmacht',
        shortName: 'Germany',
        color: '#3A4A2A',
        accentColor: '#6B8B5A',
        flagEmoji: '🇩🇪',
        description:
          'Blitzkrieg: armour, aircraft, and infantry in perfect coordination. Strike through the Ardennes where the enemy least expects.',
      },
    ],
    briefing:
      'May 10, 1940. Germany bypasses the Maginot Line through the Ardennes forest, cutting Allied supply lines. The French command structure collapses.',
    historicalOutcome:
      'France fell in 46 days. 338,000 Allied troops were evacuated at Dunkirk. France signed an armistice on 22 June 1940.',
    backgroundStyle: {
      sky: '#5A6B7A',
      ground: '#4A5A3A',
      midground: '#3A4A2A',
      accent: '#C8A050',
    },
    mapLabel: 'Northern France & Belgium',
  },
  {
    id: 'operation-barbarossa',
    name: 'Operation Barbarossa',
    subtitle: 'WWII · June–December 1941',
    description:
      'The largest military invasion in history. Three million German troops cross into the Soviet Union. Stalin was warned — and didn\'t believe it.',
    factions: [
      {
        id: 'red-army-1941',
        name: 'Red Army',
        shortName: 'USSR',
        color: '#6B1A1A',
        accentColor: '#CC2936',
        flagEmoji: '🇷🇺',
        description:
          'Purges have decimated the officer corps. Vast but disorganised, the Red Army must absorb catastrophic blows and survive.',
      },
      {
        id: 'Wehrmacht-1941',
        name: 'Wehrmacht',
        shortName: 'Germany',
        color: '#3A4A2A',
        accentColor: '#6B8B5A',
        flagEmoji: '🇩🇪',
        description:
          'Fresh from conquest of Western Europe, the Wehrmacht aims to knock out the USSR before winter. Speed is everything.',
      },
    ],
    briefing:
      'June 22, 1941, 3:15 AM. Three million soldiers cross the Soviet border simultaneously. Stalin refuses to believe it — for hours.',
    historicalOutcome:
      'Germany advanced 1,000 km but failed to take Moscow. The Soviet counter-offensive in December 1941 marked the turning of the tide.',
    backgroundStyle: {
      sky: '#4A5A6B',
      ground: '#5A4A3A',
      midground: '#4A3A2A',
      accent: '#CC2936',
    },
    mapLabel: 'Eastern Front',
  },
  {
    id: 'liberation',
    name: 'Liberation — D-Day',
    subtitle: 'WWII · June 1944',
    description:
      'The largest seaborne invasion in history. 156,000 Allied troops storm five Normandy beaches to open a second front against Nazi Germany.',
    factions: [
      {
        id: 'allied-forces-1944',
        name: 'Allied Forces',
        shortName: 'Allies',
        color: '#1A3A6B',
        accentColor: '#4A7AC8',
        flagEmoji: '🇺🇸',
        description:
          'American, British, Canadian and other Allied forces under Eisenhower. Years of planning come down to one day.',
      },
      {
        id: 'Wehrmacht-1944',
        name: 'Wehrmacht',
        shortName: 'Germany',
        color: '#3A4A2A',
        accentColor: '#6B8B5A',
        flagEmoji: '🇩🇪',
        description:
          'Defending the Atlantic Wall. Rommel insists the invasion must be stopped at the beach. Hitler sleeps in and holds back the Panzers.',
      },
    ],
    briefing:
      'June 6, 1944, 6:30 AM. Operation Overlord begins. The fate of the war — and of Europe — hangs on the next 24 hours.',
    historicalOutcome:
      'The Allies secured all five beaches by nightfall. Paris was liberated on August 25, 1944. Germany surrendered on May 8, 1945.',
    backgroundStyle: {
      sky: '#4A5A7A',
      ground: '#5A4A3A',
      midground: '#3A5A6B',
      accent: '#4A7AC8',
    },
    mapLabel: 'Normandy, France',
  },
];

export const getScenarioById = (id) => scenarios.find((s) => s.id === id);

export const getFactionById = (scenarioId, factionId) => {
  const scenario = getScenarioById(scenarioId);
  return scenario?.factions.find((f) => f.id === factionId);
};
